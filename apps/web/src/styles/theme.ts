import { createTheme } from "@mui/material/styles";

/** Dark navy / blue accent palette mapped into MUI. */
const colorBg = "#0d1219";
const colorBgElevated = "#151c28";
const colorBgPanel = "#1a2332";
const colorBorder = "#2a3548";
/** Cool slate body ink — avoids glare from near-white on dark. */
const colorText = "#a8b4c4";
/** Deeper mute for captions and supporting copy. */
const colorTextMuted = "#7a8799";
const colorAccent = "#4a8fd4";
const colorAccentStrong = "#2f6aad";
const colorAccentSoft = "rgba(74, 143, 212, 0.18)";
const colorDanger = "#d9786a";
const colorButtonInk = "#061018";
const shadowPanel = "0 12px 40px rgba(0, 0, 0, 0.35)";
const fontSans = '"Sora", "Avenir Next", "Segoe UI", sans-serif';

/** Shared MUI theme for the DII Operator UI. */
export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          "&:hover": {
            backgroundColor: colorAccentStrong,
            boxShadow: shadowPanel,
            color: colorButtonInk,
          },
          backgroundColor: colorAccent,
          boxShadow: "none",
          color: colorButtonInk,
        },
        root: {
          borderRadius: "6px",
          fontSize: "0.875rem",
          fontWeight: 600,
          padding: "8px 24px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `
            radial-gradient(
              1200px 600px at 10% -10%,
              rgba(74, 143, 212, 0.18),
              transparent 55%
            ),
            radial-gradient(
              900px 500px at 90% 0%,
              rgba(120, 140, 220, 0.08),
              transparent 50%
            ),
            ${colorBg}
          `,
          backgroundAttachment: "fixed",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colorBgElevated,
          borderRight: `1px solid ${colorBorder}`,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            "&:hover": {
              backgroundColor: colorAccentSoft,
            },
            backgroundColor: colorAccentSoft,
            color: colorAccent,
          },
          borderRadius: "0 10px 10px 0",
          marginRight: "16px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            "&:hover": {
              backgroundColor: colorAccentSoft,
            },
            backgroundColor: colorAccentSoft,
            color: colorAccent,
          },
          borderRadius: "0 10px 10px 0",
          marginRight: "16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: "10px",
          boxShadow: shadowPanel,
        },
      },
    },
  },
  palette: {
    background: {
      default: colorBg,
      paper: colorBgPanel,
    },
    divider: colorBorder,
    error: {
      main: colorDanger,
    },
    mode: "dark",
    primary: {
      contrastText: colorButtonInk,
      dark: colorAccentStrong,
      light: colorAccent,
      main: colorAccent,
    },
    secondary: {
      dark: colorBorder,
      light: colorTextMuted,
      main: colorTextMuted,
    },
    text: {
      primary: colorText,
      secondary: colorTextMuted,
    },
  },
  typography: {
    body1: {
      fontSize: "1rem",
      lineHeight: 1.45,
    },
    button: {
      fontWeight: 600,
      textTransform: "none",
    },
    fontFamily: fontSans,
    h1: {
      color: colorAccent,
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      color: colorAccent,
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      color: colorAccent,
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      color: colorAccent,
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      color: colorAccent,
      fontWeight: 600,
    },
    h6: {
      color: colorAccent,
      fontWeight: 600,
    },
  },
});
