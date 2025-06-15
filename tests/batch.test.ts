import { processCSV, detectValueType } from '@/utils/csv/process';
import { validateEmail, normalizeEmail } from '@/utils/email/normalize';
import { normalizePhone } from '@/utils/phone/normalize';
import { generateSha256Hash, generateBase64Hash } from '@/utils/hash/generate';

/**
 * Mock implementation of email validation and normalization functions. This
 * mock is used to validate an email address and to normalize an email address.
 * This mock is used to isolate the CSV processing functionality from the email
 * and phone number normalization functionality.
 */
jest.mock('../utils/email/normalize', () => ({
  validateEmail: jest.fn().mockImplementation(email => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    return {
      isValid,
      error: isValid ? undefined : 'Invalid email format',
    };
  }),
  normalizeEmail: jest.fn().mockImplementation(email => email.toLowerCase()),
}));

/**
 * Mock implementation of phone number normalization function. This mock is used
 * to normalize a phone number. This mock is used to isolate the CSV processing
 * functionality from the phone number normalization functionality.
 */
jest.mock('../utils/phone/normalize', () => ({
  normalizePhone: jest.fn().mockImplementation(phone => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      return null;
    }
    if (digits.length === 10) {
      return `+1${digits}`;
    }
    return `+${digits}`;
  }),
}));

/**
 * Test suite for CSV processing functionality. This test suite covers the
 * following main areas, testing the processing of CSV files containing contact
 * information, the detection of email and phone number formats, the
 * standardization of phone number formats, and the generation of consistent
 * hashes for contact information.
 */
describe('CSV Processing', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test suite for value type detection functionality. This test suite covers
   * the following main areas, testing the detection of email and phone number
   * formats.
   */
  describe('detectValueType', () => {
    it('should detect email addresses', () => {
      expect(detectValueType('test@example.com')).toBe('email');
      expect(detectValueType('user+label@gmail.com')).toBe('email');
    });

    it('should detect phone numbers', () => {
      expect(detectValueType('+1234567890')).toBe('phone');
      expect(detectValueType('123-456-7890')).toBe('phone');
      expect(detectValueType('(123) 456-7890')).toBe('phone');
    });

    it('should detect unknown types', () => {
      expect(detectValueType('invalid')).toBe('unknown');
      expect(detectValueType('')).toBe('unknown');
    });
  });

  /**
   * Test suite for phone number normalization functionality. This test suite
   * covers the following main areas, testing the normalization of phone numbers
   * to a consistent format.
   */
  describe('normalizePhone', () => {
    it('should normalize US phone numbers', () => {
      expect(normalizePhone('1234567890')).toBe('+11234567890');
      expect(normalizePhone('(123) 456-7890')).toBe('+11234567890');
      expect(normalizePhone('123-456-7890')).toBe('+11234567890');
    });

    it('should normalize international phone numbers', () => {
      expect(normalizePhone('+44123456789')).toBe('+44123456789');
      expect(normalizePhone('44 1234 56789')).toBe('+44123456789');
    });

    it('should return null for invalid phone numbers', () => {
      expect(normalizePhone('123')).toBeNull();
      expect(normalizePhone('1234567890123456')).toBeNull();
      expect(normalizePhone('invalid')).toBeNull();
    });
  });

  /**
   * Test suite for CSV processing functionality. This test suite covers the
   * following main areas, testing the processing of CSV files containing contact
   * information, the detection of email and phone number formats, the
   * standardization of phone number formats, and the generation of consistent
   * hashes for contact information.
   */
  describe('processCSV', () => {
    const createCSVFile = (content: string): File => {
      const file = new File([content], 'test.csv', { type: 'text/csv' });
      file.text = async () => content;
      return file;
    };

    it('should process valid email addresses', async () => {
      const mockEmail = 'test@example.com';
      const mockNormalized = 'test@example.com';
      (validateEmail as jest.Mock).mockReturnValue({ isValid: true });
      (normalizeEmail as jest.Mock).mockReturnValue(mockNormalized);

      const file = createCSVFile(mockEmail);
      const result = await processCSV(file);

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].original).toBe(mockEmail);
      expect(result.rows[0].normalized).toBe(mockNormalized);
      expect(result.skippedRows).toBe(0);
    });

    it('should process valid phone numbers', async () => {
      (validateEmail as jest.Mock).mockReturnValue({ isValid: false });

      const file = createCSVFile('1234567890');
      const result = await processCSV(file);

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].original).toBe('1234567890');
      expect(result.rows[0].normalized).toBe('+11234567890');
      expect(result.skippedRows).toBe(0);
    });

    it('should skip invalid entries', async () => {
      (validateEmail as jest.Mock).mockReturnValue({ isValid: false });

      const file = createCSVFile('invalid\n1234567890\ninvalid2');
      const result = await processCSV(file);

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].original).toBe('1234567890');
      expect(result.skippedRows).toBe(2);
    });

    it('should handle empty lines', async () => {
      (validateEmail as jest.Mock).mockReturnValue({ isValid: false });

      const file = createCSVFile('\n1234567890\n\n');
      const result = await processCSV(file);

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].original).toBe('1234567890');
      expect(result.skippedRows).toBe(0);
    });

    it('should throw error for files exceeding record limit', async () => {
      const content = Array(10001).fill('test@example.com').join('\n');
      const file = createCSVFile(content);

      await expect(processCSV(file)).rejects.toThrow(
        'File exceeds maximum record limit of 10000',
      );
    });

    it('should generate correct headers', async () => {
      const file = createCSVFile('test@example.com');
      const result = await processCSV(file);

      expect(result.headers).toEqual([
        'Input',
        'Normalized',
        'SHA256',
        'Base64',
      ]);
    });
  });

  /**
   * Test suite for hash generation functionality. This test suite covers the
   * following main areas, testing the generation of consistent SHA256 and
   * Base64 hashes for contact information.
   */
  describe('Hash Generation', () => {
    it('should generate consistent SHA256 hashes', () => {
      const input = 'test@example.com';
      const hash1 = generateSha256Hash(input);
      const hash2 = generateSha256Hash(input);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should generate consistent Base64 hashes', () => {
      const input = 'test@example.com';
      const hash1 = generateBase64Hash(input);
      const hash2 = generateBase64Hash(input);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[A-Za-z0-9+/=]+$/);
    });
  });
});
