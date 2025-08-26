import { useState, useEffect } from "react";

const DynamicIcon = ({
  iconName,
  keyword,
  width = "24px",
  height = "24px",
  style = {},
  alt = "Icon",
  ...props
}) => {
  const [iconSrc, setIconSrc] = useState(null);

  // Icon name mapping based on keyword
  const iconMapping = {
    TV: "eye-icon",
    MU: "market-pillar",
    TI: "star-icon",
    T10P: "analytics-icon",
    PIE: "pie",
    LN: "profile-icon",
    SETTINGS: "gear-icon",
    YOUTUBE: "youtube-icon",
    MOON: "moon-star",
    INSTA: "insta-icon",
    X: "x-icon",
    YT: "yt-icon",
    IN: "linkedin-icon",
    FB: "facebook-icon",
    FEEDBACK: "feedback-icon",
    ARROW: "arrow-icon",
    "ARROW-LEFT": "arrow-left",
    "ARROW-LEFT_YELLOW": "arrow-left-yellow",
    "ARROW-YELLOW": "arrow-yellow",
    "ARROW-LEFT_BLUE": "arrow-left-blue",
    "ARROW-LEFT_WHITE": "arrow-left-white",
    WHATSAPP: "whats-app-icon",
    COPY: "copy-icon",
    SHARE: "share-icon",
    "ARROW-UP": "arrow-up",
    "ARROW-DOWN": "arrow-down",
    SIB: "eye-icon",
    MPU: "market-pillar",
    CAM: "star-icon",
    RAY: "analytics-icon",
    KYP: "profile-icon",
    EXPAND: "expand",
    COMPRESS: "compress",
  };

  useEffect(() => {
    // Determine the icon file name
    let fileName = iconName;

    // If iconName is not provided, use keyword mapping
    if (!fileName && keyword) {
      fileName = iconMapping[keyword.toUpperCase()] || iconMapping["TV"];
    }

    // If still no fileName, use default
    if (!fileName) {
      fileName = "market-pillar";
    }

    // Ensure .svg extension
    if (!fileName.endsWith(".svg")) {
      fileName += ".svg";
    }

    setIconSrc(`/assets/icons/${fileName}`);
  }, [iconName, keyword]);

  // Function to convert hex color to filter
  const getColorFilter = (color) => {
    if (!color) return "none";

    switch (color.toLowerCase()) {
      case "#fff":
      case "#ffffff":
      case "white":
        return "brightness(0) saturate(100%) invert(100%)";
      case "#000":
      case "#000000":
      case "black":
        return "brightness(0) saturate(100%) invert(0%)";
      case "yellow":
        return "brightness(0) saturate(100%) invert(85%) sepia(100%) saturate(500%) hue-rotate(0deg)";
      case "#f4a512":
        // 'brightness(0) saturate(100%) invert(65%) sepia(95%) saturate(800%) hue-rotate(10deg) brightness(0.9) contrast(110%)';
        return "brightness(0) saturate(100%) invert(75%) sepia(100%) saturate(1000%) hue-rotate(15deg) brightness(1.2)";
      default:
        return "brightness(0) saturate(100%) invert(0%)"; // fallback to black
    }
  };

  if (!iconSrc) {
    return null;
  }

  return (
    <img
      src={iconSrc}
      alt={alt}
      style={{
        width,
        height,
        filter: getColorFilter(style?.color),
        ...style,
      }}
      {...props}
    />
  );
};

export default DynamicIcon;
