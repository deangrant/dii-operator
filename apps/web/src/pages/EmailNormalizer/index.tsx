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
import { useEmailProcessor } from "@/hooks/use-email-processor";

/**
 * Collects an email address and displays its normalized form and hashes.
 */
export const EmailNormalizer = () => {
  const theme = useTheme();
  const { email, setEmail, error, result, processEmail, clearResults } =
    useEmailProcessor();

  const handleEmailChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    },
    [setEmail],
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <Box>
        <Typography
          sx={{
            fontSize: "2.5rem",
            fontWeight: 400,
            mb: 2,
          }}
          variant="h1"
        >
          Email Address Normalizer
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
          An email hash is a Base64-encoded SHA-256 hash of a normalized email
          address. The email address is first normalized, then hashed using the
          SHA-256 hashing algorithm, and then the resulting bytes of the hash
          value are encoded using Base64 encoding.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: "background.paper",
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
            label="Email Address"
            onChange={handleEmailChange}
            placeholder="Enter an email address to normalize"
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
            value={email}
            variant="outlined"
          />

          <Button
            disabled={!email}
            onClick={processEmail}
            sx={{
              height: "56px",
              minWidth: "120px",
            }}
            variant="contained"
          >
            SUBMIT
          </Button>

          <Button
            disabled={!(email || result.normalizedEmail)}
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
          backgroundColor: "background.paper",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
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
