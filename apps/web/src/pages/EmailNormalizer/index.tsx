import {
  TextField,
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import { useEmailProcessor } from '@/hooks/useEmailProcessor';
import { ResultDisplay } from '@/components/patterns/ResultDisplay';

/**
 * Collects an email address and displays its normalized form and hashes.
 */
export const EmailNormalizer = () => {
  const theme = useTheme();
  const { email, setEmail, error, result, processEmail, clearResults } =
    useEmailProcessor();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <Button
            variant="contained"
            onClick={processEmail}
            disabled={!email}
            sx={{
              minWidth: '120px',
              height: '56px',
            }}
          >
            SUBMIT
          </Button>

          <Button
            variant="outlined"
            onClick={clearResults}
            disabled={!email && !result.normalizedEmail}
            sx={{
              minWidth: '120px',
              height: '56px',
            }}
          >
            CLEAR
          </Button>
        </Stack>
      </Paper>

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
          <ResultDisplay
            title="Normalized Email"
            value={result.normalizedEmail}
          />
          <ResultDisplay title="SHA-256 Hash" value={result.sha256Hash} />
          <ResultDisplay
            title="Base64 Encoded Hash"
            value={result.base64Hash}
          />
        </Box>
      </Paper>
    </Box>
  );
};
