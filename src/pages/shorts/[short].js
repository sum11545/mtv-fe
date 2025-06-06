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
import { fontSize, fontStyles } from "@/theme/theme";

const ActionButton = ({ icon, label, onClick, isReversed = false }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      borderRadius: 1,
      cursor: "pointer",
      padding: "4px 8px",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        "& .MuiTypography-root, & .MuiSvgIcon-root": {
          color: "grey.700",
        },
      },
    }}
    onClick={onClick}
  >
    {isReversed ? (
      <>
        <Typography
          variant="caption"
          sx={{
            color: "grey.500",
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
            color: "grey.500",
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
        bgcolor: "rgba(255, 255, 255, 0.9)",
        color: "grey.500",
        "&:hover": {
          bgcolor: "rgba(255, 255, 255, 1)",
          "& .MuiSvgIcon-root": {
            color: "grey.700",
          },
        },
        width: 72,
        height: 72,
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
    }
    videoId = videoId.split(/[?&]/)[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  }
  return url;
};

const Short = () => {
  const router = useRouter();
  const { short } = router.query;
  const { fetchShortDetailPageData } = useMain();
  const [allShorts, setAllShorts] = useState([]);
  const [currentShortIndex, setCurrentShortIndex] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Responsive breakpoint
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:899px)"); // Simplified breakpoint to ensure all mobile devices are covered

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
      const text = encodeURIComponent(
        `${currentShort?.content_details[0]?.url}\n${window.location.href}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
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
        <Typography>Loading...</Typography>
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
              icon={<WhatsApp sx={{ fontSize: fontSize.icon.small }} />}
              onClick={handleWhatsApp}
              label="Send"
            />
            <MobileActionButton
              icon={<ContentCopy sx={{ fontSize: fontSize.icon.small }} />}
              onClick={handleCopyToClipboard}
              label="Copy"
            />
            <MobileActionButton
              icon={
                <Reply
                  sx={{
                    fontSize: fontSize.icon.small,
                    transform: "scaleX(-1)",
                  }}
                />
              }
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
        <Grid item xs={12} md={2.5} />

        {/* Center: Video */}
        <Grid
          item
          xs={12}
          md={5.5}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "100vw", md: 400 },
              height: { xs: "100vw", sm: 600, md: 700 },
              maxHeight: "80vh",
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
                  <ActionButton
                    icon={<WhatsApp sx={{ fontSize: fontSize.icon.small }} />}
                    label="Send"
                    onClick={handleWhatsApp}
                  />
                  <CopyButton text={currentShort?.content_details[0]?.url} />
                </Box>
                <ActionButton
                  icon={
                    <Reply
                      sx={{
                        fontSize: fontSize.icon.small,
                        transform: "rotate(180deg) scaleY(-1)",
                        mr: 2,
                      }}
                    />
                  }
                  label="Share"
                  onClick={handleShare}
                  isReversed={true}
                />
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
              <ArrowUpward fontSize="large" />
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
              }}
            >
              <ArrowDownward fontSize="large" />
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
      />
    </>
  );
};

export default Short;
