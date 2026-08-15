import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useCallback } from "react";
import { ResultDisplay } from "@/components/patterns/ResultDisplay";
import { usePhoneProcessor } from "@/hooks/use-phone-processor";

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

  const handlePhoneChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPhoneNumber(event.target.value);
    },
    [setPhoneNumber],
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: "2.5rem",
            fontWeight: 400,
            mb: 2,
          }}
          variant="h1"
        >
          Phone Number Normalizer
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: "1200px",
          }}
          variant="body1"
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
          backgroundColor: "white",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 3,
        }}
      >
        <Stack alignItems="flex-start" direction="row" spacing={2}>
          <TextField
            error={!!error}
            fullWidth
            helperText={error}
            label="Phone Number"
            onChange={handlePhoneChange}
            placeholder="Enter a phone number to normalize (e.g., +1 (555) 123-4567)"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
            value={phoneNumber}
            variant="outlined"
          />

          <Button
            disabled={!phoneNumber}
            onClick={processPhone}
            sx={{
              height: "56px",
              minWidth: "120px",
            }}
            variant="contained"
          >
            SUBMIT
          </Button>

          <Button
            disabled={!(phoneNumber || result.normalizedPhone)}
            onClick={clearResults}
            sx={{
              height: "56px",
              minWidth: "120px",
            }}
            variant="outlined"
          >
            CLEAR
          </Button>
        </Stack>
      </Paper>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: "white",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
