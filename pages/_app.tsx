import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';

/**
 * Global theme configuration for material-ui application. This theme object
 * defines the visual styling and behavior of the components throughout the
 * application.
 *
 * @property {Object} palette - The palette object defines the colors used in
 * the application.
 * @property {string} palette.mode - The mode of the palette, either 'light' or
 * 'dark'.
 * @property {Object} palette.primary - The primary color of the application.
 * @property {string} palette.primary.main - The main color of the primary
 * palette.
 * @property {Object} background - The background object defines the background
 * color of the application.
 * @property {string} background.default - The default background color of the
 * application.
 * @property {Object} components - The components object defines the styling of
 * the components throughout the application.
 * @property {Object} components.MuiPaper - The MuiPaper object defines the
 * styling of the paper component.
 * @property {Object} components.MuiPaper.styleOverrides - The styleOverrides
 * object defines the styling of the paper component.
 * @property {Object} components.MuiPaper.styleOverrides.root - The root object
 * defines the styling of the paper component.
 * @property {Object} components.MuiPaper.styleOverrides.root - The root object
 * defines the styling of the paper component.
 * @property {string} components.MuiPaper.styleOverrides.root.padding - The
 * padding of the paper component.
 * @property {string} components.MuiPaper.styleOverrides.root.marginTop - The
 * margin top of the paper component.
 *
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '24px',
          marginTop: '24px',
        },
      },
    },
  },
});

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
