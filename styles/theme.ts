import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1a73e8',
      light: '#4285f4',
      dark: '#0d47a1',
    },
    secondary: {
      main: '#5f6368',
      light: '#80868b',
      dark: '#3c4043',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#202124',
      secondary: '#5f6368',
    },
  },
  typography: {
    fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
      color: '#202124',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 400,
      lineHeight: 1.3,
      color: '#202124',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#202124',
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#202124',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#5f6368',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '8px 24px',
          fontSize: '0.875rem',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow:
              '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            '0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
          borderRadius: '8px',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid #dadce0',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: '0 24px 24px 0',
          marginRight: '16px',
          '&.Mui-selected': {
            backgroundColor: '#e8f0fe',
            color: '#1a73e8',
            '&:hover': {
              backgroundColor: '#e8f0fe',
            },
          },
        },
      },
    },
  },
});
