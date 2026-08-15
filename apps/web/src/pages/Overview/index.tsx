import { Box, Paper, Typography, useTheme } from "@mui/material";

/**
 * Explains DII normalization and hashing rules for email and phone inputs.
 */
export const Overview = () => {
  const theme = useTheme();

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
          Overview
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: "1200px",
            mb: 3,
          }}
          variant="body1"
        >
          The application is designed to help you normalize and hash directly
          identifying information (DII) such as email addresses and phone
          numbers. This process is essential for privacy-preserving data
          handling and secure information management.
        </Typography>

        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 500,
            mb: 2,
            mt: 4,
          }}
          variant="h2"
        >
          Email Address Normalization
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: "1200px",
            mb: 3,
          }}
          variant="body1"
        >
          Email normalization is the process of standardizing email addresses to
          ensure consistent handling. Our tool performs the following
          normalization steps:
        </Typography>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            mb: 4,
            p: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">
              • Converts all characters to lowercase.
            </Typography>
            <Typography variant="body1">
              • Removes all whitespace characters.
            </Typography>
            <Typography variant="body1">
              • In gmail.com addresses only: Removes dots (.) from the local
              part of the email address.
            </Typography>
            <Typography variant="body1">
              • In gmail.com addresses only: Removes everything after the plus
              sign (+) in the local part.
            </Typography>
          </Box>
        </Paper>

        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 500,
            mb: 2,
            mt: 4,
          }}
          variant="h2"
        >
          Phone Number Normalization
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: "1200px",
            mb: 3,
          }}
          variant="body1"
        >
          Phone number normalization is the process of standardizing phone
          numbers to ensure consistent handling. Our tool performs the following
          normalization steps:
        </Typography>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            mb: 4,
            p: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">
              • Removes all non-digit characters (spaces, dashes, parentheses,
              etc.).
            </Typography>
            <Typography variant="body1">
              • Ensures the number starts with country code (1 for US numbers).
            </Typography>
          </Box>
        </Paper>

        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: 500,
            mb: 2,
          }}
          variant="h2"
        >
          Hashing and Encoding
        </Typography>

        <Typography
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "1rem",
            lineHeight: 1.5,
            maxWidth: "800px",
            mb: 3,
          }}
          variant="body1"
        >
          After normalization, both email addresses and phone numbers are
          processed through two steps:
        </Typography>

        <Paper
          elevation={0}
          sx={{
            backgroundColor: "background.paper",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            p: 4,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="body1">
              1. SHA-256 Hashing: The normalized input is hashed using the
              SHA-256 algorithm, producing a 64-character hexadecimal string.
            </Typography>
            <Typography variant="body1">
              2. Base64 Encoding: The resulting hash is then encoded using
              Base64, creating a URL-safe string that can be safely transmitted
              and stored.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};
