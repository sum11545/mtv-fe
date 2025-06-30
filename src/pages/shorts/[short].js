import React, { useEffect, useState, useRef } from "react";
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
} from "@mui/material";
import {
  WhatsApp,
  Reply,
  ArrowUpward,
  ArrowDownward,
  ContentCopy,
  ArrowBack,
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
          variant="caption"
          sx={{
            color: textColor || "grey.500",
            fontSize: fontSize.typography.caption,
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
          variant="caption"
          sx={{
            color: textColor || "grey.500",
            fontSize: fontSize.typography.caption,
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
const MobileActionButton = ({ icon, onClick, label }) => (
  <Box
    onClick={onClick}
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 0.5,
      cursor: "pointer",
      p: 0,
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
    {/* <Typography
      variant="caption"
      sx={{
        color: "white",
        fontSize: "0.7rem",
        textAlign: "center",
      }}
    >
      {label}
    </Typography> */}
  </Box>
);

const getEmbedUrl = (url) => {
  if (!url) return "";
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
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  }
  return url;
};

const Short = () => {
  const router = useRouter();
  const { short } = router.query;
  const { fetchShortDetailPageData, loading } = useMain();
  const [allShorts, setAllShorts] = useState([]);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  const [isShareHovered, setIsShareHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);

  // Responsive breakpoint
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery("(max-width:899px)"); // Simplified breakpoint to ensure all mobile devices are covered

  const { getButtonConfig, getSocialUrl, getSuccessMessage, isFeatureEnabled } =
    useContent();

  // Get button configurations
  const whatsappConfig = getButtonConfig("whatsapp");
  const shareConfig = getButtonConfig("share");
  const copyConfig = getButtonConfig("copy");

  // Touch gesture handling for mobile
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);
  const containerRef = useRef(null);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (short) {
      const loadData = async () => {
        try {
          const res = await fetchShortDetailPageData(short);
          console.log(res.data.response);

          // Get original shorts from backend
          let shortsArray = [];
          if (
            res?.data?.response?.contents &&
            Array.isArray(res.data.response.contents)
          ) {
            shortsArray = res.data.response.contents;
          } else if (res?.data?.response) {
            // If response is a single short object, wrap it in array
            shortsArray = [res.data.response];
          }

          setAllShorts(shortsArray);

          // Find the index of the requested short
          const requestedIndex = shortsArray.findIndex((s) => s.id === short);
          setCurrentShortIndex(requestedIndex >= 0 ? requestedIndex : 0);
        } catch (err) {
          console.error("Error fetching home data:", err);
        }
      };
      loadData();
    }
  }, [router.query]);

  const currentShort = allShorts[currentShortIndex];

  const handleShare = () => setShareDialogOpen(true);

  const handleWhatsApp = () => {
    if (currentShort) {
      const shareUrl = getSocialUrl(
        "whatsapp",
        window.location.href,
        currentShort.content_details[0].url
      );
      window.open(shareUrl, "_blank");
    }
  };

  const handleCopyToClipboard = () => {
    if (currentShort) {
      navigator.clipboard
        .writeText(currentShort?.content_details[0]?.url)
        .then(() => console.log("URL copied to clipboard"))
        .catch((err) => console.error("Failed to copy URL: ", err));
    }
  };

  const handlePrevious = () => {
    if (currentShortIndex > 0) {
      setCurrentShortIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentShortIndex < allShorts.length - 1) {
      setCurrentShortIndex((prev) => prev + 1);
    }
  };

  // Touch gesture handlers for mobile
  const handleTouchStart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!touchStartY.current || !touchEndY.current) return;

    const distance = touchStartY.current - touchEndY.current;
    const isSwipeUp = distance > 50; // Swipe up
    const isSwipeDown = distance < -50; // Swipe down

    if (isSwipeUp && currentShortIndex < allShorts.length - 1) {
      handleNext();
    }

    if (isSwipeDown && currentShortIndex > 0) {
      handlePrevious();
    }

    // Reset touch points
    touchStartY.current = 0;
    touchEndY.current = 0;
  };

  const isPreviousDisabled = currentShortIndex === 0;
  const isNextDisabled = currentShortIndex === allShorts.length - 1;

  if (!currentShort) {
    return (
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Typography>Loading...</Typography> */}
        <Backdrop
          sx={{ background: "transparent", zIndex: 100, height: "100vh" }}
          open={loading}
        >
          <CircularProgress />
        </Backdrop>
      </Box>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        {/* <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 10, // Increase z-index to ensure it's visible
            position: "relative", // Ensure proper positioning
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={() => router.back()}
              sx={{
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" sx={{ ...fontStyles.openSans.bold }}>
              Shorts
            </Typography>
          </Box>
        </Box> */}

        {/* Video Container */}
        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            position: "relative",
            bgcolor: "black",
            overflow: "hidden",
          }}
        >
          {/* Video */}
          {currentShort && (
            <iframe
              key={currentShort.id}
              src={getEmbedUrl(currentShort?.content_details[0]?.url)}
              title={currentShort?.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{
                width: "100%",
                height: "100%",
                border: 0,
                pointerEvents: "none", // Disable iframe interaction
              }}
            />
          )}

          {/* Transparent Touch Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 3,
              backgroundColor: "transparent",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          {/* Video Name Overlay - Bottom Center */}
          <Box
            sx={{
              position: "absolute",
              bottom: 40,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 4,
              maxWidth: "60%",
              textAlign: "center",
              pointerEvents: "none", // Allow touch events to pass through
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",
                ...fontStyles.openSans.bold,
                fontSize: fontSize.typography.h6,
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                lineHeight: 1.3,
              }}
            >
              {currentShort?.name}
            </Typography>
          </Box>

          {/* Action Buttons - Bottom Right */}
          <Box
            sx={{
              position: "absolute",
              bottom: 100,
              right: 20,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              zIndex: 5, // Higher z-index for buttons to remain clickable
            }}
          >
            <MobileActionButton
              icon={<ShortWhatsAppMobileIcon />}
              onClick={handleWhatsApp}
              label="Whats App"
            />
            <MobileActionButton
              icon={<ShortCopyMobileIcon />}
              onClick={handleCopyToClipboard}
              label="Copy"
            />
            <MobileActionButton
              icon={<ShareShortMobileIcon />}
              onClick={handleShare}
              label="Share"
            />
          </Box>
        </Box>

        <ShareDialog
          open={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          url={shareUrl}
          title={currentShort?.name}
          videoUrl={currentShort?.content_details[0]?.url}
        />
      </Box>
    );
  }

  // Desktop Layout (Current Grid Layout without prev/next icons)
  return (
    <>
      <Grid
        container
        sx={{
          alignItems: "center",
        }}
      >
        {/* Left Empty Space */}
        <Grid item xs={12} md={5} />

        {/* Center: Video */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "100vw", md: 606 },
              height: { xs: "calc(100vh - 120px)", md: "calc(100vh - 120px)" },
              bgcolor: "black",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
          >
            {currentShort && (
              <iframe
                key={currentShort.id}
                src={getEmbedUrl(currentShort?.content_details[0]?.url)}
                title={currentShort?.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            )}
          </Box>
        </Grid>

        {/* Right: Info and Navigation */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            pt: { xs: 2, md: 4 },
            pb: { md: 30 },
            height: "80vh",
          }}
        >
          {/* Top: Video name and actions */}
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h6"
              sx={{
                ...fontStyles.openSans.bold,
                mb: 2,
                textAlign: "left",
                pl: 3,
              }}
            >
              {currentShort?.name}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: 2,
                  mb: 1,
                  pl: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {isFeatureEnabled("enableWhatsAppSharing") && (
                    <ActionButton
                      icon={
                        <DynamicIcon
                          style={{
                            color: isDarkMode
                              ? isWhatsAppHovered
                                ? whatsappConfig.colors?.hover
                                : whatsappConfig.colors?.normal
                              : isWhatsAppHovered
                              ? "#111"
                              : "",
                          }}
                          height={"15px"}
                          width={"15px"}
                          keyword={whatsappConfig.icon}
                        />
                      }
                      label={whatsappConfig.label}
                      onClick={handleWhatsApp}
                      onMouseEnter={() => setIsWhatsAppHovered(true)}
                      onMouseLeave={() => setIsWhatsAppHovered(false)}
                      textColor={
                        isDarkMode ? whatsappConfig.colors?.normal : "grey.500"
                      }
                      hoverTextColor={
                        isDarkMode ? whatsappConfig.colors?.hover : "#111"
                      }
                    />
                  )}

                  {isFeatureEnabled("enableCopyLink") && (
                    <CopyButton
                      color={isCopyHovered ? "#fff" : ""}
                      text={currentShort?.content_details[0]?.url}
                      label={copyConfig.label}
                      onMouseEnter={() => setIsCopyHovered(true)}
                      onMouseLeave={() => setIsCopyHovered(false)}
                      textColor={
                        isDarkMode ? copyConfig.colors?.normal : "grey.500"
                      }
                      hoverTextColor={
                        isDarkMode ? copyConfig.colors?.hover : "#111"
                      }
                      iconColor={
                        isDarkMode
                          ? isCopyHovered
                            ? copyConfig.colors?.hover
                            : copyConfig.colors?.normal
                          : isCopyHovered
                          ? "#111"
                          : ""
                      }
                    />
                  )}
                </Box>
                {isFeatureEnabled("enableSharing") && (
                  <ActionButton
                    icon={
                      <DynamicIcon
                        style={{
                          color: isDarkMode
                            ? isShareHovered
                              ? shareConfig.colors?.hover
                              : shareConfig.colors?.normal
                            : isShareHovered
                            ? "#111"
                            : "",
                        }}
                        height={"15px"}
                        width={"15px"}
                        keyword={shareConfig.icon}
                      />
                    }
                    label={shareConfig.label}
                    onClick={handleShare}
                    onMouseEnter={() => setIsShareHovered(true)}
                    onMouseLeave={() => setIsShareHovered(false)}
                    textColor={
                      isDarkMode ? shareConfig.colors?.normal : "grey.500"
                    }
                    hoverTextColor={
                      isDarkMode ? shareConfig.colors?.hover : "#111"
                    }
                    isReversed={true}
                  />
                )}
              </Box>
            </Box>
          </Box>

          {/* Center: Navigation - Desktop Only */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "flex-end",
              mr: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: "grey.500",
                mb: 0.5,
                fontSize: fontSize.button.small,
                letterSpacing: 0.5,
              }}
            >
              Previous
            </Typography>
            <IconButton
              color="inherit"
              size="small"
              onClick={handlePrevious}
              disabled={isPreviousDisabled}
              sx={{
                "&:hover": {
                  bgcolor: isPreviousDisabled
                    ? "transparent"
                    : "rgba(0, 0, 0, 0.04)",
                },
                opacity: isPreviousDisabled ? 0.3 : 1,
                cursor: isPreviousDisabled ? "not-allowed" : "pointer",
              }}
            >
              {/* <ArrowUpward fontSize="large" /> */}
              <DynamicIcon
                keyword={"arrow-up"}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              onClick={handleNext}
              disabled={isNextDisabled}
              sx={{
                "&:hover": {
                  bgcolor: isNextDisabled
                    ? "transparent"
                    : "rgba(0, 0, 0, 0.04)",
                },
                opacity: isNextDisabled ? 0.3 : 1,
                cursor: isNextDisabled ? "not-allowed" : "pointer",
                mt: 2,
              }}
            >
              {/* <ArrowDownward fontSize="large" /> */}
              <DynamicIcon
                keyword={"arrow-down"}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <Typography
              variant="caption"
              sx={{
                color: "grey.500",
                mt: 0.5,
                fontSize: fontSize.button.small,
                letterSpacing: 0.5,
              }}
            >
              Next
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareUrl}
        title={currentShort?.name}
        videoUrl={currentShort?.content_details[0]?.url}
      />
    </>
  );
};

export default Short;

// import React, {
//   useEffect,
//   useState,
//   useRef,
//   useCallback,
//   useMemo,
// } from "react";
// import { useRouter } from "next/router";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Backdrop,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { ArrowBack } from "@mui/icons-material";
// import { useMain } from "@/context/MainContext";
// import CopyButton from "@/custom-components/CopyButton";
// import ShareDialog from "@/custom-components/ShareDialog";
// import { fontSize, fontStyles, palette } from "@/theme/theme";
// import { ShortCopyMobileIcon } from "@/components/icons/ShortCopyMobileIcon";
// import ShortWhatsAppMobileIcon from "@/components/icons/ShortWhatsAppMobileIcon";
// import ShareShortMobileIcon from "@/components/icons/ShareShortMobileIcon";
// import { DynamicIcon } from "@/components/icons";
// import { useContent } from "@/hooks/useContent";

// const ActionButton = React.memo(
//   ({
//     icon,
//     label,
//     onClick,
//     isReversed = false,
//     onMouseEnter,
//     onMouseLeave,
//     textColor,
//     hoverTextColor,
//   }) => (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 0,
//         borderRadius: 1,
//         cursor: "pointer",
//         padding: "4px 8px",
//         transition: "all 0.2s ease-in-out",
//         "&:hover": {
//           "& .MuiTypography-root": {
//             color: hoverTextColor || "grey.700",
//           },
//           "& .MuiSvgIcon-root": {
//             color: "grey.700",
//           },
//         },
//       }}
//       onClick={onClick}
//       onMouseEnter={onMouseEnter}
//       onMouseLeave={onMouseLeave}
//     >
//       {isReversed ? (
//         <>
//           <Typography
//             variant="caption"
//             sx={{
//               color: textColor || "grey.500",
//               fontSize: fontSize.typography.caption,
//               userSelect: "none",
//               mr: 0.5,
//               transition: "color 0.2s ease-in-out",
//               ...fontStyles.sfPro.condensed.regular,
//             }}
//           >
//             {label}
//           </Typography>
//           {React.cloneElement(icon, {
//             sx: {
//               ...icon.props.sx,
//               color: "grey.500",
//               transition: "color 0.2s ease-in-out",
//             },
//           })}
//         </>
//       ) : (
//         <>
//           {React.cloneElement(icon, {
//             sx: {
//               ...icon.props.sx,
//               color: "grey.500",
//               transition: "color 0.2s ease-in-out",
//             },
//           })}
//           <Typography
//             variant="caption"
//             sx={{
//               color: textColor || "grey.500",
//               fontSize: fontSize.typography.caption,
//               userSelect: "none",
//               ml: 0.5,
//               transition: "color 0.2s ease-in-out",
//               ...fontStyles.sfPro.condensed.regular,
//             }}
//           >
//             {label}
//           </Typography>
//         </>
//       )}
//     </Box>
//   )
// );

// const MobileActionButton = React.memo(({ icon, onClick, label }) => (
//   <Box
//     onClick={onClick}
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: 0.5,
//       cursor: "pointer",
//       p: 0,
//     }}
//   >
//     <IconButton
//       sx={{
//         color: "grey.500",
//         "&:hover": {
//           bgcolor: "rgba(255, 255, 255, 0.1)",
//           "& .MuiSvgIcon-root": {
//             color: "grey.700",
//           },
//         },
//         transition: "all 0.2s ease-in-out",
//       }}
//     >
//       {React.cloneElement(icon, {
//         sx: { fontSize: 36, transition: "color 0.2s ease-in-out" },
//       })}
//     </IconButton>
//   </Box>
// ));

// const getEmbedUrl = (url) => {
//   if (!url) return "";
//   if (url.includes("youtube.com") || url.includes("youtu.be")) {
//     let videoId = "";
//     if (url.includes("youtube.com/watch?v=")) {
//       videoId = url.split("watch?v=")[1];
//     } else if (url.includes("youtu.be/")) {
//       videoId = url.split("youtu.be/")[1];
//     } else if (url.includes("shorts/")) {
//       videoId = url.split("shorts/")[1];
//     }
//     videoId = videoId.split(/[?&]/)[0];
//     return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
//   }
//   return url;
// };

// // Individual Short Item Component - Memoized to prevent unnecessary re-renders
// const ShortItem = React.memo(
//   ({ short, isActive, onShare, onWhatsApp, onCopy, isMobile, index }) => {
//     const theme = useTheme();
//     const isDarkMode = theme.palette.mode === "dark";
//     const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
//     const [isShareHovered, setIsShareHovered] = useState(false);
//     const [isCopyHovered, setIsCopyHovered] = useState(false);

//     const { getButtonConfig, isFeatureEnabled } = useContent();

//     // Memoize button configs to prevent re-computation
//     const buttonConfigs = useMemo(
//       () => ({
//         whatsapp: getButtonConfig("whatsapp"),
//         share: getButtonConfig("share"),
//         copy: getButtonConfig("copy"),
//       }),
//       [getButtonConfig]
//     );

//     // Memoize handlers to prevent re-creation on every render
//     const handleShare = useCallback(() => onShare(short), [onShare, short]);
//     const handleWhatsApp = useCallback(
//       () => onWhatsApp(short),
//       [onWhatsApp, short]
//     );
//     const handleCopy = useCallback(() => onCopy(short), [onCopy, short]);

//     if (isMobile) {
//       return (
//         <Box
//           sx={{
//             height: "100vh",
//             width: "100vw",
//             position: "relative",
//             bgcolor: "black",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             scrollSnapAlign: "start",
//           }}
//         >
//           {/* Video - Only render if active to save resources */}
//           {isActive && (
//             <iframe
//               key={`mobile-${short.id}`} // Stable key
//               src={getEmbedUrl(short?.content_details[0]?.url)}
//               title={short?.name}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 border: 0,
//                 objectFit: "cover",
//               }}
//             />
//           )}

//           {/* Video Title Overlay */}
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 120,
//               left: 20,
//               right: 80,
//               zIndex: 4,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "white",
//                 ...fontStyles.openSans.bold,
//                 fontSize: fontSize.typography.h6,
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
//                 lineHeight: 1.3,
//               }}
//             >
//               {short?.name}
//             </Typography>
//           </Box>

//           {/* Action Buttons */}
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 100,
//               right: 20,
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               zIndex: 5,
//             }}
//           >
//             {isFeatureEnabled("enableWhatsAppSharing") && (
//               <MobileActionButton
//                 icon={<ShortWhatsAppMobileIcon />}
//                 onClick={handleWhatsApp}
//                 label="WhatsApp"
//               />
//             )}
//             {isFeatureEnabled("enableCopyLink") && (
//               <MobileActionButton
//                 icon={<ShortCopyMobileIcon />}
//                 onClick={handleCopy}
//                 label="Copy"
//               />
//             )}
//             {isFeatureEnabled("enableSharing") && (
//               <MobileActionButton
//                 icon={<ShareShortMobileIcon />}
//                 onClick={handleShare}
//                 label="Share"
//               />
//             )}
//           </Box>
//         </Box>
//       );
//     }

//     // Desktop version
//     return (
//       <Box
//         sx={{
//           height: "100vh",
//           width: "100vw",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           position: "relative",
//           scrollSnapAlign: "start",
//           bgcolor: isDarkMode ? "grey.900" : "grey.50",
//         }}
//       >
//         {/* Video Container */}
//         <Box
//           sx={{
//             width: { xs: "100%", md: "400px", lg: "500px" },
//             height: { xs: "100%", md: "80vh" },
//             bgcolor: "black",
//             borderRadius: { xs: 0, md: 2 },
//             overflow: "hidden",
//             position: "relative",
//           }}
//         >
//           {isActive && (
//             <iframe
//               key={`desktop-${short.id}`} // Stable key
//               src={getEmbedUrl(short?.content_details[0]?.url)}
//               title={short?.name}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               allowFullScreen
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 border: 0,
//               }}
//             />
//           )}

//           {/* Desktop Overlay Controls */}
//           <Box
//             sx={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
//               p: 3,
//               zIndex: 4,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 color: "white",
//                 ...fontStyles.openSans.bold,
//                 mb: 2,
//               }}
//             >
//               {short?.name}
//             </Typography>

//             <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//               {isFeatureEnabled("enableWhatsAppSharing") && (
//                 <ActionButton
//                   icon={
//                     <DynamicIcon
//                       style={{
//                         color: isWhatsAppHovered
//                           ? buttonConfigs.whatsapp.colors?.hover
//                           : "white",
//                       }}
//                       height="15px"
//                       width="15px"
//                       keyword={buttonConfigs.whatsapp.icon}
//                     />
//                   }
//                   label={buttonConfigs.whatsapp.label}
//                   onClick={handleWhatsApp}
//                   onMouseEnter={() => setIsWhatsAppHovered(true)}
//                   onMouseLeave={() => setIsWhatsAppHovered(false)}
//                   textColor="white"
//                   hoverTextColor={buttonConfigs.whatsapp.colors?.hover}
//                 />
//               )}

//               {isFeatureEnabled("enableCopyLink") && (
//                 <CopyButton
//                   text={short?.content_details[0]?.url}
//                   label={buttonConfigs.copy.label}
//                   onMouseEnter={() => setIsCopyHovered(true)}
//                   onMouseLeave={() => setIsCopyHovered(false)}
//                   textColor="white"
//                   hoverTextColor={buttonConfigs.copy.colors?.hover}
//                   iconColor={
//                     isCopyHovered ? buttonConfigs.copy.colors?.hover : "white"
//                   }
//                 />
//               )}

//               {isFeatureEnabled("enableSharing") && (
//                 <ActionButton
//                   icon={
//                     <DynamicIcon
//                       style={{
//                         color: isShareHovered
//                           ? buttonConfigs.share.colors?.hover
//                           : "white",
//                       }}
//                       height="15px"
//                       width="15px"
//                       keyword={buttonConfigs.share.icon}
//                     />
//                   }
//                   label={buttonConfigs.share.label}
//                   onClick={handleShare}
//                   onMouseEnter={() => setIsShareHovered(true)}
//                   onMouseLeave={() => setIsShareHovered(false)}
//                   textColor="white"
//                   hoverTextColor={buttonConfigs.share.colors?.hover}
//                   isReversed={true}
//                 />
//               )}
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     );
//   }
// );

// const Short = () => {
//   const router = useRouter();
//   const { short } = router.query;
//   const { fetchShortDetailPageData, loading } = useMain();

//   // State management
//   const [allShorts, setAllShorts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [shareDialogOpen, setShareDialogOpen] = useState(false);
//   const [shareUrl, setShareUrl] = useState("");
//   const [selectedShort, setSelectedShort] = useState(null);
//   const [dataLoaded, setDataLoaded] = useState(false);

//   // Refs
//   const containerRef = useRef(null);
//   const scrollTimeoutRef = useRef(null);
//   const isScrollingRef = useRef(false);
//   const lastFetchedShort = useRef(null);

//   // Responsive
//   const theme = useTheme();
//   const isMobile = useMediaQuery("(max-width:899px)");

//   const { getSocialUrl } = useContent();

//   // Memoize action handlers to prevent re-creation
//   const handleShare = useCallback((shortItem) => {
//     setSelectedShort(shortItem);
//     setShareDialogOpen(true);
//   }, []);

//   const handleWhatsApp = useCallback(
//     (shortItem) => {
//       const shareUrl = getSocialUrl(
//         "whatsapp",
//         window.location.href,
//         shortItem.content_details[0].url
//       );
//       window.open(shareUrl, "_blank");
//     },
//     [getSocialUrl]
//   );

//   const handleCopy = useCallback((shortItem) => {
//     navigator.clipboard
//       .writeText(shortItem?.content_details[0]?.url)
//       .then(() => console.log("URL copied to clipboard"))
//       .catch((err) => console.error("Failed to copy URL: ", err));
//   }, []);

//   // Load data - CRITICAL FIX: Prevent infinite API calls
//   useEffect(() => {
//     // Don't fetch if we already have data for this short, or if we're currently loading
//     if (!short || loading || lastFetchedShort.current === short || dataLoaded) {
//       return;
//     }

//     const loadData = async () => {
//       try {
//         lastFetchedShort.current = short; // Mark as fetching
//         console.log("Fetching data for short:", short);

//         const res = await fetchShortDetailPageData(short);

//         let shortsArray = [];
//         if (
//           res?.data?.response?.contents &&
//           Array.isArray(res.data.response.contents)
//         ) {
//           shortsArray = res.data.response.contents;
//         } else if (res?.data?.response) {
//           shortsArray = [res.data.response];
//         }

//         setAllShorts(shortsArray);
//         setDataLoaded(true);

//         // Find initial index
//         const requestedIndex = shortsArray.findIndex((s) => s.id === short);
//         const initialIndex = requestedIndex >= 0 ? requestedIndex : 0;
//         setCurrentIndex(initialIndex);

//         // Scroll to initial position after data loads
//         setTimeout(() => {
//           if (containerRef.current) {
//             containerRef.current.scrollTo({
//               top: initialIndex * window.innerHeight,
//               behavior: "auto", // Use 'auto' for initial load to prevent flicker
//             });
//           }
//         }, 100);
//       } catch (err) {
//         console.error("Error fetching shorts data:", err);
//         lastFetchedShort.current = null; // Reset on error to allow retry
//       }
//     };

//     loadData();
//   }, [short]); // Only depend on short ID

//   // Set share URL only once
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setShareUrl(window.location.href);
//     }
//   }, []);

//   // Navigation function
//   const navigateToShort = useCallback(
//     (index) => {
//       if (index < 0 || index >= allShorts.length || !containerRef.current)
//         return;

//       isScrollingRef.current = true;
//       containerRef.current.scrollTo({
//         top: index * window.innerHeight,
//         behavior: "smooth",
//       });

//       // Update URL without triggering data refetch
//       const newShort = allShorts[index];
//       if (newShort && newShort.id !== short) {
//         window.history.replaceState(null, "", `/shorts/${newShort.id}`);
//       }

//       setTimeout(() => {
//         isScrollingRef.current = false;
//       }, 500);
//     },
//     [allShorts, short]
//   );

//   // Scroll handler with debounce - FIXED to prevent infinite loops
//   const handleScroll = useCallback(() => {
//     if (
//       !containerRef.current ||
//       isScrollingRef.current ||
//       allShorts.length === 0
//     )
//       return;

//     const container = containerRef.current;
//     const scrollTop = container.scrollTop;
//     const viewportHeight = window.innerHeight;
//     const newIndex = Math.round(scrollTop / viewportHeight);

//     // Only update if index actually changed and is valid
//     if (
//       newIndex !== currentIndex &&
//       newIndex >= 0 &&
//       newIndex < allShorts.length
//     ) {
//       setCurrentIndex(newIndex);

//       // Update URL without page reload - but don't trigger data fetch
//       const newShort = allShorts[newIndex];
//       if (newShort && newShort.id !== short) {
//         window.history.replaceState(null, "", `/shorts/${newShort.id}`);
//       }
//     }

//     // Clear existing timeout
//     if (scrollTimeoutRef.current) {
//       clearTimeout(scrollTimeoutRef.current);
//     }

//     // Set new timeout for snapping
//     scrollTimeoutRef.current = setTimeout(() => {
//       const targetScrollTop = newIndex * viewportHeight;
//       if (Math.abs(scrollTop - targetScrollTop) > 10) {
//         isScrollingRef.current = true;
//         container.scrollTo({
//           top: targetScrollTop,
//           behavior: "smooth",
//         });

//         setTimeout(() => {
//           isScrollingRef.current = false;
//         }, 300);
//       }
//     }, 100);
//   }, [currentIndex, allShorts, short]);

//   // Attach scroll listener
//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     container.addEventListener("scroll", handleScroll, { passive: true });
//     return () => {
//       container.removeEventListener("scroll", handleScroll);
//       if (scrollTimeoutRef.current) {
//         clearTimeout(scrollTimeoutRef.current);
//       }
//     };
//   }, [handleScroll]);

//   // Touch gesture handling
//   const touchStartY = useRef(0);
//   const touchEndY = useRef(0);

//   const handleTouchStart = useCallback((e) => {
//     touchStartY.current = e.touches[0].clientY;
//   }, []);

//   const handleTouchMove = useCallback((e) => {
//     touchEndY.current = e.touches[0].clientY;
//   }, []);

//   const handleTouchEnd = useCallback(
//     (e) => {
//       if (!touchStartY.current || !touchEndY.current) return;

//       const distance = touchStartY.current - touchEndY.current;
//       const isSwipeUp = distance > 50;
//       const isSwipeDown = distance < -50;

//       if (isSwipeUp && currentIndex < allShorts.length - 1) {
//         navigateToShort(currentIndex + 1);
//       } else if (isSwipeDown && currentIndex > 0) {
//         navigateToShort(currentIndex - 1);
//       }

//       touchStartY.current = 0;
//       touchEndY.current = 0;
//     },
//     [currentIndex, allShorts.length, navigateToShort]
//   );

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
//         e.preventDefault();
//         if (currentIndex > 0) {
//           navigateToShort(currentIndex - 1);
//         }
//       } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
//         e.preventDefault();
//         if (currentIndex < allShorts.length - 1) {
//           navigateToShort(currentIndex + 1);
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [currentIndex, allShorts.length, navigateToShort]);

//   // Show loading state
//   if (loading || !dataLoaded || allShorts.length === 0) {
//     return (
//       <Backdrop
//         sx={{ background: "black", zIndex: 100, height: "100vh" }}
//         open={true}
//       >
//         <CircularProgress />
//       </Backdrop>
//     );
//   }

//   return (
//     <>
//       {/* Back button for mobile */}
//       {isMobile && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 20,
//             left: 20,
//             zIndex: 1000,
//             bgcolor: "rgba(0,0,0,0.5)",
//             borderRadius: "50%",
//           }}
//         >
//           <IconButton onClick={() => router.back()} sx={{ color: "white" }}>
//             <ArrowBack />
//           </IconButton>
//         </Box>
//       )}

//       {/* Main Container */}
//       <Box
//         ref={containerRef}
//         sx={{
//           height: "100vh",
//           width: "100vw",
//           overflowY: "auto",
//           overflowX: "hidden",
//           scrollSnapType: "y mandatory",
//           scrollBehavior: "smooth",
//           bgcolor: "black",
//         }}
//         onTouchStart={isMobile ? handleTouchStart : undefined}
//         onTouchMove={isMobile ? handleTouchMove : undefined}
//         onTouchEnd={isMobile ? handleTouchEnd : undefined}
//       >
//         {allShorts.map((shortItem, index) => (
//           <ShortItem
//             key={shortItem.id}
//             short={shortItem}
//             index={index}
//             isActive={Math.abs(index - currentIndex) <= 1}
//             onShare={handleShare}
//             onWhatsApp={handleWhatsApp}
//             onCopy={handleCopy}
//             isMobile={isMobile}
//           />
//         ))}
//       </Box>

//       {/* Progress indicator */}
//       {allShorts.length > 1 && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: "50%",
//             right: 20,
//             transform: "translateY(-50%)",
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//             zIndex: 1000,
//           }}
//         >
//           {allShorts.map((_, index) => (
//             <Box
//               key={index}
//               sx={{
//                 width: 4,
//                 height: 20,
//                 bgcolor:
//                   index === currentIndex ? "white" : "rgba(255,255,255,0.3)",
//                 borderRadius: 2,
//                 transition: "all 0.3s ease",
//               }}
//             />
//           ))}
//         </Box>
//       )}

//       <ShareDialog
//         open={shareDialogOpen}
//         onClose={() => setShareDialogOpen(false)}
//         url={shareUrl}
//         title={selectedShort?.name}
//         videoUrl={selectedShort?.content_details[0]?.url}
//       />
//     </>
//   );
// };

// export default Short;
