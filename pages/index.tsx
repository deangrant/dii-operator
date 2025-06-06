import React from 'react';
import {
  Container,
  TextField,
  Paper,
  Typography,
  Box,
  Button,
  Stack,
} from '@mui/material';
import { useEmailProcessor } from '../hooks/useEmailProcessor';
import { ResultDisplay } from '../components/common/ResultDisplay';

/**
 * A component that provides a user interface for normalizing email addresses
 * and generating their corresponding hashes. The component implements a text
 * field for entering an email address, a button for submitting the email
 * address, a button for clearing the results, and a display for the normalized
 * email address, the SHA-256 hash, and the Base64 encoded hash.
 *
 * @returns {JSX.Element} A fully functional email normalization interface.
 */
export default function Home() {
  /**
   * A hook that provides the email processor functionality.
   * @type {UseEmailProcessorResult}
   */
  const { email, setEmail, error, result, processEmail, clearResults } =
    useEmailProcessor();

  /**
   * Renders the main component.
   *
   * @returns {JSX.Element} A fully functional email normalization interface.
   */
  return (
    // Renders the main container with a gradient background and a container
    // for the content.
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
        py: 6,
      }}
    >
      {/* Renders the container with the content and maximum width. */}
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          {/* Renders the header section with the title and description. */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
              }}
            >
              Email Address Normalizer
            </Typography>

            {/* Renders the description of the email normalization process. */}
            <Typography
              variant="body1"
              sx={{
                maxWidth: '800px',
                mx: 'auto',
                color: 'text.secondary',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}
            >
              An email hash is a Base64-encoded SHA-256 hash of a normalized
              email address. The email address is first normalized, then hashed
              using the SHA-256 hashing algorithm, and then the resulting bytes
              of the hash value are encoded using Base64 encoding.
            </Typography>
          </Box>

          {/* Renders the paper component with the email input and buttons. */}
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Stack direction="row" spacing={2}>
              {/* Renders the text field for the email address. */}
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter an email address to normalize"
                error={!!error}
                helperText={error}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />

              {/* Renders the button for submitting the email address. */}
              <Button
                variant="contained"
                onClick={processEmail}
                disabled={!email}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  boxShadow:
                    '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow:
                      '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Submit
              </Button>

              {/* Renders the button for clearing the results. */}
              <Button
                variant="outlined"
                onClick={clearResults}
                disabled={!email && !result.normalizedEmail}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'uppercase',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Clear
              </Button>
            </Stack>
          </Paper>

          {/* Renders the paper component with the results. */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
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
      </Container>
    </Box>
  );
}
