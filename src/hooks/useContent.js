import { useTheme } from '@mui/material';
import { getContentConfig, getButtonLabel, getMessage, getUrl, getFeature, getActionButton } from '../config/content';

// Custom hook for centralized content management
export const useContent = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const config = getContentConfig();

  // Get button configuration with theme-aware colors
  const getButtonConfig = (buttonKey) => {
    const buttonConfig = getActionButton(buttonKey);
    if (!buttonConfig.color) return buttonConfig;

    const themeColors = isDarkMode ? buttonConfig.color.dark : buttonConfig.color.light;
    return {
      ...buttonConfig,
      colors: themeColors
    };
  };

  // Get URL with environment-specific base
  const getApiUrl = (endpoint) => {
    const baseUrl = config.urls.api.baseUrl;
    const endpointUrl = config.urls.api[endpoint] || endpoint;
    return `${baseUrl}${endpointUrl}`;
  };

  // Get social sharing URL
  const getSocialUrl = (platform, url, text = '') => {
    const baseUrl = config.urls.social[platform];
    if (!baseUrl) return '';
    
    switch (platform) {
      case 'whatsapp':
        return `${baseUrl}?text=${encodeURIComponent(`${text}\n${url}`)}`;
      case 'twitter':
        return `${baseUrl}&text=${encodeURIComponent(text)}`;
      case 'facebook':
      case 'linkedin':
        return `${baseUrl}${encodeURIComponent(url)}`;
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
    getSuccessMessage: (key) => getMessage('success', key),
    getErrorMessage: (key) => getMessage('error', key),
    getLoadingMessage: (key) => getMessage('loading', key),
    
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