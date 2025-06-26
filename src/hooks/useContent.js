import { useTheme } from "@mui/material";
import {
  getContentConfig,
  getButtonLabel,
  getMessage,
  getUrl,
  getFeature,
  getActionButton,
} from "../config/content";

// Custom hook for centralized content management
export const useContent = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const config = getContentConfig();

  // Get button configuration with theme-aware colors
  const getButtonConfig = (buttonKey) => {
    const buttonConfig = getActionButton(buttonKey);
    if (!buttonConfig.color) return buttonConfig;

    const themeColors = isDarkMode
      ? buttonConfig.color.dark
      : buttonConfig.color.light;
    return {
      ...buttonConfig,
      colors: themeColors,
    };
  };

  // Get URL with environment-specific base
  const getApiUrl = (endpoint) => {
    const baseUrl = config.urls.api.baseUrl;
    const endpointUrl = config.urls.api[endpoint] || endpoint;
    return `${baseUrl}${endpointUrl}`;
  };

  // Get social sharing URL
  const getSocialUrl = (platform, pageUrl, videoUrl = "") => {
    const baseUrl = config.urls.social[platform];
    if (!baseUrl) return "";

    // Use videoUrl if provided, otherwise fallback to pageUrl
    const urlToShare = videoUrl || pageUrl;

    switch (platform) {
      case "whatsapp":
        return `${baseUrl}?text=${encodeURIComponent(urlToShare)}`;
      case "twitter":
        return `${baseUrl}&url=${encodeURIComponent(urlToShare)}`;
      case "facebook":
      case "linkedin":
        return `${baseUrl}${encodeURIComponent(urlToShare)}`;
      default:
        return baseUrl;
    }
  };

  // Check if feature is enabled
  const isFeatureEnabled = (featureKey) => {
    return getFeature(featureKey);
  };

  // Get themed colors
  const getColor = (colorKey) => {
    return config.colors[colorKey] || colorKey;
  };

  // Get UI configuration
  const getUIConfig = (key) => {
    return config.ui[key];
  };

  return {
    // Direct access to config
    config,

    // Button helpers
    getButtonLabel,
    getButtonConfig,

    // Message helpers
    getMessage,
    getSuccessMessage: (key) => getMessage("success", key),
    getErrorMessage: (key) => getMessage("error", key),
    getLoadingMessage: (key) => getMessage("loading", key),

    // URL helpers
    getUrl,
    getApiUrl,
    getSocialUrl,

    // Feature toggles
    isFeatureEnabled,

    // UI helpers
    getColor,
    getUIConfig,

    // Content access
    buttons: config.buttons,
    headers: config.headers,
    placeholders: config.placeholders,
    seo: config.seo,

    // Theme-aware properties
    isDarkMode,

    // Commonly used values
    maxItemsPerPage: config.ui.maxItemsPerPage,
    animationDuration: config.ui.animationDuration,
    snackbarDuration: config.ui.snackbarDuration,
  };
};

export default useContent;
