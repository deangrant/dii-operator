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
import { useEmailProcessor } from '../../hooks/useEmailProcessor';
import { ResultDisplay } from '../common/ResultDisplay';

/**
 * A component that provides a user interface for normalizing email addresses
 * and generating their corresponding hashes. The component allows users to
 * input an email address, normalize it, and generate a SHA-256 hash of the
 * normalized email.
 *
 * @returns {JSX.Element} - The rendered email address normalizer component.
 */
export const EmailNormalizer: React.FC = () => {
  /**
   * The theme object provides access to the application's color palette,
   * typography, and other design properties. It is used to style the
   * components within the page.
   */
  const theme = useTheme();

  /**
   * Custom hook that handles email processing logic. It provides the email
   * address, error, and result states, as well as the functions to process
   * the email address and clear the results.
   */
  const { email, setEmail, error, result, processEmail, clearResults } =
    useEmailProcessor();

  /**
   * Renders the email address normalizer component. The component consists of
   * a header section, an input section, and a results section. The header
   * section contains the title and description of the email address
   * normalizer. The input section contains the email address input field and
   * the action buttons. The results section contains the normalized email
   * address and the SHA-256 hash.
   *
   * @returns {JSX.Element} - The rendered email address normalizer component.
   */
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Renders the header section of the email address normalizer
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
          Email Address Normalizer
        </Typography>

        {/* Renders the description of the email address normalizer. */}
        <Typography
          variant="body1"
          sx={{
            maxWidth: '1200px',
            color: theme.palette.text.secondary,
            fontSize: '1rem',
            lineHeight: 1.5,
          }}
        >
          An email hash is a Base64-encoded SHA-256 hash of a normalized email
          address. The email address is first normalized, then hashed using the
          SHA-256 hashing algorithm, and then the resulting bytes of the hash
          value are encoded using Base64 encoding.
        </Typography>
      </Box>

      {/* Renders the input section of the email address normalizer
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
        <Stack direction="row" spacing={2}>
          {/* Renders the email input field with validation. */}
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter an email address to normalize"
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

          {/* Renders the submit button - disabled when no email is
           * entered. */}
          <Button
            variant="contained"
            onClick={processEmail}
            disabled={!email}
            sx={{
              minWidth: '120px',
            }}
          >
            SUBMIT
          </Button>

          {/* Renders the clear button - disabled when no results to
           * clear. */}
          <Button
            variant="outlined"
            onClick={clearResults}
            disabled={!email && !result.normalizedEmail}
            sx={{
              minWidth: '120px',
            }}
          >
            CLEAR
          </Button>
        </Stack>
      </Paper>

      {/* Renders the results section of the email address normalizer
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
          {/* Renders the normalized email address. */}
          <ResultDisplay
            title="Normalized Email"
            value={result.normalizedEmail}
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
