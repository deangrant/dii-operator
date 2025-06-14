import { validateEmail, normalizeEmail } from '../utils/email/normalize';

/**
 * Test suite for email validation functionality. Validates that the email
 * validation function correctly identifies valid and invalid email addresses
 * and provides appropriate error messages.
 */
describe('Email Validation', () => {
  /**
   * Tests that valid email addresses are correctly identified. Validates both
   * simple and complex email formats.
   */
  test('validates correct email addresses', () => {
    expect(validateEmail('test@example.com').isValid).toBe(true);
    expect(validateEmail('user.name@domain.co.uk').isValid).toBe(true);
  });

  /**
   * Tests that invalid email addresses are correctly identified. Covers various
   * invalid formats including missing domain, missing local part, and
   * completely invalid strings.
   */
  test('invalidates incorrect email addresses', () => {
    expect(validateEmail('invalid').isValid).toBe(false);
    expect(validateEmail('test@').isValid).toBe(false);
    expect(validateEmail('@domain.com').isValid).toBe(false);
  });

  /**
   * Tests that appropriate error messages are returned for invalid email
   * addresses. Verifies both empty input and malformed email address cases.
   */
  test('returns error message for invalid emails', () => {
    expect(validateEmail('').error).toBe('Email address is required');
    expect(validateEmail('invalid').error).toBe(
      'Please enter a valid email address',
    );
  });
});

/**
 * Test suite for email normalization functionality. Ensures that email
 * addresses are properly normalized according to UID2 specifications, including
 * case conversion, whitespace removal, and handling of special characters.
 */
describe('Email Normalization', () => {
  /**
   * Tests that email addresses are correctly normalized. Verifies handling of
   * mixed case, dots in local part, and plus addressing.
   */
  test('normalizes email addresses correctly', () => {
    expect(normalizeEmail('Test.User@Example.com')).toBe(
      'testuser@example.com',
    );
    expect(normalizeEmail('test.user+label@example.com')).toBe(
      'testuser@example.com',
    );
  });

  /**
   * Tests that empty input is handled gracefully. Verifies that empty string
   * input returns an empty string.
   */
  test('handles empty input', () => {
    expect(normalizeEmail('')).toBe('');
  });

  /**
   * Tests that the domain part of email addresses is properly normalized.
   * Verifies that domain case is converted to lowercase while preserving the
   * domain structure.
   */
  test('preserves domain part', () => {
    expect(normalizeEmail('test@EXAMPLE.COM')).toBe('test@example.com');
  });

  /**
   * Tests that whitespace is properly removed from email addresses. Verifies
   * handling of spaces in both local part and domain.
   */
  test('removes whitespace', () => {
    expect(normalizeEmail(' test.user @ example.com ')).toBe(
      'testuser@example.com',
    );
  });
});
