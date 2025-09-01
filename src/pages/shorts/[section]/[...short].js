import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  Backdrop,
  CircularProgress,
  Snackbar,
  Dialog,
  DialogContent,
  Slide,
} from "@mui/material";
import {
  WhatsApp,
  Reply,
  ArrowUpward,
  ArrowDownward,
  ContentCopy,
  ArrowBack,
  Close,
  VolumeOff,
  VolumeUp,
} from "@mui/icons-material";
import { useMain } from "@/context/MainContext";
import CopyButton from "@/custom-components/CopyButton";
import ShareDialog from "@/custom-components/ShareDialog";
import { fontSize, fontStyles, palette } from "@/theme/theme";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import ShareIcon from "@/components/icons/ShareIcon";
import ShareShortMobileIcon from "@/components/icons/ShareShortMobileIcon";
import { ShortCopyMobileIcon } from "@/components/icons/ShortCopyMobileIcon";
import ShortWhatsAppMobileIcon from "@/components/icons/ShortWhatsAppMobileIcon";
import { DynamicIcon } from "@/components/icons";
import { useContent } from "@/hooks/useContent";
import SEO from "../../../components/SEO";
import DOMPurify from "dompurify";

// Slide transition for mobile popup
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ActionButton = ({
  icon,
  label,
  onClick,
  isReversed = false,
  onMouseEnter,
  onMouseLeave,
  textColor,
  hoverTextColor,
}) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0,
      borderRadius: 1,
      cursor: "pointer",
      padding: "4px 8px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        // backgroundColor: "rgba(0, 0, 0, 0.04)",
        "& .MuiTypography-root": {
          color: hoverTextColor || "grey.700",
        },
        "& .MuiSvgIcon-root": {
          color: "grey.700",
        },
      },
    }}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {isReversed ? (
      <>
        <Typography
          variant="sendCopyShareLabel"
          sx={{
            color: textColor || "grey.500",
            userSelect: "none",
            mr: 0.5,
            transition: "color 0.2s ease-in-out",
            ...fontStyles.sfPro.condensed.regular,
          }}
        >
          {label}
        </Typography>
        {React.cloneElement(icon, {
          sx: {
            ...icon.props.sx,
            color: "grey.500",
            transition: "color 0.2s ease-in-out",
          },
        })}
      </>
    ) : (
      <>
        {React.cloneElement(icon, {
          sx: {
            ...icon.props.sx,
            color: "grey.500",
            transition: "color 0.2s ease-in-out",
          },
        })}
        <Typography
          variant="sendCopyShareLabel"
          sx={{
            color: textColor || "grey.500",
            userSelect: "none",
            ml: 0.5,
            transition: "color 0.2s ease-in-out",
            ...fontStyles.sfPro.condensed.regular,
          }}
        >
          {label}
        </Typography>
      </>
    )}
  </Box>
);

// Mobile Action Button for overlay
const MobileActionButton = React.memo(
  ({ icon, onClick, label, isCopyButton = false }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const { getSuccessMessage, snackbarDuration } = useContent();

    const successMessage = getSuccessMessage("linkCopied");

    const handleClick = (e) => {
      e.stopPropagation(); // Prevent parent touch handlers from interfering
      onClick();

      // If it's a copy button, show success message
      if (isCopyButton) {
        setSnackbarOpen(true);
      }
    };

    const handleSnackbarClose = () => {
      setSnackbarOpen(false);
    };

    return (
      <>
        <Box
          onClick={handleClick}
          onTouchStart={(e) => {
            e.stopPropagation(); // Prevent parent touch handlers from interfering
            // handleClick(e);
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            cursor: "pointer",
            p: 0,
            pointerEvents: "auto", // Ensure touch events are captured
          }}
        >
          <IconButton
            sx={{
              color: "grey.500",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 1)",
                "& .MuiSvgIcon-root": {
                  color: "grey.700",
                },
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {React.cloneElement(icon, {
              sx: { fontSize: 36, transition: "color 0.2s ease-in-out" },
            })}
          </IconButton>
        </Box>

        {/* Success Snackbar for copy button */}
        {isCopyButton && (
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={snackbarDuration}
            onClose={handleSnackbarClose}
            message={successMessage}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          />
        )}
      </>
    );
  }
);

const getEmbedUrl = (url) => {
  if (!url) return "";

  // Detect if the device is iOS
  const isIOS =
    /(iPhone|iPad|iPod|Macintosh;.*OS X.*Version\/[\d.]+.*Safari)/i.test(
      navigator.userAgent
    );

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("watch?v=")[1];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
    } else if (url.includes("shorts/")) {
      videoId = url.split("shorts/")[1];
    }
    videoId = videoId.split(/[?&]/)[0];
    // Always mute for iOS, no mute for Android
    const muteParam = isIOS ? "&mute=1" : "";
    return `https://www.youtube.com/embed/${videoId}?autoplay=1${muteParam}&loop=1&playlist=${videoId}&controls=1&rel=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;
  }
  return url;
};

// Individual Short Item Component - Scrollable Version with File1 Layout
const ShortItem = React.memo(
  ({
    short,
    isActive,
    onShare,
    onWhatsApp,
    onCopy,
    isMobile,
    index,
    section,
    onOpenDescriptionPopup,
    isDescriptionPopupOpen,
    isMuted, // Receive from parent
    onMuteToggle, // Receive from parent
  }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
    const [isShareHovered, setIsShareHovered] = useState(false);
    const [isCopyHovered, setIsCopyHovered] = useState(false);

    // Ref for iframe to send postMessage
    const iframeRef = useRef(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    // Listen for messages from YouTube iframe
    useEffect(() => {
      const handleMessage = (event) => {
        // Only handle messages from YouTube
        if (event.origin !== "https://www.youtube.com") return;

        try {
          const data = JSON.parse(event.data);
          if (data.event === "onStateChange") {
            // YouTube player state changed
            console.log("YouTube player state:", data.info);
          }
        } catch (error) {
          // Ignore non-JSON messages
        }
      };

      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, []);

    // Reset iframeLoaded when video changes
    useEffect(() => {
      if (isActive) {
        setIframeLoaded(false);
      }
    }, [short?.content_details?.[0]?.url, isActive]);

    // Sync mute state with iframe when global state changes or video becomes active
    useEffect(() => {
      if (
        isActive &&
        iframeRef.current &&
        iframeRef.current.contentWindow &&
        iframeLoaded
      ) {
        // Try multiple times to ensure the command is applied
        const applyMuteState = () => {
          try {
            console.log("Syncing mute state:", isMuted ? "mute" : "unmute");
            iframeRef.current.contentWindow.postMessage(
              JSON.stringify({
                event: "command",
                func: isMuted ? "mute" : "unMute",
                args: [],
              }),
              "*"
            );
          } catch (error) {
            console.warn("Failed to sync mute state with iframe:", error);
          }
        };

        // Apply immediately
        applyMuteState();

        // Apply again after 500ms
        const timeoutId1 = setTimeout(applyMuteState, 500);

        // Apply again after 1 second
        const timeoutId2 = setTimeout(applyMuteState, 1000);

        // Apply again after 2 seconds
        const timeoutId3 = setTimeout(applyMuteState, 2000);

        return () => {
          clearTimeout(timeoutId1);
          clearTimeout(timeoutId2);
          clearTimeout(timeoutId3);
        };
      }
    }, [isMuted, isActive, iframeLoaded]);

    const { getButtonConfig, isFeatureEnabled, config } = useContent();
    const shareMessage = config.messages.shareMessage;

    // Memoize button configs to prevent re-computation
    const buttonConfigs = useMemo(
      () => ({
        whatsapp: getButtonConfig("whatsapp"),
        share: getButtonConfig("share"),
        copy: getButtonConfig("copy"),
      }),
      [getButtonConfig]
    );

    // Process description HTML
    const cleanHtml = useMemo(() => {
      if (!short?.content_details?.[0]?.description) return "";
      return DOMPurify.sanitize(short.content_details[0].description, {
        ALLOWED_TAGS: [
          "b",
          "i",
          "em",
          "strong",
          "a",
          "ul",
          "ol",
          "li",
          "p",
          "br",
        ],
        ALLOWED_ATTR: ["href", "target", "rel"],
        // Add default attributes for links
        ADD_ATTR: ["target", "rel"],
      });
    }, [short?.content_details?.[0]?.description]);

    // Memoize handlers to prevent re-creation on every render
    const handleShare = useCallback(() => onShare(short), [onShare, short]);
    const handleWhatsApp = useCallback(
      () => onWhatsApp(short),
      [onWhatsApp, short]
    );
    const handleCopy = useCallback(() => onCopy(short), [onCopy, short]);
    const handleOpenDescription = useCallback(() => {
      if (onOpenDescriptionPopup) {
        onOpenDescriptionPopup(short);
      }
    }, [onOpenDescriptionPopup, short]);

    // Mute toggle handler using YouTube postMessage API
    const handleMuteToggleWithPostMessage = useCallback(() => {
      console.log(
        "Mute toggle clicked, current state:",
        isMuted,
        "iframeLoaded:",
        iframeLoaded
      );

      if (iframeRef.current && iframeRef.current.contentWindow) {
        const iframe = iframeRef.current;
        const newMutedState = !isMuted;

        try {
          console.log(
            "Sending postMessage:",
            newMutedState ? "mute" : "unMute"
          );
          // Send postMessage to YouTube iframe to mute/unmute
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: "command",
              func: newMutedState ? "mute" : "unMute",
              args: [],
            }),
            "*"
          );
        } catch (error) {
          console.warn("Failed to send mute command to iframe:", error);
        }
      } else {
        console.warn("Iframe not ready for postMessage");
      }

      // Call parent's mute toggle handler to update global state
      onMuteToggle();
    }, [isMuted, onMuteToggle, iframeLoaded]);

    if (isMobile) {
      return (
        <Box
          sx={{
            height: "100vh",
            width: "100vw",
            position: "relative",
            bgcolor: "black",
            overflow: "hidden",
            scrollSnapAlign: "start",
            scrollSnapStop: "always",
          }}
        >
          {/* Video Container - Mobile with File1 styling */}
          <Box
            sx={{
              width: "100vw",
              height: isDescriptionPopupOpen ? "60vh" : "100vh", // Shrink video when popup is open
              position: "relative",
              bgcolor: "black",
              overflow: "hidden",
              mx: "auto", // Center horizontally
              transition: "height 0.3s ease-in-out", // Smooth transition
            }}
          >
            {/* ADD THIS NEW SECTION HERE - "Shorts" text - Top Left */}
            <Box
              sx={{
                position: "absolute",
                top: 60, // Increased from 20 to prevent cropping
                left: 20,
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                gap: 1,
                pointerEvents: "none",
                mt: 3,
              }}
            >
              <Typography
                component={"h2"}
                sx={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                  ...fontStyles.openSans.bold,
                  userSelect: "none",
                }}
              >
                {section}
              </Typography>
            </Box>

            {/* Video - Only render if active to save resources */}
            {isActive && (
              <Box
                sx={{
                  width: "100vw",
                  height: isDescriptionPopupOpen ? "60vh" : "100vh", // Shrink video when popup is open
                  position: "absolute",
                  top: isDescriptionPopupOpen ? 60 : 15,
                  left: 0,
                  bgcolor: "black",
                  pointerEvents: "none", // Prevent iframe from capturing touch events
                  transition: "height 0.3s ease-in-out", // Smooth transition
                  zIndex: 1, // Lower z-index to ensure overlays are above
                }}
              >
                <iframe
                  ref={iframeRef}
                  key={`mobile-${short.id}-${index}`}
                  src={getEmbedUrl(short?.content_details[0]?.url)}
                  title={short?.content_details[0]?.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  playsInline
                  onLoad={() => setIframeLoaded(true)}
                  style={{
                    width: "100vw",
                    height: isDescriptionPopupOpen ? "60vh" : "100vh", // Shrink video when popup is open
                    border: 0,
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "auto", // Re-enable pointer events on the iframe itself
                    transition: "height 0.3s ease-in-out", // Smooth transition
                  }}
                />
              </Box>
            )}

            {/* Mute/Unmute Button - Top Right (Always Visible on Mobile) */}
            <Box
              sx={{
                position: "absolute",
                top: 80,
                right: 20,
                zIndex: 1000,
                pointerEvents: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={handleMuteToggleWithPostMessage}
                sx={{
                  color: "#fff",
                  width: 44,
                  height: 44,
                  "&:hover": {
                    opacity: 0.8,
                  },
                  "&:active": {
                    transform: "scale(0.95)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                {isMuted ? (
                  <VolumeOff sx={{ fontSize: 30 }} />
                ) : (
                  <VolumeUp sx={{ fontSize: 30 }} />
                )}
              </IconButton>
            </Box>

            {/* Video Name Overlay - Bottom Center (File1 style) - Now Clickable */}
            {!isDescriptionPopupOpen && (
              <Box
                className="video-name-overlay"
                sx={{
                  position: "absolute",
                  bottom: isDescriptionPopupOpen ? "6vh" : "11vh", // Adjust position when popup is open
                  zIndex: 10, // Increased z-index to ensure it's above iframe
                  maxWidth: "100%%", // Increased for better text display
                  textAlign: "center",
                  pointerEvents: "auto", // Changed to auto to make clickable
                  px: 1.5, // Add horizontal padding
                  py: 1.5, // Add vertical padding for better touch target
                  width: "100%",
                  mx: "auto",
                  cursor: "pointer", // Add cursor pointer
                  transition: "bottom 0.3s ease-in-out", // Smooth transition
                  // Add touch-action to prevent conflicts
                  touchAction: "manipulation",
                  //  // Fallback for older browsers
                  //  "@media (max-width: 480px)": {
                  //   bottom: "70px",
                  // },
                  // "@media (min-width: 481px) and (max-width: 768px)": {
                  //   bottom: "80px",
                  // },
                  // "@media (min-width: 769px) and (max-width: 1024px)": {
                  //   bottom: "90px",
                  // },
                }}
                onClick={handleOpenDescription}
                onTouchEnd={(e) => {
                  // Prevent touch events from bubbling up to parent
                  e.stopPropagation();
                }}
                onTouchStart={(e) => {
                  // Prevent touch events from bubbling up to parent
                  e.stopPropagation();
                }}
              >
                <Typography
                  component="h1"
                  variant="h6"
                  sx={{
                    color: "white",
                    ...fontStyles.openSans.bold,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                    lineHeight: 1.3,
                    typography: "shortTitleOfShortDetailPage",
                    textAlign: "center",
                    display: "-webkit-box",
                    WebkitLineClamp: 2, // Limit to 3 lines
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    cursor: "pointer", // Add cursor pointer
                    pointerEvents: "auto", // Ensure pointer events work
                    userSelect: "none", // Prevent text selection
                    "&:hover": {
                      opacity: 0.8, // Add hover effect
                    },
                    "&:active": {
                      opacity: 0.6, // Add active state
                    },
                  }}
                >
                  {short?.content_details[0]?.name}
                </Typography>
              </Box>
            )}

            {/* Action Buttons - Bottom Right (File1 style) */}
            {!isDescriptionPopupOpen && (
              <Box
                className="action-button-container" // Add class for touch event filtering
                sx={{
                  position: "absolute",
                  bottom: "15vh", // Adjust position when popup is open
                  right: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  zIndex: 10,
                  pointerEvents: "auto", // Ensure buttons are clickable on mobile
                  // // Fallback for older browsers
                  // "@media (max-width: 480px)": {
                  //   bottom: "110px",
                  // },
                  // "@media (min-width: 481px) and (max-width: 768px)": {
                  //   bottom: "120px",
                  // },
                  // "@media (min-width: 769px) and (max-width: 1024px)": {
                  //   bottom: "130px",
                  // },
                }}
              >
                {isFeatureEnabled("enableWhatsAppSharing") && (
                  <MobileActionButton
                    icon={<ShortWhatsAppMobileIcon />}
                    onClick={handleWhatsApp}
                    label="WhatsApp"
                  />
                )}
                {isFeatureEnabled("enableCopyLink") && (
                  <MobileActionButton
                    icon={<ShortCopyMobileIcon />}
                    onClick={handleCopy}
                    label="Copy"
                    isCopyButton={true}
                  />
                )}
                {isFeatureEnabled("enableSharing") && (
                  <MobileActionButton
                    icon={<ShareShortMobileIcon />}
                    onClick={handleShare}
                    label="Share"
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      );
    }

    const router = useRouter();

    const handleCompressClick = () => {
      router.back();
    };

    // Desktop Layout - Using File1 Grid Layout with scrollable capability
    return (
      <Grid
        container
        sx={{
          height: "100vh",
          alignItems: "flex-start",
          scrollSnapAlign: "start",
          maxWidth: "100vw",
          overflow: "hidden",
          pt: { xs: 0, md: 1 },
        }}
      >
        {/* Left Empty Space */}
        <Grid item xs={12} md={4} />

        {/* Center: Video - File1 dimensions */}
        <Grid
          item
          xs={12}
          md={3.5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            // pt: { xs: 0, md: 2 },
          }}
        >
          <Box
            sx={{
              aspectRatio: "9/16", // Force 9:16 aspect ratio
              height: "100%",
              width: "100%",
              bgcolor: "black",
              overflow: "hidden",
              borderRadius: 2,
              // mx: "auto",
              ml: "auto",
              // height: "642px",
              width: "361px",
            }}
          >
            {isActive && (
              <iframe
                ref={iframeRef}
                key={`desktop-${short.id}-${index}`}
                src={getEmbedUrl(short?.content_details[0]?.url)} // should be an "embed" URL
                title={short?.content_details[0]?.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                playsInline
                onLoad={() => setIframeLoaded(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            )}
          </Box>
        </Grid>

        {/* Right: Info and Navigation - File1 Layout */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            // pt: { xs: 2, md: 4 },
            pb: { md: 30 },
            height: "100%",
            pr: { md: 8, lg: 10 },
          }}
        >
          {/* Top: Video name and actions */}
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <DynamicIcon
                keyword="COMPRESS"
                height="20px"
                width="20px"
                onClick={handleCompressClick}
                style={{ cursor: "pointer", color: isDarkMode ? "#fff" : "" }}
              />
            </Box>
            <Typography
              component="h1"
              variant="h6"
              sx={{
                ...fontStyles.openSans.bold,
                mb: 2,
                typography: "shortTitleOfShortDetailPage",
                textAlign: "left",
                pl: 3.5,
                mt: 2,
              }}
            >
              {short?.content_details[0]?.name}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                px: 2.5,
              }}
            >
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    ...fontStyles.sfPro.condensed.regular,
                  }}
                >
                  {isFeatureEnabled("enableWhatsAppSharing") && (
                    <ActionButton
                      icon={
                        <DynamicIcon
                          style={{
                            color: isDarkMode
                              ? isWhatsAppHovered
                                ? buttonConfigs.whatsapp.colors?.hover
                                : buttonConfigs.whatsapp.colors?.normal
                              : isWhatsAppHovered
                              ? "#111"
                              : "",
                          }}
                          height={"15px"}
                          width={"15px"}
                          keyword={buttonConfigs.whatsapp.icon}
                        />
                      }
                      label={buttonConfigs.whatsapp.label}
                      onClick={handleWhatsApp}
                      onMouseEnter={() => setIsWhatsAppHovered(true)}
                      onMouseLeave={() => setIsWhatsAppHovered(false)}
                      textColor={
                        isDarkMode
                          ? buttonConfigs.whatsapp.colors?.normal
                          : "grey.500"
                      }
                      hoverTextColor={
                        isDarkMode
                          ? buttonConfigs.whatsapp.colors?.hover
                          : "#111"
                      }
                    />
                  )}

                  {isFeatureEnabled("enableCopyLink") && (
                    <CopyButton
                      color={isCopyHovered ? "#fff" : ""}
                      text={`${shareMessage} ${short?.content_details[0]?.url}`}
                      label={buttonConfigs.copy.label}
                      onMouseEnter={() => setIsCopyHovered(true)}
                      onMouseLeave={() => setIsCopyHovered(false)}
                      textColor={
                        isDarkMode
                          ? buttonConfigs.copy.colors?.normal
                          : "grey.500"
                      }
                      hoverTextColor={
                        isDarkMode ? buttonConfigs.copy.colors?.hover : "#111"
                      }
                      iconColor={
                        isDarkMode
                          ? isCopyHovered
                            ? buttonConfigs.copy.colors?.hover
                            : buttonConfigs.copy.colors?.normal
                          : isCopyHovered
                          ? "#111"
                          : ""
                      }
                    />
                  )}
                </Box>
              </Box>

              {isFeatureEnabled("enableSharing") && (
                <Box sx={{ flexShrink: 0 }}>
                  <ActionButton
                    icon={
                      <DynamicIcon
                        style={{
                          color: isDarkMode
                            ? isShareHovered
                              ? buttonConfigs.share.colors?.hover
                              : buttonConfigs.share.colors?.normal
                            : isShareHovered
                            ? "#111"
                            : "",
                        }}
                        height={"15px"}
                        width={"15px"}
                        keyword={buttonConfigs.share.icon}
                      />
                    }
                    label={buttonConfigs.share.label}
                    onClick={handleShare}
                    onMouseEnter={() => setIsShareHovered(true)}
                    onMouseLeave={() => setIsShareHovered(false)}
                    textColor={
                      isDarkMode
                        ? buttonConfigs.share.colors?.normal
                        : "grey.500"
                    }
                    hoverTextColor={
                      isDarkMode ? buttonConfigs.share.colors?.hover : "#111"
                    }
                    isReversed={true}
                  />
                </Box>
              )}
            </Box>

            {/* Description Section - Desktop */}
            {short?.content_details?.[0]?.description && (
              <Box
                sx={{
                  pl: 3.5,
                  pr: 1,
                  mt: 2.5,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    maxHeight: "65vh", // Limit height to prevent overflow
                    overflowY: "auto", // Make scrollable when content is too long
                    pr: 1,
                    "&::-webkit-scrollbar": {
                      width: "0px",
                      height: "0px",
                    },
                  }}
                >
                  <Typography
                    variant="shortDescriptionOfShortDetailPage"
                    sx={{
                      whiteSpace: "pre-wrap",
                      fontStyle: fontStyles.openSans.regular,
                      color: theme.palette.background.shortDetailDescription,
                      // Add styles for clickable links/hashtags
                      "& a": {
                        color: isDarkMode ? "#fff" : "#1976d2",
                        textDecoration: "underline",
                        cursor: "pointer",
                        transition: "color 0.2s ease-in-out",
                        "&:hover": {
                          color: isDarkMode ? "#fff" : "#1565C0",
                          textDecoration: "underline",
                        },
                        "&:active": {
                          color: isDarkMode ? "#fff" : "#0D47A1",
                        },
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: cleanHtml }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    );
  },

  // Below code is for the issue because short was showing blank screen and only audio was playing
  // when you switch from dark to light mode while video was playing
  // Custom comparison function to prevent re-rendering when only theme changes
  (prevProps, nextProps) => {
    // Only re-render if props that affect the iframe content change
    return (
      prevProps.short?.id === nextProps.short?.id &&
      prevProps.short?.content_details?.[0]?.url ===
        nextProps.short?.content_details?.[0]?.url &&
      prevProps.isActive === nextProps.isActive &&
      prevProps.isMobile === nextProps.isMobile &&
      prevProps.index === nextProps.index &&
      prevProps.section === nextProps.section &&
      prevProps.onOpenDescriptionPopup === nextProps.onOpenDescriptionPopup &&
      prevProps.isDescriptionPopupOpen === nextProps.isDescriptionPopupOpen &&
      prevProps.isMuted === nextProps.isMuted &&
      prevProps.onMuteToggle === nextProps.onMuteToggle &&
      prevProps.onShare === nextProps.onShare &&
      prevProps.onWhatsApp === nextProps.onWhatsApp &&
      prevProps.onCopy === nextProps.onCopy
    );
  }
);

const Short = () => {
  const router = useRouter();
  const { short, section } = router.query;
  const { fetchShortDetailPageData, loading } = useMain();

  // State management
  const [allShorts, setAllShorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [selectedShort, setSelectedShort] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [descriptionPopupOpen, setDescriptionPopupOpen] = useState(false);
  const [selectedShortForPopup, setSelectedShortForPopup] = useState(null);

  // Global mute state - shared across all videos
  const isIOS =
    /(iPhone|iPad|iPod|Macintosh;.*OS X.*Version\/[\d.]+.*Safari)/i.test(
      navigator.userAgent
    );
  const [isMuted, setIsMuted] = useState(isIOS); // Always muted for iOS, unmuted for Android

  // Refs
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const lastFetchedShort = useRef(null);

  // Responsive
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery("(max-width:899px)");

  const { getSocialUrl, getButtonConfig, isFeatureEnabled, config } =
    useContent();
  const shareMessage = config.messages.shareMessage;

  // Handle opening description popup for mobile
  const handleOpenDescriptionPopup = useCallback((shortItem) => {
    setSelectedShortForPopup(shortItem);
    setDescriptionPopupOpen(true);
  }, []);

  // Handle closing description popup
  const handleCloseDescriptionPopup = useCallback(() => {
    setDescriptionPopupOpen(false);
    setSelectedShortForPopup(null);
  }, []);

  // Process description HTML for mobile popup
  const mobilePopupCleanHtml = useMemo(() => {
    if (!selectedShortForPopup?.content_details?.[0]?.description) return "";
    return DOMPurify.sanitize(
      selectedShortForPopup.content_details[0].description,
      {
        ALLOWED_TAGS: [
          "b",
          "i",
          "em",
          "strong",
          "a",
          "ul",
          "ol",
          "li",
          "p",
          "br",
        ],
        ALLOWED_ATTR: ["href", "target", "rel"],
        // Add default attributes for links
        ADD_ATTR: ["target", "rel"],
      }
    );
  }, [selectedShortForPopup?.content_details?.[0]?.description]);

  // Generate SEO data for short video page
  const getSEOData = () => {
    if (!selectedShort) return {};

    const shortTitle = `${selectedShort.content_details[0]?.name} - MoneyTV`;
    const shortDescription = selectedShort.description
      ? selectedShort.description.replace(/<[^>]*>/g, "") // Remove HTML tags
      : `Watch ${shortTitle} - a short financial video on Money TV. Get quick market insights and investment tips.`;

    return {
      title: `${shortTitle}`,
      description:
        shortDescription.length > 160
          ? shortDescription.substring(0, 157) + "..."
          : shortDescription,
      keywords: `${shortTitle}, Financial education, investing, personal finance, wealth creation, money management, stock market India, mutual funds India, financial literacy, business news India, entrepreneurship, live shows, podcasts, webinars, financial advice India`,
      videoData: {
        title: shortTitle,
        description: shortDescription,
        thumbnail: selectedShort.content_details?.[0]?.thumbnail_url,
        video_url: selectedShort.content_details?.[0]?.url,
      },
    };
  };

  const seoData = getSEOData();

  // Memoize action handlers to prevent re-creation
  const handleShare = useCallback((shortItem) => {
    setSelectedShort(shortItem);
    setShareDialogOpen(true);
  }, []);

  const handleWhatsApp = useCallback(
    (shortItem) => {
      const shareUrl = getSocialUrl(
        "whatsapp",
        window.location.href,
        `${shareMessage}${shortItem.content_details[0].url}`
      );
      window.open(shareUrl, "_blank");
    },
    [getSocialUrl]
  );

  const handleCopy = useCallback((shortItem) => {
    navigator.clipboard
      .writeText(`${shareMessage} ${shortItem?.content_details[0]?.url}`)
      .then(() => console.log("URL copied to clipboard"))
      .catch((err) => console.error("Failed to copy URL: ", err));
  }, []);

  // Global mute toggle handler - shared across all videos
  const handleMuteToggle = useCallback(() => {
    // Allow toggle on both iOS and Android
    setIsMuted((prev) => !prev);
  }, []);

  // Load data - Prevent infinite API calls
  useEffect(() => {
    if (!short || !section) {
      return;
    }

    // Reset data loaded state on new short
    if (lastFetchedShort.current !== short) {
      setDataLoaded(false);
      setAllShorts([]);
      setCurrentIndex(0);
    }

    // Don't fetch if we already have data for this short
    if (lastFetchedShort.current === short && dataLoaded) {
      return;
    }

    const loadData = async () => {
      try {
        lastFetchedShort.current = short;
        console.log("Fetching data for short:", short);

        // here 'short.length - 1' is short id as the last item from query params short
        const res = await fetchShortDetailPageData(
          section,
          short[short.length - 1]
        );

        let shortsArray = [];
        if (
          res?.data?.response?.contents &&
          Array.isArray(res.data.response.contents)
        ) {
          shortsArray = res.data.response.contents;
        } else if (res?.data?.response) {
          shortsArray = [res.data.response];
        }

        console.log("Loaded shorts array:", shortsArray.length, "items");

        setAllShorts(shortsArray);
        setDataLoaded(true);

        // Find initial index
        const requestedIndex = shortsArray.findIndex((s) => s.id === short);
        const initialIndex = requestedIndex >= 0 ? requestedIndex : 0;
        setCurrentIndex(initialIndex);

        console.log("Initial index set to:", initialIndex);

        // Scroll to initial position after data loads
        setTimeout(() => {
          if (containerRef.current) {
            const scrollTop = initialIndex * window.innerHeight;
            console.log("Scrolling to initial position:", scrollTop);
            containerRef.current.scrollTo({
              top: scrollTop,
              behavior: "auto",
            });
          }
        }, 100);

        if (requestedIndex !== -1) {
          setSelectedShort(shortsArray[requestedIndex]);
        } else {
          setSelectedShort(shortsArray[0]);
        }
      } catch (err) {
        console.error("Error fetching shorts data:", err);
        lastFetchedShort.current = null;
        setDataLoaded(false);
      }
    };

    loadData();
  }, [short]);

  // Update selectedShort when currentIndex changes
  useEffect(() => {
    if (
      allShorts.length > 0 &&
      currentIndex >= 0 &&
      currentIndex < allShorts.length
    ) {
      setSelectedShort(allShorts[currentIndex]);

      // On iOS, reset to muted state when switching videos for autoplay compatibility
      if (isIOS) {
        setIsMuted(true);
      }
    }
  }, [currentIndex, allShorts, isIOS]);

  // Set share URL only once
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  // Reset state when component unmounts or route changes
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      setAllShorts([]);
      setCurrentIndex(0);
      setDataLoaded(false);
      lastFetchedShort.current = null;
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Navigation function with File1 Previous/Next logic
  const navigateToShort = useCallback(
    (index) => {
      console.log(
        "navigateToShort called with index:",
        index,
        "allShorts.length:",
        allShorts.length
      );

      if (index < 0 || index >= allShorts.length || !containerRef.current) {
        console.log("Navigation blocked - invalid index or no container");
        return;
      }

      console.log("Starting navigation to index:", index);

      // Update current index immediately
      setCurrentIndex(index);

      isScrollingRef.current = true;
      const scrollTop = index * window.innerHeight;
      console.log("Scrolling to:", scrollTop);

      containerRef.current.scrollTo({
        top: scrollTop,
        behavior: "smooth",
      });

      // Update URL without triggering data refetch
      const newShort = allShorts[index];
      if (newShort && newShort.id !== short) {
        // if we get guest name or organization name then adding that in the url else not.
        const OrgGuest = (newShort?.org_guest_url || "").replace(
          /^\/|\/$/g,
          ""
        );
        const fullPath = `/shorts/${section}${OrgGuest ? `/${OrgGuest}` : ""}/${
          newShort.id
        }`;

        window.history.replaceState(null, "", fullPath);
      }

      setTimeout(() => {
        isScrollingRef.current = false;
        console.log("Navigation completed, isScrolling set to false");
      }, 500);
    },
    [allShorts, short]
  );

  // File1 Previous/Next handlers
  const handlePrevious = useCallback(() => {
    console.log(
      "Previous clicked, currentIndex:",
      currentIndex,
      "allShorts.length:",
      allShorts.length
    );
    if (currentIndex > 0 && allShorts.length > 0) {
      const newIndex = currentIndex - 1;
      console.log("Navigating to index:", newIndex);
      navigateToShort(newIndex);
    }
  }, [currentIndex, allShorts.length, navigateToShort]);

  const handleNext = useCallback(() => {
    console.log(
      "Next clicked, currentIndex:",
      currentIndex,
      "allShorts.length:",
      allShorts.length
    );
    if (currentIndex < allShorts.length - 1 && allShorts.length > 0) {
      const newIndex = currentIndex + 1;
      console.log("Navigating to index:", newIndex);
      navigateToShort(newIndex);
    }
  }, [currentIndex, allShorts.length, navigateToShort]);

  // Scroll handler with debounce
  const handleScroll = useCallback(() => {
    if (
      !containerRef.current ||
      isScrollingRef.current ||
      allShorts.length === 0
    )
      return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const viewportHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / viewportHeight);

    // Only update if the index actually changed and is valid
    if (
      newIndex !== currentIndex &&
      newIndex >= 0 &&
      newIndex < allShorts.length
    ) {
      setCurrentIndex(newIndex);

      const newShort = allShorts[newIndex];
      if (newShort && newShort.id !== short) {
        // if we get guest name or organization name then adding that in the url else not.
        const OrgGuest = (newShort?.org_guest_url || "").replace(
          /^\/|\/$/g,
          ""
        );
        const fullPath = `/shorts/${section}${OrgGuest ? `/${OrgGuest}` : ""}/${
          newShort.id
        }`;

        window.history.replaceState(null, "", fullPath);
      }
    }

    // Debounced scroll correction for manual scrolling
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      // Only correct scroll if not currently navigating via buttons
      if (!isScrollingRef.current) {
        const targetScrollTop = newIndex * viewportHeight;
        if (Math.abs(scrollTop - targetScrollTop) > 10) {
          isScrollingRef.current = true;
          container.scrollTo({
            top: targetScrollTop,
            behavior: "smooth",
          });

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 300);
        }
      }
    }, 150);
  }, [currentIndex, allShorts, short]);

  // Attach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Touch gesture handling
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = useCallback((e) => {
    const target = e.target;
    // Check if the touch is on an action button or video name overlay
    if (
      target.closest(".action-button-container") ||
      target.closest(".MuiIconButton-root") ||
      target.closest(".video-name-overlay")
    ) {
      return; // Allow default behavior for buttons and video name
    }
    e.preventDefault();
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    const target = e.target;
    if (
      target.closest(".action-button-container") ||
      target.closest(".MuiIconButton-root") ||
      target.closest(".video-name-overlay")
    ) {
      return; // Allow default behavior for buttons and video name
    }
    e.preventDefault();
    touchEndY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      const target = e.target;
      if (
        target.closest(".action-button-container") ||
        target.closest(".MuiIconButton-root") ||
        target.closest(".video-name-overlay")
      ) {
        return; // Allow default behavior for buttons and video name
      }
      e.preventDefault();

      if (!touchStartY.current || !touchEndY.current) return;

      const distance = touchStartY.current - touchEndY.current;
      const isSwipeUp = distance > 50;
      const isSwipeDown = distance < -50;

      if (isSwipeUp && currentIndex < allShorts.length - 1) {
        handleNext();
      } else if (isSwipeDown && currentIndex > 0) {
        handlePrevious();
      }

      touchStartY.current = 0;
      touchEndY.current = 0;
    },
    [currentIndex, allShorts.length, handleNext, handlePrevious]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  // Calculate disabled states for File1 navigation buttons
  const isPreviousDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === allShorts.length - 1;

  // Show loading state
  if (loading || !dataLoaded || allShorts.length === 0) {
    console.log("Showing loading state:", {
      loading,
      dataLoaded,
      allShortsLength: allShorts.length,
    });
    return (
      <Box
        sx={{
          height: isMobile ? "100vh" : "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Backdrop
          sx={{ background: "transparent", zIndex: 100, height: "100vh" }}
          open={loading}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <CircularProgress />
            {/* <Typography variant="body2" color="text.secondary">
              Loading short videos...
            </Typography> */}
          </Box>
        </Backdrop>
      </Box>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <>
        <SEO
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords}
          videoData={seoData.videoData}
          type="video"
        />
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
          {/* Main Container - Scrollable */}
          <Box
            ref={containerRef}
            sx={{
              flex: 1,
              height: "100vh",
              overflowY: "auto",
              overflowX: "hidden",
              scrollSnapType: "y mandatory",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {allShorts.map((shortItem, index) => (
              <ShortItem
                key={shortItem.id}
                short={shortItem}
                index={index}
                isActive={index === currentIndex}
                onShare={handleShare}
                onWhatsApp={handleWhatsApp}
                onCopy={handleCopy}
                isMobile={isMobile}
                section={section}
                onOpenDescriptionPopup={handleOpenDescriptionPopup}
                isDescriptionPopupOpen={descriptionPopupOpen}
                isMuted={isMuted}
                onMuteToggle={handleMuteToggle}
              />
            ))}
          </Box>

          {/* Mobile Description Popup */}
          <Dialog
            open={descriptionPopupOpen}
            onClose={handleCloseDescriptionPopup}
            TransitionComponent={Transition}
            fullScreen
            sx={{
              "& .MuiDialog-paper": {
                margin: 0,
                maxHeight: "348px", // height based on design
                // minHeight: "35vh",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                p: 2,
              },
            }}
          >
            <DialogContent
              sx={{
                p: 0,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {/* Short Title */}
                <Typography
                  component="h1"
                  variant="h6"
                  sx={{
                    color: isDarkMode ? "#fff" : "#000",
                    ...fontStyles.openSans.bold,
                    mb: 2,
                    lineHeight: 1.3,
                    typography: "shortTitleOfShortDetailPage",
                    width: "85%",
                  }}
                >
                  {selectedShortForPopup?.content_details[0]?.name}
                </Typography>

                {/* Close Icon */}
                <IconButton
                  onClick={handleCloseDescriptionPopup}
                  sx={{
                    color: isDarkMode ? "white" : "#000",
                    padding: 0,
                  }}
                >
                  <Close sx={{ fontSize: 25 }} />
                </IconButton>
              </Box>
              <Divider />

              {/* Content */}
              <Box
                sx={{
                  pt: 2,
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {/* Description */}
                {mobilePopupCleanHtml ? (
                  <Typography
                    variant="shortDescriptionOfShortDetailPage"
                    sx={{
                      whiteSpace: "pre-wrap",
                      fontStyle: fontStyles.openSans.regular,
                      color: theme.palette.background.shortDetailDescription,
                      // Add styles for clickable links/hashtags
                      "& a": {
                        color: isDarkMode ? "#fff" : "#1976d2",
                        textDecoration: "underline",
                        cursor: "pointer",
                        transition: "color 0.2s ease-in-out",
                        "&:hover": {
                          color: isDarkMode ? "#fff" : "#1565C0",
                          textDecoration: "underline",
                        },
                        "&:active": {
                          color: isDarkMode ? "#fff" : "#0D47A1",
                        },
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: mobilePopupCleanHtml }}
                  />
                ) : (
                  <Typography
                    variant="shortDescriptionOfShortDetailPage"
                    sx={{
                      whiteSpace: "pre-wrap",
                      fontStyle: fontStyles.openSans.regular,
                      color: theme.palette.background.shortDetailDescription,
                    }}
                  >
                    No description available for this short.
                  </Typography>
                )}
              </Box>
            </DialogContent>
          </Dialog>

          <ShareDialog
            open={shareDialogOpen}
            onClose={() => setShareDialogOpen(false)}
            url={shareUrl}
            title={selectedShort?.content_details[0]?.name}
            videoUrl={selectedShort?.content_details[0]?.url}
          />
        </Box>
      </>
    );
  }

  // Desktop Layout - Scrollable with File1 Navigation Buttons
  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        videoData={seoData.videoData}
        type="video"
      />

      {/* Main Container - Scrollable */}
      <Box
        ref={containerRef}
        sx={{
          height: "90vh",
          width: "100vw",
          overflowY: "auto",
          overflowX: "hidden",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          position: "relative",
        }}
      >
        {allShorts.map((shortItem, index) => (
          <ShortItem
            key={shortItem.id}
            short={shortItem}
            index={index}
            isActive={index === currentIndex}
            onShare={handleShare}
            onWhatsApp={handleWhatsApp}
            onCopy={handleCopy}
            isMobile={isMobile}
            onOpenDescriptionPopup={handleOpenDescriptionPopup}
            isDescriptionPopupOpen={descriptionPopupOpen}
            isMuted={isMuted}
            onMuteToggle={handleMuteToggle}
          />
        ))}
      </Box>

      {/* File1 Navigation Buttons - Fixed Position */}
      <Box
        sx={{
          position: "fixed",
          right: { md: 40, lg: 60 },
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1000,
          // bgcolor: "rgba(255, 255, 255, 0.1)",
          bgcolor: "transparent",
          // backdropFilter: "blur(8px)",
          borderRadius: 2,
          p: 2,
          m: 2,
        }}
      >
        <Typography
          variant="previousNextOfShortDetailPage"
          sx={{
            color: isDarkMode ? "grey.300" : "grey.600",
            mb: 1,
            fontWeight: 500,
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          Previous
        </Typography>
        <IconButton
          color="inherit"
          size="medium"
          onClick={handlePrevious}
          disabled={isPreviousDisabled}
          sx={{
            "&:hover": {
              bgcolor: isPreviousDisabled
                ? "transparent"
                : isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.04)",
            },
            opacity: isPreviousDisabled ? 0.3 : 1,
            cursor: isPreviousDisabled ? "not-allowed" : "pointer",
            mb: 1,
          }}
        >
          <DynamicIcon
            keyword={"arrow-up"}
            style={{
              color: isDarkMode ? palette?.dark?.primary?.main : "",
              fontSize: "20px",
            }}
          />
        </IconButton>
        <IconButton
          color="inherit"
          size="medium"
          onClick={handleNext}
          disabled={isNextDisabled}
          sx={{
            "&:hover": {
              bgcolor: isNextDisabled
                ? "transparent"
                : isDarkMode
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.04)",
            },
            opacity: isNextDisabled ? 0.3 : 1,
            cursor: isNextDisabled ? "not-allowed" : "pointer",
            mb: 1,
          }}
        >
          <DynamicIcon
            keyword={"arrow-down"}
            style={{
              color: isDarkMode ? palette?.dark?.primary?.main : "",
              fontSize: "20px",
            }}
          />
        </IconButton>
        <Typography
          variant="previousNextOfShortDetailPage"
          sx={{
            color: isDarkMode ? "grey.300" : "grey.600",
            fontWeight: 500,
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          Next
        </Typography>
      </Box>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareUrl}
        title={selectedShort?.content_details[0]?.name}
        videoUrl={selectedShort?.content_details[0]?.url}
      />
    </>
  );
};

export default Short;
