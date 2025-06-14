import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../styles/theme';

/**
 * Root application component that wraps all pages in the Next.js application.
 * This component serves as the main entry point for the application and
 * provides theme configuration and CSS baseline reset.
 *
 * @param {Object} props - The properties object for the component.
 * @param {React.ComponentType} props.Component - The page component to be
 * rendered
 * @param {Object} props.pageProps - The initial props that were preloaded for
 * the page
 *
 * @returns {JSX.Element} The rendered application with theme and CSS baseline
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
