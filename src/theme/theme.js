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
    small: {
      fontFamily: "Montserrat",
      fontWeight: 300,
    },
    extraSmall: {
      fontFamily: "Montserrat",
      fontWeight: 200,
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

// Font size configuration
export const fontSize = {
  // Typography variants
  typography: {
    h1: "2.5rem", // 40px
    h2: "2rem", // 32px
    h3: "1.75rem", // 28px
    h4: "1.5rem", // 24px
    h5: "1.25rem", // 20px
    h6: "1rem", // 16px
    subtitle1: "1.125rem", // 18px
    subtitle2: "1rem", // 16px
    body1: "1rem", // 16px
    body2: "0.875rem", // 14px
    caption: "0.75rem", // 12px
    overline: "0.625rem", // 10px
  },

  // Icons
  icon: {
    large: "2rem", // 32px
    medium: "1.5rem", // 24px
    small: "1.25rem", // 20px
    tiny: "1rem", // 16px
  },

  // Form elements
  form: {
    label: "0.875rem", // 14px
    input: "1rem", // 16px
    helper: "0.75rem", // 12px
    error: "0.75rem", // 12px
  },

  // Navigation
  nav: {
    primary: "0.875rem", // 14px
    secondary: "0.75rem", // 12px
  },

  // Buttons
  button: {
    large: "1rem", // 16px
    medium: "0.875rem", // 14px
    small: "0.75rem", // 12px
  },

  // Special cases
  display: {
    hero: "4rem", // 64px
    large: "3rem", // 48px
    medium: "2.5rem", // 40px
    small: "2rem", // 32px
  },
};

// Layout configuration
export const layout = {
  // Sidebar dimensions
  sidebar: {
    drawer: {
      width: 300,
      mobileWidth: "50%",
    },
    mini: {
      width: 70,
    },
  },

  // AppBar/Header
  appBar: {
    height: 64,
  },

  // Spacing and dimensions
  spacing: {
    // Border widths
    border: {
      thin: "1px",
      medium: "2px",
      thick: "3px",
    },

    // Common padding/margin values
    padding: {
      xxsmall: 0.25,
      xsmall: 0.5,
      small: 1,
      medium: 2,
      large: 3,
      xlarge: 4,
    },

    // Gap values for different components
    gap: {
      xxsmall: 0.25,
      xsmall: 0.5,
      small: 1,
      medium: 2,
    },

    // Icon container dimensions
    iconContainer: {
      minWidth: 40,
      maxWidth: 60,
    },

    // Button heights for different sections
    buttonHeight: {
      topIcons: 64,
      topIconsCompact: 48,
      bottomIcons: 40,
      bottomIconsCompact: 32,
      regular: 48,
    },
  },

  // Typography layout
  text: {
    lineHeight: {
      tight: 1,
      normal: 1.2,
      relaxed: 1.5,
    },
    maxWidth: {
      iconLabel: "60px",
      button: "200px",
      content: "800px",
    },
  },
};

// Color palette configuration
export const palette = {
  light: {
    primary: {
      main: "#001691",
      light: "#1a2f9f",
      dark: "#001066",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: "#FF0000",
      dark: "#CC0000",
    },
    background: {
      default: "#ffffff",
      footer: "#f5f5f5",
      paper: "#ffffff",
      sectionBg: "#FAFAFA",
      videoDetailSectionBg: "#F2F2F2",
    },
    text: {
      primary: "#000000",
      secondary: "rgba(0, 0, 0, 0.7)",
    },
    custom: {
      brandBlue: "#001691",
      adText: "rgba(0, 0, 0, 0.7)",
      youtube: {
        main: "#FF0000",
        dark: "#CC0000",
      },
      advertisementColor: "#2E2D2D",
    },
  },
  dark: {
    primary: {
      main: "#ffffff",
      light: "#ffffff",
      dark: "#e0e0e0",
    },
    secondary: {
      main: "#f50057",
    },
    error: {
      main: "#FF0000",
      dark: "#CC0000",
    },
    background: {
      default: "#040C38",
      paper: "#0a1445",
      sectionBg: "#03092B",
      videoDetailSectionBg: "#03092B",
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255, 255, 255, 0.7)",
    },
    custom: {
      lightBlue: "#1a2152",
      adText: "rgba(0, 0, 0, 0.7)",
      youtube: {
        main: "#FF0000",
        dark: "#CC0000",
      },
      advertisementColor: "#ffffff",
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
    fontSize: fontSize.typography.h1,
  },
  h2: {
    ...fontStyles.montserrat.semibold,
    fontSize: fontSize.typography.h2,
  },
  h3: {
    ...fontStyles.montserrat.semibold,
    fontSize: fontSize.typography.h3,
  },
  h4: {
    ...fontStyles.montserrat.medium,
    fontSize: fontSize.typography.h4,
  },
  h5: {
    ...fontStyles.montserrat.medium,
    fontSize: fontSize.typography.h5,
  },
  h6: {
    ...fontStyles.montserrat.medium,
    fontSize: fontSize.typography.h6,
  },
  subtitle1: {
    ...fontStyles.openSans.semibold,
    fontSize: fontSize.typography.subtitle1,
  },
  subtitle2: {
    ...fontStyles.openSans.regular,
    fontSize: fontSize.typography.subtitle2,
  },
  body1: {
    ...fontStyles.sfPro.text.regular,
    fontSize: fontSize.typography.body1,
  },
  body2: {
    ...fontStyles.sfPro.text.regular,
    fontSize: fontSize.typography.body2,
  },
  button: {
    ...fontStyles.openSans.semibold,
    fontSize: fontSize.button.medium,
    textTransform: "none",
  },
  caption: {
    ...fontStyles.sfPro.condensed.regular,
    fontSize: fontSize.typography.caption,
    letterSpacing: "0.01em",
  },
  overline: {
    ...fontStyles.openSans.regular,
    fontSize: fontSize.typography.overline,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: "1rem", // sm (default)

    "@media (min-width:900px)": {
      fontSize: "1.25rem", // lg
    },
    "@media (min-width:1400px)": {
      fontSize: "1.563rem", // xl
    },
  },
  advertisementTitle: {
    fontSize: "0.75rem", // sm (default)

    "@media (min-width:900px)": {
      fontSize: "0.80rem", // lg
    },
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
