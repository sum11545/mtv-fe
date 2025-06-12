import { useState, useEffect } from 'react';

const DynamicIcon = ({ 
  iconName, 
  keyword, 
  width = '24px', 
  height = '24px', 
  style = {}, 
  alt = 'Icon',
  ...props 
}) => {
  const [iconSrc, setIconSrc] = useState(null);

  // Icon name mapping based on keyword
  const iconMapping = {
    'TV': 'eye-icon',
    'MU': 'market-pillar',
    'TI': 'star-icon',
    'T10P': 'analytics-icon',
    'LN': 'profile-icon',
    'SETTINGS': 'gear-icon',
    'YOUTUBE': 'youtube-icon',
    'MOON': 'moon-star',
    'INSTA': 'insta-icon',
    'X': 'x-icon',
    'YT': 'yt-icon',
    'IN':'linkedin-icon',
    'FB':'facebook-icon',
    'FEEDBACK':'feedback-icon',
  };

  useEffect(() => {
    // Determine the icon file name
    let fileName = iconName;
    
    // If iconName is not provided, use keyword mapping
    if (!fileName && keyword) {
      fileName = iconMapping[keyword.toUpperCase()] || iconMapping['TV'];
    }
    
    // If still no fileName, use default
    if (!fileName) {
      fileName = 'market-pillar';
    }
    
    // Ensure .svg extension
    if (!fileName.endsWith('.svg')) {
      fileName += '.svg';
    }
    
    setIconSrc(`/assets/icons/${fileName}`);
  }, [iconName, keyword]);

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
        filter: style?.color ? `brightness(0) saturate(100%) invert(${style.color === '#fff' || style.color === '#ffffff' ? '100%' : '0%'})` : 'none',
        ...style
      }}
      {...props}
    />
  );
};

export default DynamicIcon; 