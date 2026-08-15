import { createTheme } from "@mui/material/styles";

/** Shared MUI theme for the DII Operator UI. */
export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          "&:hover": {
            boxShadow:
              "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
          },
          boxShadow: "none",
        },
        root: {
          borderRadius: "4px",
          fontSize: "0.875rem",
          fontWeight: 500,
          padding: "8px 24px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#ffffff",
          borderRight: "1px solid #dadce0",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            "&:hover": {
              backgroundColor: "#e8f0fe",
            },
            backgroundColor: "#e8f0fe",
            color: "#1a73e8",
          },
          borderRadius: "0 24px 24px 0",
          marginRight: "16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow:
            "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
        },
      },
    },
  },
  palette: {
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    primary: {
      dark: "#0d47a1",
      light: "#4285f4",
      main: "#1a73e8",
    },
    secondary: {
      dark: "#3c4043",
      light: "#80868b",
      main: "#5f6368",
    },
    text: {
      primary: "#202124",
      secondary: "#5f6368",
    },
  },
  typography: {
    body1: {
      color: "#5f6368",
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 500,
      textTransform: "none",
    },
    fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif',
    h1: {
      color: "#202124",
      fontSize: "2.5rem",
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h2: {
      color: "#202124",
      fontSize: "2rem",
      fontWeight: 400,
      lineHeight: 1.3,
    },
    h3: {
      color: "#202124",
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      color: "#202124",
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },
});
