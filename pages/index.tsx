import React, { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import { EmailNormalizer } from '../components/pages/EmailNormalizer';
import { Typography, Box, Paper, useTheme } from '@mui/material';

/**
 * The main page component of the application. It serves as the entry point and
 * provides a layout with navigation between different sections of the
 * application.
 *
 * @returns {JSX.Element} The rendered main page component.
 */
export default function Home() {
  /**
   * State to track the currently selected page. By default, the overview page
   * is selected.
   */
  const [selectedPage, setSelectedPage] = useState('overview');

  /**
   * The theme object provides access to the application's color palette,
   * typography, and other design properties. It is used to style the
   * components within the page.
   */
  const theme = useTheme();

  /**
   * Renders the appropriate page content based on the selected page. The
   * function dynamically switches between the different page components based
   * on the selected page state.
   *
   * @returns {JSX.Element} The rendered page content.
   */
  const renderPage = () => {
    switch (selectedPage) {
      case 'overview':
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
              {/* Renders the title of the overview page. */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: '2.5rem',
                  fontWeight: 400,
                  color: theme.palette.text.primary,
                  mb: 2,
                }}
              >
                Overview
              </Typography>

              {/* Renders the description of the overview page. */}
              <Typography
                variant="body1"
                sx={{
                  maxWidth: '1200px',
                  color: theme.palette.text.secondary,
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  mb: 3,
                }}
              >
                The application is designed to help you normalize and hash
                directly identifying information (DII) such as email addresses.
                This process is essential for privacy-preserving data handling
                and secure information management.
              </Typography>

              {/* Renders the title of the email address normalization section. */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  mb: 2,
                  mt: 4,
                }}
              >
                Email Address Normalization
              </Typography>

              {/* Renders the description of the email address normalization section. */}
              <Typography
                variant="body1"
                sx={{
                  maxWidth: '1200px',
                  color: theme.palette.text.secondary,
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  mb: 3,
                }}
              >
                Email normalization is the process of standardizing email
                addresses to ensure consistent handling. Our tool performs the
                following normalization steps:
              </Typography>

              {/* Renders the paper component that contains the normalization steps. */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: 'white',
                  border: `1px solid ${theme.palette.divider}`,
                  mb: 4,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="body1">
                    • Converts all characters to lowercase.
                  </Typography>
                  <Typography variant="body1">
                    • Removes all whitespace characters.
                  </Typography>

                  <Typography variant="body1">
                    • In gmail.com addresses only: Removes dots (.) from the
                    local part of the email address.
                  </Typography>
                  <Typography variant="body1">
                    • In gmail.com addresses only: Removes everything after the
                    plus sign (+) in the local part.
                  </Typography>
                </Box>
              </Paper>

              {/* Renders the title of the hashing and encoding section. */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 500,
                  color: theme.palette.text.primary,
                  mb: 2,
                }}
              >
                Hashing and Encoding
              </Typography>

              {/* Renders the description of the hashing and encoding section. */}
              <Typography
                variant="body1"
                sx={{
                  maxWidth: '800px',
                  color: theme.palette.text.secondary,
                  fontSize: '1rem',
                  lineHeight: 1.5,
                  mb: 3,
                }}
              >
                After normalization, the email address is processed through two
                steps:
              </Typography>

              {/* Renders the paper component that contains the hashing and encoding steps. */}
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: 'white',
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="body1">
                    1. SHA-256 Hashing: The normalized email is hashed using the
                    SHA-256 algorithm, producing a 64-character hexadecimal
                    string.
                  </Typography>
                  <Typography variant="body1">
                    2. Base64 Encoding: The resulting hash is then encoded using
                    Base64, creating a URL-safe string that can be safely
                    transmitted and stored.
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        );
      case 'email':
        // Renders the email address normalizer page.
        return <EmailNormalizer />;
      default:
        // If an invalid page is selected, reset to the overview page.
        setSelectedPage('overview');
        return null;
    }
  };

  /**
   * Renders the main layout component with the selected page content. The
   * MainLayout component provides the application's core structure, including
   * the top app bar, sidebar, and main content area.
   *
   * @returns {JSX.Element} The rendered main layout component.
   */
  return (
    <MainLayout selectedPage={selectedPage} onPageChange={setSelectedPage}>
      {renderPage()}
    </MainLayout>
  );
}
