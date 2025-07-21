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
  barlowCondensed: {
    bold: {
      fontFamily: "Barlow Condensed",
      fontWeight: 700,
    },
    semibold: {
      fontFamily: "Barlow Condensed",
      fontWeight: 600,
    },
    medium: {
      fontFamily: "Barlow Condensed",
      fontWeight: 500,
    },
    regular: {
      fontFamily: "Barlow Condensed",
      fontWeight: 400,
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
      mobileWidth: "75%",
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
      minWidth: 30,
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
      language: "#F3F3F3",
      videoDetailDescription: "#000000",
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
      languageCountBorder: "#000000",
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
      language: "#1a2152",
      videoDetailDescription: "#D6D8E0",
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
      languageCountBorder: "#ffffff",
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
    xs: 0, // extra small devices
    sm: 600, // small tablets
    md: 960, // tablets / small laptops
    lg: 1200, // desktops / normal laptops
    lgPlus: 1500, // custom
    xl: 1920, // large monitors
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

  // Home Page

  sectionTitle: {
    // fontSize: "16px", // for xs and sm (<960px)
    fontSize: "11px", // <=390px)

    "@media (min-width:390px)": {
      fontSize: "14px", // md (≥390px)
    },

    "@media (min-width:450px)": {
      fontSize: "16px", // md (≥390px)
    },

    "@media (min-width:960px)": {
      fontSize: "20px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "23.50px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "25px", // xl (≥1920px)
    },
  },

  sectionTitleOfStackLayout: {
    fontSize: "16px", // default // design doesn't have so adding my default size
  },

  advertisementTitle: {
    fontSize: "12px", // // default

    "@media (min-width:1920px)": {
      fontSize: "14px", // xl (≥1920px)
    },
  },

  videoTitle: {
    fontSize: "16px", // default

    "@media (min-width:1920px)": {
      fontSize: "20px", // xl (≥1920px)
    },
  },

  stackCardVideoTitle: {
    fontSize: "12px",

    "@media (max-width:600px)": {
      fontSize: "13px", // md (<=600px)
    },
  },

  sendCopyShareLabel: {
    fontSize: "16px", // for xs and sm (<960px)

    "@media (min-width:960px)": {
      fontSize: "11.25px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "11.25px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "16px", // xl (≥1920px)
    },
  },

  viewMoreLabel: {
    fontSize: "14px", // default

    "@media (min-width:1920px)": {
      fontSize: "18px", // xl (≥1920px)
    },
  },

  languageText: {
    fontSize: "12px", // default

    "@media (min-width:960px)": {
      fontSize: "11.25px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "11.25px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "16px", // xl (≥1920px)
    },
  },

  // For small device language list text
  languageOptionText: {
    fontSize: "18px",
  },

  // For large device language list text
  languageOptionTextLarge: {
    fontSize: "12px",

    "@media (min-width:1920px)": {
      fontSize: "14px", // xl (≥1920px)
    },
  },

  adDescription: {
    fontSize: "12px", // default

    "@media (min-width:450px)": {
      fontSize: "14px", // md (≥960px)
    },

    "@media (min-width:960px)": {
      fontSize: "13.125px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "13.125px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "18px", // xl (≥1920px)
    },
  },

  adSponsored: {
    fontSize: "12px", // default
    "@media (min-width:960px)": {
      fontSize: "13.125px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "13.125px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "18px", // xl (≥1920px)
    },
  },

  adLearnMoreLabel: {
    fontSize: "14px", // default

    "@media (min-width:960px)": {
      fontSize: "14px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "14px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "19px !important", // xl (≥1920px)
    },
  },

  footerSlogan: {
    fontSize: "16px", // default

    "@media (min-width:960px)": {
      fontSize: "13.125px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "13.125px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "16px", // xl (≥1920px)
    },
  },

  footerEmail: {
    fontSize: "16px", // default

    "@media (min-width:960px)": {
      fontSize: "13.125px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "13.125px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "16px", // xl (≥1920px)
    },
  },

  footerLinks: {
    fontSize: "14px", // default

    "@media (min-width:960px)": {
      fontSize: "13.125px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "13.125px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "16px", // xl (≥1920px)
    },
  },

  // Video Detail Page

  backToText: {
    fontSize: "16px", // default

    "@media (min-width:960px)": {
      fontSize: "13.125px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "13.125px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "16px !important", // xl (≥1920px)
    },
  },

  sectionTitleOfVideoDetailPage: {
    fontSize: "12px", // default // design doesn't have so adding my default size

    "@media (min-width:960px)": {
      fontSize: "14px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "14px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "16px !important", // xl (≥1920px)
    },
  },

  videoTitleOfVideoDetailPage: {
    fontSize: "16px", // default

    "@media (min-width:960px)": {
      fontSize: "19px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "19px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "30px !important", // xl (≥1920px)
    },
  },

  videoDescriptionOfVideoDetailPage: {
    fontSize: "20px", // default

    "@media (min-width:960px)": {
      fontSize: "14px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "14px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "20px !important", // xl (≥1920px)
    },
  },

  // Short Detail Page

  shortTitleOfShortDetailPage: {
    fontSize: "16px", // default

    "@media (min-width:960px)": {
      fontSize: "15px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "15px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "24px !important", // xl (≥1920px)
    },
  },

  previousNextOfShortDetailPage: {
    fontSize: "12px", // default

    "@media (min-width:960px)": {
      fontSize: "10px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "10px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "14px", // xl (≥1920px)
    },
  },

  // Sidebar

  welcomeUserText: {
    fontSize: "14px",
  },

  menuItems: {
    fontSize: "14px", // default  //  design not given for small device so adding my default

    "@media (min-width:960px)": {
      fontSize: "12px", // md (≥960px)
    },

    "@media (min-width:1400px)": {
      fontSize: "12px", // lg (≥1400px)
    },

    "@media (min-width:1920px)": {
      fontSize: "14px !important", // xl (≥1920px)
    },
  },

  // Search video page

  searchResultText: {
    fontSize: "15px", // default

    "@media (min-width:1920px)": {
      fontSize: "25px !important", // xl (≥1920px)
    },
  },

  noVideosFoundText: {
    fontSize: "20px", // default

    "@media (min-width:1920px)": {
      fontSize: "36px", // xl (≥1920px)
    },
  },

  // Search video page

  searchResultText: {
    fontSize: "15px", // default

    "@media (min-width:1920px)": {
      fontSize: "25px !important", // xl (≥1920px)
    },
  },

  noVideosFoundText: {
    fontSize: "20px", // default

    "@media (min-width:1920px)": {
      fontSize: "36px", // xl (≥1920px)
    },
  },

  // Read more button text of mobile size in video detail page
  readMoreText: {
    fontSize: "20px",
  },

  // privacy policy and terms and conditions font
  privacyPolicyText: {
    fontSize: "15px",
    "@media (min-width:1920px)": {
      fontSize: "16px", // xl (≥1920px)
    },
    // wordSpacing: "0.2rem",
  },

  termsText: {
    fontSize: "15px",
    "@media (min-width:1920px)": {
      fontSize: "16px", // xl (≥1920px)
    },
    // wordSpacing: "0.2rem",
  },
};

const customHeightsForGridCard = {
  ad: {
    xs: "104px",
    sm: "104px",
    md: "120px",
    lg: "110px",
    lgPlus: "110px",
    xl: "140px",
  },
  short: {
    xs: "80vh",
    sm: "550px",
    md: "480px",
    lg: "420px",
    lgPlus: "480px",
    xl: "580px",
  },
  content: {
    xs: "215px",
    sm: "155px",
    md: "158px",
    lg: "191px",
    lgPlus: "210px",
    xl: "245px",
  },
};

const customDimensionForSliderCard = {
  xs: {
    width: "194px",
    height: "345px",
  },
  sm: {
    width: "194px",
    height: "345px",
  },
  md: {
    width: "230px",
    height: "380px",
  },
  lg: {
    width: "210px",
    height: "380px",
  },
  xl: {
    width: "326px",
    height: "580px",
  },
};

const customDimensionsForStackCard = {
  xs: {
    width: "124px",
    height: "70px",
  },
  sm: {
    width: "124px",
    height: "70px",
  },
  md: {
    width: "100px",
    height: "50px",
  },
  lg: {
    width: "100px",
    height: "50px",
  },
  xl: {
    width: "124px",
    height: "70px",
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
  customHeightsForGridCard,
  customDimensionForSliderCard,
  customDimensionsForStackCard,
});

// Create theme instance
const createAppTheme = (mode) => {
  return createTheme(getDesignTokens(mode));
};

export default createAppTheme;
