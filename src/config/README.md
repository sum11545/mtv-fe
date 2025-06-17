# Centralized Content Configuration System

This system provides a centralized way to manage all text content, labels, URLs, feature toggles, and other configurable elements throughout the application.

## 📁 Files Structure

```
src/
├── config/
│   ├── content.js          # Main configuration file
│   └── README.md          # This documentation
├── hooks/
│   └── useContent.js      # React hook for easy access
```

## 🎯 Benefits

- **Centralized Management**: All content in one place
- **Easy Maintenance**: Change text without touching components
- **Feature Toggles**: Enable/disable features from config
- **Environment Support**: Different configs for dev/staging/prod
- **Theme Integration**: Automatic dark/light mode support
- **Localization Ready**: Easy to extend for multiple languages
- **Type Safety**: Structured configuration with helper functions

## 🚀 Quick Start

### 1. Using the Hook in Components

```javascript
import { useContent } from "@/hooks/useContent";

const MyComponent = () => {
  const { getButtonLabel, getButtonConfig, isFeatureEnabled, isDarkMode } =
    useContent();

  if (!isFeatureEnabled("enableSharing")) {
    return null; // Don't render if feature is disabled
  }

  return <button>{getButtonLabel("share")}</button>;
};
```

### 2. Accessing Configuration Directly

```javascript
import { CONTENT_CONFIG, getButtonLabel } from "@/config/content";

// Direct access
const label = CONTENT_CONFIG.buttons.viewMore;

// Using helper function
const label2 = getButtonLabel("viewMore");
```

## 📝 Configuration Sections

### Button Labels

```javascript
// Usage
const { getButtonLabel } = useContent();
const label = getButtonLabel("viewMore"); // Returns "View More"
```

### Messages & Notifications

```javascript
// Usage
const { getSuccessMessage, getErrorMessage } = useContent();
const message = getSuccessMessage("linkCopied"); // Returns "Link copied to clipboard"
```

### URLs & Links

```javascript
// Usage
const { getSocialUrl, getApiUrl } = useContent();
const whatsappUrl = getSocialUrl(
  "whatsapp",
  "https://example.com",
  "Check this out!"
);
const apiEndpoint = getApiUrl("videos");
```

### Feature Toggles

```javascript
// Usage
const { isFeatureEnabled } = useContent();

if (isFeatureEnabled("enableSharing")) {
  // Show sharing button
}
```

### Action Button Configuration

```javascript
// Usage
const { getButtonConfig } = useContent();
const shareConfig = getButtonConfig("share");

// Returns:
// {
//   label: "Share",
//   icon: "SHARE",
//   colors: { normal: "", hover: "#fff" } // Theme-aware
// }
```

## 🎨 Theme Integration

The system automatically detects dark/light mode and provides appropriate colors:

```javascript
const { isDarkMode, getButtonConfig } = useContent();
const config = getButtonConfig("whatsapp");

// config.colors will be either light or dark theme colors
const iconColor = isDarkMode ? config.colors.hover : config.colors.normal;
```

## 🌍 Environment Configuration

Different configurations for different environments:

```javascript
// Automatically applies based on NODE_ENV
const config = getContentConfig();

// Development: Uses localhost API
// Staging: Uses staging API
// Production: Uses production API
```

## 🔧 Extending the Configuration

### Adding New Button Labels

```javascript
// In src/config/content.js
export const CONTENT_CONFIG = {
  buttons: {
    // ... existing buttons
    newButton: "My New Button",
  },
};
```

### Adding New Feature Toggles

```javascript
// In src/config/content.js
export const CONTENT_CONFIG = {
  features: {
    // ... existing features
    enableNewFeature: true,
  },
};

// In component
const { isFeatureEnabled } = useContent();
if (isFeatureEnabled("enableNewFeature")) {
  // Show new feature
}
```

### Adding New URL Categories

```javascript
// In src/config/content.js
export const CONTENT_CONFIG = {
  urls: {
    // ... existing categories
    myService: {
      baseUrl: "https://myservice.com",
      endpoint1: "/api/data",
    },
  },
};

// In component
const { getUrl } = useContent();
const url = getUrl("myService", "endpoint1");
```

## 🎯 Best Practices

### 1. Always Use the Hook

```javascript
// ✅ Good
const { getButtonLabel } = useContent();
const label = getButtonLabel("submit");

// ❌ Avoid
const label = "Submit"; // Hardcoded
```

### 2. Use Feature Toggles

```javascript
// ✅ Good
if (isFeatureEnabled("enableComments")) {
  return <CommentSection />;
}

// ❌ Avoid
return <CommentSection />; // Always shown
```

### 3. Use Theme-Aware Colors

```javascript
// ✅ Good
const config = getButtonConfig("share");
const color = isDarkMode ? config.colors.hover : config.colors.normal;

// ❌ Avoid
const color = "#fff"; // Fixed color
```

### 4. Use Helper Functions

```javascript
// ✅ Good
const { getSocialUrl } = useContent();
const url = getSocialUrl("whatsapp", shareUrl, text);

// ❌ Avoid
const url = `https://wa.me/?text=${encodeURIComponent(text)}`; // Manual construction
```

## 🔄 Migration Guide

### Replacing Hardcoded Strings

```javascript
// Before
<button>View More</button>;

// After
const { getButtonLabel } = useContent();
<button>{getButtonLabel("viewMore")}</button>;
```

### Replacing Feature Checks

```javascript
// Before
const showSharing = true; // Hardcoded

// After
const { isFeatureEnabled } = useContent();
const showSharing = isFeatureEnabled("enableSharing");
```

### Replacing Color Values

```javascript
// Before
const color = isDarkMode ? "#fff" : "#000";

// After
const { getButtonConfig } = useContent();
const config = getButtonConfig("share");
const color = config.colors.normal;
```

## 🚨 Common Pitfalls

1. **Don't cache hook results**: The hook provides reactive values
2. **Use fallbacks**: Always provide defaults for dynamic content
3. **Test feature toggles**: Ensure components work when features are disabled
4. **Environment testing**: Test with different NODE_ENV values

## 📊 Performance Considerations

- The configuration is loaded once and cached
- Hook calls are lightweight and don't cause re-renders
- Feature toggles allow you to remove unused code paths
- Environment configuration reduces bundle size in production

This system provides a robust foundation for managing content that scales with your application while maintaining clean, maintainable code.
