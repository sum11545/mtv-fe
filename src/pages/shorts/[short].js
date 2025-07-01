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
const MobileActionButton = React.memo(({ icon, onClick, label }) => (
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
  </Box>
));

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

// Individual Short Item Component - Scrollable Version with File1 Layout
const ShortItem = React.memo(
  ({ short, isActive, onShare, onWhatsApp, onCopy, isMobile, index }) => {
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";
    const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
    const [isShareHovered, setIsShareHovered] = useState(false);
    const [isCopyHovered, setIsCopyHovered] = useState(false);

    const { getButtonConfig, isFeatureEnabled } = useContent();

    // Memoize button configs to prevent re-computation
    const buttonConfigs = useMemo(
      () => ({
        whatsapp: getButtonConfig("whatsapp"),
        share: getButtonConfig("share"),
        copy: getButtonConfig("copy"),
      }),
      [getButtonConfig]
    );

    // Memoize handlers to prevent re-creation on every render
    const handleShare = useCallback(() => onShare(short), [onShare, short]);
    const handleWhatsApp = useCallback(
      () => onWhatsApp(short),
      [onWhatsApp, short]
    );
    const handleCopy = useCallback(() => onCopy(short), [onCopy, short]);

    if (isMobile) {
      return (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            pt: 2, // Add top padding
          }}
        >
          {/* Video Container - Mobile with File1 styling */}
          <Box
            sx={{
              width: "100vw",
              maxWidth: "400px", // Limit width for better 9:16 ratio on mobile
              aspectRatio: "9/16", // Force 9:16 aspect ratio
              maxHeight: "calc(100vh - 100px)",
              position: "relative",
              bgcolor: "black",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto", // Center horizontally
            }}
          >
            {/* Video - Only render if active to save resources */}
            {isActive && (
              <iframe
                key={`mobile-${short.id}`}
                src={getEmbedUrl(short?.content_details[0]?.url)}
                title={short?.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  pointerEvents: "none", // Disable iframe interaction for touch gestures
                  objectFit: "cover",
                }}
              />
            )}

            {/* Video Name Overlay - Bottom Center (File1 style) */}
            <Box
              sx={{
                position: "absolute",
                bottom: 40,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 4,
                maxWidth: "60%",
                textAlign: "center",
                pointerEvents: "none",
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
                {short?.name}
              </Typography>
            </Box>

            {/* Action Buttons - Bottom Right (File1 style) */}
            <Box
              sx={{
                position: "absolute",
                bottom: 100,
                right: 20,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                zIndex: 5,
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
          </Box>
        </Box>
      );
    }

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
          pt: { xs: 0, md: 2 },
        }}
      >
        {/* Left Empty Space */}
        <Grid item xs={12} md={5} />

        {/* Center: Video - File1 dimensions */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            pt: { xs: 0, md: 2 },
          }}
        >
          <Box
            sx={{
              width: { xs: "100vw", md: 400 }, // Fixed width for desktop
              maxWidth: { xs: "400px", md: "400px" }, // Limit width to maintain ratio
              aspectRatio: "9/16", // Force 9:16 aspect ratio
              maxHeight: {
                xs: "calc(100vh - 160px)",
                md: "calc(100vh - 160px)",
              }, // Ensure it doesn't exceed viewport
              bgcolor: "black",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              mx: "auto", // Center horizontally
            }}
          >
            {isActive && (
              <iframe
                key={`desktop-${short.id}`}
                src={getEmbedUrl(short?.content_details[0]?.url)}
                title={short?.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  objectFit: "cover",
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
            pt: { xs: 2, md: 4 },
            pb: { md: 30 },
            height: "80vh",
            pr: { md: 8, lg: 10 }, // Add right padding to avoid overlap with navigation buttons
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
              {short?.name}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                px: 3,
                py: 1,
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
                      text={short?.content_details[0]?.url}
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
          </Box>
        </Grid>
      </Grid>
    );
  }
);

const Short = () => {
  const router = useRouter();
  const { short } = router.query;
  const { fetchShortDetailPageData, loading } = useMain();

  // State management
  const [allShorts, setAllShorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [selectedShort, setSelectedShort] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);
  const lastFetchedShort = useRef(null);

  // Responsive
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery("(max-width:899px)");

  const { getSocialUrl, getButtonConfig, isFeatureEnabled } = useContent();

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
        shortItem.content_details[0].url
      );
      window.open(shareUrl, "_blank");
    },
    [getSocialUrl]
  );

  const handleCopy = useCallback((shortItem) => {
    navigator.clipboard
      .writeText(shortItem?.content_details[0]?.url)
      .then(() => console.log("URL copied to clipboard"))
      .catch((err) => console.error("Failed to copy URL: ", err));
  }, []);

  // Load data - Prevent infinite API calls
  useEffect(() => {
    if (!short || loading) {
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

        const res = await fetchShortDetailPageData(short);

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
      } catch (err) {
        console.error("Error fetching shorts data:", err);
        lastFetchedShort.current = null;
        setDataLoaded(false);
      }
    };

    loadData();
  }, [short, loading]);

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
        window.history.replaceState(null, "", `/shorts/${newShort.id}`);
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
        window.history.replaceState(null, "", `/shorts/${newShort.id}`);
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
    e.preventDefault();
    e.stopPropagation();
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    touchEndY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

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
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Backdrop
          sx={{ background: "transparent", zIndex: 100, height: "100vh" }}
          open={true}
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
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Main Container - Scrollable */}
        <Box
          ref={containerRef}
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
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
              isActive={Math.abs(index - currentIndex) <= 1}
              onShare={handleShare}
              onWhatsApp={handleWhatsApp}
              onCopy={handleCopy}
              isMobile={isMobile}
            />
          ))}
        </Box>

        <ShareDialog
          open={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          url={shareUrl}
          title={selectedShort?.name}
          videoUrl={selectedShort?.content_details[0]?.url}
        />
      </Box>
    );
  }

  // Desktop Layout - Scrollable with File1 Navigation Buttons
  return (
    <>
      {/* Main Container - Scrollable */}
      <Box
        ref={containerRef}
        sx={{
          height: "100vh",
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
            isActive={Math.abs(index - currentIndex) <= 1}
            onShare={handleShare}
            onWhatsApp={handleWhatsApp}
            onCopy={handleCopy}
            isMobile={isMobile}
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
          variant="caption"
          sx={{
            color: isDarkMode ? "grey.300" : "grey.600",
            mb: 1,
            fontSize: "10px",
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
          variant="caption"
          sx={{
            color: isDarkMode ? "grey.300" : "grey.600",
            fontSize: "10px",
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
        title={selectedShort?.name}
        videoUrl={selectedShort?.content_details[0]?.url}
      />
    </>
  );
};

export default Short;
