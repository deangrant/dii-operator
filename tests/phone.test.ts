import { validatePhone, normalizePhone } from '../utils/phone/normalize';

/**
 * Test suite for phone number validation functionality. Validates that the phone
 * number validation function correctly identifies valid and invalid phone numbers
 * according to E.164 format.
 */
describe('Phone Number Validation', () => {
  /**
   * Tests that valid phone numbers are correctly identified. Validates both
   * simple and formatted phone numbers.
   */
  test('validates correct phone numbers', () => {
    expect(validatePhone('+12345678901')).toBe(true);
    expect(validatePhone('12345678901')).toBe(true);
    expect(validatePhone('+1 (234) 567-8901')).toBe(true);
    expect(validatePhone('1 (234) 567-8901')).toBe(true);
  });

  /**
   * Tests that invalid phone numbers are correctly identified. Covers various
   * invalid formats including missing country code, invalid characters, and
   * incorrect lengths.
   */
  test('invalidates incorrect phone numbers', () => {
    expect(validatePhone('123')).toBe(false); // Too short
    expect(validatePhone('1234567890123456')).toBe(false); // Too long
    expect(validatePhone('0123456789')).toBe(false); // Starts with 0
    expect(validatePhone('abc1234567')).toBe(false); // Contains letters
    expect(validatePhone('+1234567890123456')).toBe(false); // Too long with +
  });

  /**
   * Tests that phone numbers with various formatting characters are properly
   * validated. Verifies handling of spaces, dashes, and parentheses.
   */
  test('handles formatting characters', () => {
    expect(validatePhone('+1-234-567-8901')).toBe(true);
    expect(validatePhone('1 234 567 8901')).toBe(true);
    expect(validatePhone('(123) 456-7890')).toBe(true);
    expect(validatePhone('+1 (234) 567-8901')).toBe(true);
  });
});

/**
 * Test suite for phone number normalization functionality. Ensures that phone
 * numbers are properly normalized to E.164 format, including handling of
 * formatting characters and special cases.
 */
describe('Phone Number Normalization', () => {
  /**
   * Tests that phone numbers are correctly normalized to E.164 format.
   * Verifies handling of various input formats.
   */
  test('normalizes phone numbers correctly', () => {
    expect(normalizePhone('+12345678901')).toBe('+12345678901');
    expect(normalizePhone('12345678901')).toBe('+12345678901');
    expect(normalizePhone('+1 (234) 567-8901')).toBe('+12345678901');
    expect(normalizePhone('1 (234) 567-8901')).toBe('+12345678901');
  });

  /**
   * Tests that empty input is handled gracefully. Verifies that empty string
   * input returns an empty string.
   */
  test('handles empty input', () => {
    expect(normalizePhone('')).toBe('');
  });

  /**
   * Tests that formatting characters are properly removed during normalization.
   * Verifies handling of spaces, dashes, and parentheses.
   */
  test('removes formatting characters', () => {
    expect(normalizePhone('+1-234-567-8901')).toBe('+12345678901');
    expect(normalizePhone('1 234 567 8901')).toBe('+12345678901');
    expect(normalizePhone('(123) 456-7890')).toBe('+1234567890');
  });

  /**
   * Tests special case handling for Australian numbers. Verifies that leading
   * zeros after the country code are properly removed.
   */
  test('handles Australian numbers', () => {
    expect(normalizePhone('+61212345678')).toBe('+61212345678');
    expect(normalizePhone('+610212345678')).toBe('+61212345678');
    expect(normalizePhone('61212345678')).toBe('+61212345678');
    expect(normalizePhone('610212345678')).toBe('+61212345678');
  });
});
