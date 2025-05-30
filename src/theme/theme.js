import { createTheme } from "@mui/material/styles";

// Font variables
export const fontStyles = {
  montserrat: {
    bold: {
      fontFamily: "Montserrat",
      fontWeight: 700,
    },
    semibold: {
      fontFamily: "Montserrat",
      fontWeight: 600,
    },
    medium: {
      fontFamily: "Montserrat",
      fontWeight: 500,
    },
    regular: {
      fontFamily: "Montserrat",
      fontWeight: 400,
    },
  },
  openSans: {
    bold: {
      fontFamily: "Open Sans",
      fontWeight: 700,
    },
    semibold: {
      fontFamily: "Open Sans",
      fontWeight: 600,
    },
    regular: {
      fontFamily: "Open Sans",
      fontWeight: 400,
    },
  },
  sfPro: {
    text: {
      bold: {
        fontFamily: "SFProText",
        fontWeight: 700,
      },
      regular: {
        fontFamily: "SFProText",
        fontWeight: 400,
      },
    },
    condensed: {
      bold: {
        fontFamily: "SF Pro Condensed",
        fontWeight: 700,
      },
      regular: {
        fontFamily: "SF Pro Condensed",
        fontWeight: 400,
      },
    },
    display: {
      regular: {
        fontFamily: "SFProDisplay",
        fontWeight: 400,
      },
      bold: {
        fontFamily: "SFProDisplay",
        fontWeight: 700,
      },
    },
  },
};

// Color palette configuration
const palette = {
  light: {
    primary: {
      main: "#001691",
      light: "#1a2f9f",
      dark: "#001066",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "rgba(0, 0, 0, 0.7)",
    },
    custom: {
      brandBlue: "#001691",
      adText: "rgba(0, 0, 0, 0.7)",
    },
  },
  dark: {
    primary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#e0e0e0",
    },
    background: {
      default: "#040C38",
      paper: "#0a1445",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    custom: {
      lightBlue: "#1a2152",
      adText: "rgba(0, 0, 0, 0.7)",
    },
    action: {
      selected: "#1a2152",
      hover: "#232b5e",
    },
  },
};

// Breakpoint configuration
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

// Typography configuration
const typography = {
  fontFamily: ["Montserrat", "Open Sans", "SFProText", "sans-serif"].join(","),
  h1: {
    ...fontStyles.montserrat.bold,
    fontSize: "2.5rem",
  },
  h2: {
    ...fontStyles.montserrat.semibold,
    fontSize: "2rem",
  },
  h3: {
    ...fontStyles.montserrat.semibold,
    fontSize: "1.75rem",
  },
  h4: {
    ...fontStyles.montserrat.medium,
    fontSize: "1.5rem",
  },
  h5: {
    ...fontStyles.montserrat.medium,
    fontSize: "1.25rem",
  },
  h6: {
    ...fontStyles.montserrat.medium,
    fontSize: "1rem",
  },
  subtitle1: {
    ...fontStyles.openSans.semibold,
    fontSize: "0.875rem",
  },
  subtitle2: {
    ...fontStyles.openSans.regular,
    fontSize: "0.875rem",
  },
  body1: {
    ...fontStyles.sfPro.text.regular,
    fontSize: "1rem",
  },
  body2: {
    ...fontStyles.sfPro.text.regular,
    fontSize: "0.875rem",
  },
  button: {
    ...fontStyles.openSans.semibold,
    fontSize: "0.875rem",
    textTransform: "none",
  },
  caption: {
    ...fontStyles.sfPro.condensed.regular,
    fontSize: "0.7rem",
    letterSpacing: "0.01em",
  },
  overline: {
    ...fontStyles.openSans.regular,
    fontSize: "0.75rem",
    textTransform: "uppercase",
  },
};

// Theme configuration
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light" ? palette.light : palette.dark),
  },
  breakpoints,
  typography,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "16px",
          paddingRight: "16px",
          "@media (min-width: 600px)": {
            paddingLeft: "24px",
            paddingRight: "24px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mode === "dark" ? "#0a1445" : "#ffffff",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: mode === "light" ? "#000000" : "#ffffff",
          "&.Mui-selected": {
            color: theme.palette.primary.main,
          },
          ...(mode === "dark" && {
            backgroundColor: theme.palette.custom.lightBlue,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
          }),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...(mode === "dark" && {
            backgroundColor: theme.palette.custom.lightBlue + " !important",
            "&:hover": {
              backgroundColor: theme.palette.action.hover + " !important",
            },
          }),
        }),
        filled: {
          ...(mode === "dark" && {
            backgroundColor: "#1a2152 !important",
          }),
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...(mode === "dark" && {
            backgroundColor: theme.palette.custom.lightBlue,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
            },
            "&.Mui-selected": {
              backgroundColor: theme.palette.action.selected + " !important",
              "&:hover": {
                backgroundColor: theme.palette.action.hover + " !important",
              },
            },
          }),
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          ...(mode === "light" && {
            color:
              ownerState.variant === "subtitle2" ||
              (ownerState.variant === "body1" &&
                ownerState.component === "div" &&
                ownerState.gutterBottom)
                ? theme.palette.custom.brandBlue
                : "inherit",
          }),
          ...(mode === "dark" && {
            color:
              ownerState.variant === "subtitle2" ||
              (ownerState.variant === "body1" &&
                ownerState.component === "div" &&
                ownerState.gutterBottom)
                ? "#ffffff"
                : "inherit",
          }),
        }),
      },
    },
  },
});

// Create theme instance
const createAppTheme = (mode) => {
  return createTheme(getDesignTokens(mode));
};

export default createAppTheme;
