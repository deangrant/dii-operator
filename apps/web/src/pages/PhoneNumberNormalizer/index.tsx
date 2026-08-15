import {
  TextField,
  Paper,
  Typography,
  Box,
  Button,
  Stack,
  useTheme,
} from '@mui/material';
import { usePhoneProcessor } from '@/hooks/usePhoneProcessor';
import { ResultDisplay } from '@/components/patterns/ResultDisplay';

/**
 * Collects a phone number and displays its normalized form and hashes.
 */
export const PhoneNumberNormalizer = () => {
  const theme = useTheme();
  const {
    phoneNumber,
    setPhoneNumber,
    error,
    result,
    processPhone,
    clearResults,
  } = usePhoneProcessor();

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
          Phone Number Normalizer
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
          A phone number hash is a Base64-encoded SHA-256 hash of a normalized
          phone number. The phone number is first normalized, then hashed using
          the SHA-256 hashing algorithm, and then the resulting bytes of the
          hash value are encoded using Base64 encoding
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
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            title="Normalized Phone Number"
            value={result.normalizedPhone}
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
