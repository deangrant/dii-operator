# Directly Identifying Information (DII) Operator

A standardized email and phone number normalization and hashing utility that follows UID2 specifications for email address and phone number processing. This tool ensures consistent normalization and hash generation for identity resolution and data matching purposes.

## Overview

This application implements the UID2 email and phone ormalization and hashing standards, providing a reliable way to generate consistent, standardized hashes. The tool is particularly useful for:

- Identity resolution systems.
- Data matching and deduplication.
- Privacy-preserving user identification.
- Cross-platform user tracking.

## Technical Specifications

### Email Normalization Rules

The application follows the UID2 email normalization standard:

1. **Whitespace Removal**

   - Removes all leading and trailing spaces.
   - Removes all internal whitespace characters.

2. **Case Normalization**

   - Converts all characters to lowercase.

3. **Gmail-Specific Rules**

   - Removes all periods (.) from the local part.
   - For addresses containing a plus sign (+), removes the plus sign and all subsequent characters before the @ symbol.
   - Example: `Jane.Doe+Work@gmail.com` → `janedoe@gmail.com`.

4. **Domain Preservation**
   - Maintains the original domain part without modification.
   - Preserves all characters after the @ symbol.

### Phone Number Normalization Rules

The application follows standard phone number normalization rules:

1. **Character Removal**

   - Removes all non-numeric characters (spaces, dashes, parentheses, etc.).
   - Preserves only digits 0-9.

2. **Country Code Handling**

   - Ensures country code is present (defaults to +1 for US/Canada).
   - Removes any '+' prefix from the country code.
   - Example: `+1 (555) 123-4567` → `15551234567`.

3. **Length Validation**
   - Validates normalized phone number length (typically 10-15 digits).
   - Ensures proper formatting for international numbers.

### Hash Generation

The application generates two types of hashes:

1. **SHA-256 Hash**

   - 64-character hexadecimal string.
   - Generated from the normalized email address.
   - Example: `b4c9a289323b21a01c3e940f150eb9b8c542587f1abfd8f0e1cc1ffc5e475514`.

2. **Base64 Encoded Hash**
   - 44-character string.
   - Base64 encoding of the raw SHA-256 hash bytes.
   - Example: `tMmiiTI7IaAcPpQPFQ65uMVCWH8av9jw4cwf/F5HVRQ=`.

## Implementation Details

### Dependencies

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone [your-repo-url]
cd [your-repo-name]
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Access the application at [http://localhost:3000](http://localhost:3000)

## Usage

### Input Processing

1. Enter an email address or phone number in the input field.
2. The application automatically validates the input format.
3. Click "Submit" to process the email address or phone number.

### Output Generation

The application generates three outputs:

1. Normalized email address.
2. SHA-256 hash (hexadecimal).
3. Base64 encoded hash.

Each output can be copied to the clipboard using the copy button.

## License

This project is licensed under the [MIT License](LICENSE).
