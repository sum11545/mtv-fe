// Central Content Configuration
// This file contains all configurable text, labels, URLs, and content used throughout the application

export const CONTENT_CONFIG = {
  // Button Labels
  buttons: {
    viewMore: "View More",
    send: "Send", 
    copy: "Copy",
    copied: "Copied!",
    share: "Share",
    close: "Close",
    cancel: "Cancel",
    confirm: "Confirm",
    submit: "Submit",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
  },

  // Page Titles and Headers
  headers: {
    home: "Money TV",
    sections: {
      trending: "Trending Now",
      latest: "Latest Videos",
      popular: "Most Popular",
      recommended: "Recommended for You",
    },
    navigation: {
      home: "Home",
      videos: "Videos",
      shorts: "Shorts",
      about: "About",
      contact: "Contact",
    }
  },

  // Messages and Notifications
  messages: {
    success: {
      linkCopied: "Link copied to clipboard",
      videoShared: "Video shared successfully",
      settingsSaved: "Settings saved successfully",
    },
    error: {
      genericError: "Something went wrong. Please try again.",
      networkError: "Network error. Please check your connection.",
      videoNotFound: "Video not found",
      invalidUrl: "Invalid URL provided",
    },
    loading: {
      loadingVideos: "Loading videos...",
      processing: "Processing...",
      pleaseWait: "Please wait...",
    }
  },

  // URLs and Links
  urls: {
    social: {
      whatsapp: "https://wa.me/",
      facebook: "https://facebook.com/share.php?u=",
      twitter: "https://twitter.com/intent/tweet?url=",
      linkedin: "https://linkedin.com/sharing/share-offsite/?url=",
      instagram: "https://instagram.com",
      // Footer social media URLs
      footerInstagram: "https://www.instagram.com/moneytvlive/",
      footerYoutube: "https://www.youtube.com/@moneytvlive",
      footerTwitter: "https://x.com/moneytvlive",
      footerLinkedin: "https://www.linkedin.com/company/moneytvlive/",
      footerFacebook: "https://www.facebook.com/@moneytvlive",
    },
    external: {
      youtube: "https://youtube.com",
      support: "mailto:support@moneytv.com",
      privacy: "/privacy-policy",
      terms: "/terms-of-use",
      help: "/help",
      // Footer contact
      contactEmail: "grow@moneytv.live",
    },
    api: {
      baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3700/api/v1",
      videos: "/api/videos",
      sections: "/api/sections",
      search: "/api/search",
    }
  },

  // Placeholder Texts
  placeholders: {
    search: "Search videos...",
    email: "Enter your email",
    name: "Enter your name",
    message: "Type your message here...",
    noResults: "No results found",
    noVideos: "No videos available",
    comingSoon: "Coming soon...",
  },

  // Form Labels
  forms: {
    labels: {
      email: "Email Address",
      password: "Password", 
      confirmPassword: "Confirm Password",
      firstName: "First Name",
      lastName: "Last Name",
      phoneNumber: "Phone Number",
      subject: "Subject",
      message: "Message",
      // Footer form labels
      name: "Name",
      feedbackEmail: "Email",
      feedbackMessage: "Message",
    },
    validation: {
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      passwordTooShort: "Password must be at least 8 characters",
      passwordMismatch: "Passwords do not match",
      invalidPhone: "Please enter a valid phone number",
      nameMinLength: "Name must be at least 2 characters",
      messageMinLength: "Message must be at least 10 characters",
    }
  },

  // SEO and Meta Content
  seo: {
    defaultTitle: "Money TV - Your Financial Video Hub",
    defaultDescription: "Watch the latest financial videos, market analysis, and investment insights on Money TV.",
    defaultKeywords: "finance, videos, market analysis, investment, money, financial education",
    ogImage: "/assets/images/og-image.jpg",
    twitterCard: "summary_large_image",
  },

  // Feature Toggles
  features: {
    enableSharing: true,
    enableCopyLink: true,
    enableWhatsAppSharing: true,
    enableComments: false,
    enableLikes: true,
    enableDownload: false,
    enableDarkMode: true,
    enableNotifications: true,
  },

  // UI Configuration
  ui: {
    maxItemsPerPage: 12,
    autoplayDelay: 3000,
    animationDuration: 300,
    debounceDelay: 500,
    snackbarDuration: 3000,
    tooltipDelay: 1000,
  },

  // Color Themes (can be overridden by theme system)
  colors: {
    primary: "#001691",
    secondary: "#F4A512", 
    success: "#4CAF50",
    error: "#F44336",
    warning: "#FF9800",
    info: "#2196F3",
  },

  // Action Button Configurations
  actionButtons: {
    whatsapp: {
      label: "Send",
      icon: "WHATSAPP",
      color: {
        light: { normal: "", hover: "#111" },
        dark: { normal: "", hover: "#fff" }
      }
    },
    copy: {
      label: "Copy", 
      labelSuccess: "Copied!",
      icon: "COPY",
      color: {
        light: { normal: "grey.500", hover: "#111" },
        dark: { normal: "", hover: "#fff" }
      }
    },
    share: {
      label: "Share",
      icon: "SHARE", 
      color: {
        light: { normal: "grey.500", hover: "#111" },
        dark: { normal: "", hover: "#fff" }
      }
    }
  },

  // Date and Time Formats
  dateFormats: {
    short: "MMM DD",
    long: "MMMM DD, YYYY",
    time: "HH:mm",
    dateTime: "MMMM DD, YYYY HH:mm",
    relative: true, // Show "2 hours ago" instead of exact time
  },

  // Content Types Configuration
  contentTypes: {
    video: {
      defaultThumbnail: "/images/default-video-thumbnail.jpg",
      aspectRatio: "16:9",
      autoplay: false,
    },
    short: {
      defaultThumbnail: "/images/default-short-thumbnail.jpg", 
      aspectRatio: "9:16",
      autoplay: true,
    },
    ad: {
      defaultThumbnail: "/images/default-ad-thumbnail.jpg",
      aspectRatio: "16:9", 
      autoplay: false,
    }
  },

  // Footer Content
  footer: {
    slogan: "Let's 'find true value here.'",
    feedbackTitle: "Send Feedback",
    sendMessage: "Send Message",
    links: {
      termsOfUse: "Terms of Use", 
      help: "Help",
      aboutUs: "About US",
      contactUs: "Contact Us",
      privacyPolicy: "Privacy Policy",
      termsCondition: "Terms And Conditions",
      mpu: "MPU - Market Pillars Uncovered",
      sib: "SIB - Seeing Is Believing",
      kyp: "KYP - Know Your Promoters",
      ray: "RAY - Result Analysis For You",
    },
    icons: {
      youtube: "YT",
      instagram: "INSTA", 
      twitter: "X",
      linkedin: "IN",
      facebook: "FB",
      feedback: "FEEDBACK",
    }
  },
};

// Environment-specific overrides
export const getContentConfig = () => {
  const env = process.env.NODE_ENV;
  
  if (env === 'development') {
    return {
      ...CONTENT_CONFIG,
      urls: {
        ...CONTENT_CONFIG.urls,
        api: {
          ...CONTENT_CONFIG.urls.api,
          baseUrl: "http://localhost:3001",
        }
      }
    };
  }
  
  if (env === 'staging') {
    return {
      ...CONTENT_CONFIG,
      urls: {
        ...CONTENT_CONFIG.urls,
        api: {
          ...CONTENT_CONFIG.urls.api,
          baseUrl: "https://staging-api.moneytv.com",
        }
      }
    };
  }
  
  return CONTENT_CONFIG;
};

// Helper functions for easy access
export const getButtonLabel = (buttonKey) => CONTENT_CONFIG.buttons[buttonKey] || buttonKey;
export const getMessage = (type, messageKey) => CONTENT_CONFIG.messages[type]?.[messageKey] || "";
export const getUrl = (category, urlKey) => CONTENT_CONFIG.urls[category]?.[urlKey] || "";
export const getFeature = (featureKey) => CONTENT_CONFIG.features[featureKey] || false;
export const getActionButton = (buttonKey) => CONTENT_CONFIG.actionButtons[buttonKey] || {};

export default CONTENT_CONFIG; 