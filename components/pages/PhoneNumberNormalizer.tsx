import React from 'react';
import {
  TextField,
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import { usePhoneProcessor } from '../../hooks/usePhoneProcessor';
import { ResultDisplay } from '../common/ResultDisplay';

/**
 * A component that provides a user interface for normalizing phone numbers
 * and generating their corresponding hashes. The component allows users to
 * input a phone number, normalize it, and generate a SHA-256 hash of the
 * normalized phone number.
 *
 * @returns {JSX.Element} - The rendered phone number normalizer component.
 */
export const PhoneNumberNormalizer: React.FC = () => {
  /**
   * The theme object provides access to the application's color palette,
   * typography, and other design properties. It is used to style the
   * components within the page.
   */
  const theme = useTheme();

  /**
   * Custom hook that handles phone number processing logic. It provides the phone
   * number, error, and result states, as well as the functions to process
   * the phone number and clear the results.
   */
  const {
    phoneNumber,
    setPhoneNumber,
    error,
    result,
    processPhone,
    clearResults,
  } = usePhoneProcessor();

  /**
   * Renders the phone number normalizer component. The component consists of
   * a header section, an input section, and a results section. The header
   * section contains the title and description of the phone number
   * normalizer. The input section contains the phone number input field and
   * the action buttons. The results section contains the normalized phone
   * number and the SHA-256 hash.
   *
   * @returns {JSX.Element} - The rendered phone number normalizer component.
   */
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Renders the header section of the phone number normalizer
       * component. */}
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 400,
            color: theme.palette.text.primary,
            mb: 2,
          }}
        >
          Phone Number Normalizer
        </Typography>

        {/* Renders the description of the phone number normalizer. */}
        <Typography
          variant="body1"
          sx={{
            maxWidth: '1200px',
            color: theme.palette.text.secondary,
            fontSize: '1rem',
            lineHeight: 1.5,
          }}
        >
          A phone number hash is a Base64-encoded SHA-256 hash of a normalized
          phone number. The phone number is first normalized, then hashed using
          the SHA-256 hashing algorithm, and then the resulting bytes of the
          hash value are encoded using Base64 encoding
        </Typography>
      </Box>

      {/* Renders the input section of the phone number normalizer
       * component. */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: 'white',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="flex-start">
          {/* Renders the phone number input field with validation. */}
          <TextField
            fullWidth
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            placeholder="Enter a phone number to normalize (e.g., +1 (555) 123-4567)"
            error={!!error}
            helperText={error}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />

          {/* Renders the submit button - disabled when no phone number is
           * entered. */}
          <Button
            variant="contained"
            onClick={processPhone}
            disabled={!phoneNumber}
            sx={{
              minWidth: '120px',
              height: '56px',
            }}
          >
            SUBMIT
          </Button>

          {/* Renders the clear button - disabled when no results to
           * clear. */}
          <Button
            variant="outlined"
            onClick={clearResults}
            disabled={!phoneNumber && !result.normalizedPhone}
            sx={{
              minWidth: '120px',
              height: '56px',
            }}
          >
            CLEAR
          </Button>
        </Stack>
      </Paper>

      {/* Renders the results section of the phone number normalizer
       * component. */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          backgroundColor: 'white',
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Renders the normalized phone number. */}
          <ResultDisplay
            title="Normalized Phone Number"
            value={result.normalizedPhone}
            field="normalized"
          />

          {/* Renders the SHA-256 hash. */}
          <ResultDisplay
            title="SHA-256 Hash"
            value={result.sha256Hash}
            field="sha256"
          />

          {/* Renders the Base64 encoded hash. */}
          <ResultDisplay
            title="Base64 Encoded Hash"
            value={result.base64Hash}
            field="base64"
          />
        </Box>
      </Paper>
    </Box>
  );
};
