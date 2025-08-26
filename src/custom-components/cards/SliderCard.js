import {
  Box,
  Card,
  CardMedia,
  useTheme,
  IconButton,
  Snackbar,
  useMediaQuery,
  Typography,
  Tooltip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { DynamicIcon } from "@/components/icons";
import Image from "next/image";
import ShareShortMobileIcon from "@/components/icons/ShareShortMobileIcon";
import { ShortCopyMobileIcon } from "@/components/icons/ShortCopyMobileIcon";
import ShortWhatsAppMobileIcon from "@/components/icons/ShortWhatsAppMobileIcon";
import useContent from "@/hooks/useContent";
import ShareDialog from "../ShareDialog";
import { fontStyles } from "@/theme/theme";

const SliderCard = ({ short, sectionIndex, id, sectionData, section }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const dims = theme.customDimensionForSliderCard;
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let isShort = short?.content_details[0]?.content_type_id == "CTSR"; // CTSR  is for shorts.

  const [showTooltip, setShowTooltip] = useState(false);
  const titleRef = React.useRef(null);

  // Check if text is overflowing to show tooltip conditionally
  useEffect(() => {
    const checkOverflow = () => {
      if (titleRef.current) {
        const element = titleRef.current;
        const isOverflowing = element.scrollHeight > element.clientHeight;
        setShowTooltip(isOverflowing);
      }
    };

    // Check on mount and when content changes
    checkOverflow();

    // Add resize listener to recheck on window resize
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [short?.name]);

  const getThumbnailUrl = () => {
    const details = short?.content_details?.[0];
    if (!details || details.platform !== "PY")
      return "/images/404-not-found.jpg";

    // If backend already provides a thumbnail, use it
    if (details.thumbnail_url) {
      return details.thumbnail_url;
    }

    // else use youtubes URL
    const url = details.url;

    try {
      const youtubeRegex =
        /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
      const match = url.match(youtubeRegex);
      const videoId = match?.[1] ?? "";
      return videoId
        ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        : "/images/404-not-found.jpg";
    } catch (err) {
      return "/images/404-not-found.jpg";
    }
  };

  const handleCardClick = () => {
    // if video type is ad then don't redirect it to any ad url
    if (short?.type == "ad_content") {
      window.open(short.content_details[0]?.cta_url, "_blank");
    } else {
      // If content type is short then i am redirecting it to static shorts/id page i.e. short detail page
      if (isShort) {
        let shortId = short?.id;

        // if we get guest name or organization name then adding that in the url else not.
        const OrgGuest = (short?.org_guest_url || "").replace(/^\/|\/$/g, "");

        const fullPath = `/shorts/${section?.slug}${
          OrgGuest ? `/${OrgGuest}` : ""
        }/${shortId}`;

        router.push(fullPath);
      } else {
        // If content type is not short then i am redirecting it to dynamic section/contentId page i.e. video detail page

        // Find the section this short belongs to
        const section = sectionData?.sections?.find((s, index) => {
          if (typeof sectionIndex === "number") {
            return index === sectionIndex;
          }
          return s.type === "shorts";
        });

        // Not added the code for language query param or guest and organiztion for slider card for now
        if (section) {
          router.push(`/${section.slug}/${short.id}`);
        }
      }
    }
  };

  const { getSocialUrl, config, getSuccessMessage, snackbarDuration } =
    useContent();
  const shareMessage = config.messages.shareMessage;
  const successMessage = getSuccessMessage("linkCopied");
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleWhatsApp = () => {
    const shareUrl = getSocialUrl(
      "whatsapp",
      window.location.href,
      `${shareMessage}${short?.content_details?.[0]?.url}`
    );
    window.open(shareUrl, "_blank");
  };

  const handleCopy = () => {
    let text = `${shareMessage} ${short?.content_details[0]?.url}`;
    navigator.clipboard?.writeText(text);
    setSnackbarOpen(true);
  };

  const MobileActionButton = React.memo(({ icon, onClick, label }) => {
    const handleClick = (e) => {
      e.stopPropagation();
      onClick();
    };

    return (
      <>
        <Box
          onClick={handleClick}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            cursor: "pointer",
            mt: label == "Share" && "-5px",
          }}
        >
          <IconButton>{icon}</IconButton>
        </Box>
      </>
    );
  });

  return (
    <>
      <Card
        sx={{
          width: {
            xs: dims.xs.width,
            sm: dims.sm.width,
            md: dims.md.width,
            lg: dims.lg.width,
            xl: dims.xl.width,
          },
          height: {
            xs: dims.xs.height,
            sm: dims.sm.height,
            md: dims.md.height,
            lg: dims.lg.height,
            xl: dims.xl.height,
          },
          borderRadius: 3,
          "&:hover": {
            cursor: "pointer",
          },
        }}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Box sx={{ position: "relative", height: "100%" }}>
          <Image
            src={getThumbnailUrl()}
            alt={short.name}
            fill
            style={{
              objectFit: isShort ? "cover" : "fill",
            }}
            priority
          />
          {/* Copy Icon - Top Right (visible on hover) */}
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
              top: 0,
              right: 0,
              opacity: {
                xs: 1, // Always visible on mobile
                sm: 1, // Always visible on small screens
                md: isHovered ? 1 : 0, // Hover effect only on medium and larger screens
              },
              transform: {
                xs: "translateY(0)", // No transform on mobile
                sm: "translateY(0)", // No transform on small screens
                md: isHovered ? "translateY(0)" : "translateY(10px)", // Transform only on medium and larger screens
              },
              transition: {
                xs: "none", // No transition on mobile
                sm: "none", // No transition on small screens
                md: "opacity 0.8s ease-in-out, transform 0.8s ease-in-out", // Transition only on medium and larger screens
              },
              pointerEvents: {
                xs: "auto", // Always clickable on mobile
                sm: "auto", // Always clickable on small screens
                md: isHovered ? "auto" : "none", // Clickable only on hover for medium and larger screens
              },
            }}
          >
            <Box
              sx={{
                alignSelf: "flex-end",
                pt: 1.5,
                pr: 1.3,
              }}
            >
              {!isMobile && (
                <DynamicIcon
                  keyword="EXPAND"
                  height={isMobile && router.pathname !== "/" ? "30px" : "23px"}
                  width={isMobile && router.pathname !== "/" ? "30px" : "23px"}
                  onClick={handleCardClick}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Box>

            <Box sx={{ pb: 0.2, marginLeft: "auto", pr: 0.2 }}>
              <MobileActionButton
                icon={
                  <ShortWhatsAppMobileIcon
                    height={
                      isMobile && router.pathname !== "/" ? "35px" : "25px"
                    }
                    width={
                      isMobile && router.pathname !== "/" ? "35px" : "25px"
                    }
                  />
                }
                onClick={handleWhatsApp}
                label="WhatsApp"
              />
              <MobileActionButton
                icon={
                  <ShortCopyMobileIcon
                    height={
                      isMobile && router.pathname !== "/" ? "35px" : "25px"
                    }
                    width={
                      isMobile && router.pathname !== "/" ? "35px" : "25px"
                    }
                  />
                }
                onClick={handleCopy}
                label="Copy"
                isCopyButton={true}
              />
              <MobileActionButton
                icon={
                  <ShareShortMobileIcon
                    height={
                      isMobile && router.pathname !== "/" ? "35px" : "25px"
                    }
                    width={
                      isMobile && router.pathname !== "/" ? "35px" : "25px"
                    }
                  />
                }
                onClick={handleShare}
                label="Share"
              />
            </Box>
          </Box>
        </Box>
      </Card>

      <Box
        sx={{
          minHeight: "3em", // Fixed height to ensure consistent button positioning
          display: "flex",
          alignItems: "flex-start", // Align title to top of container
          pt: "14px",
          width: {
            xs: dims.xs.width,
            sm: dims.sm.width,
            md: dims.md.width,
            lg: dims.lg.width,
            xl: dims.xl.width,
          },
        }}
      >
        {showTooltip ? (
          <Tooltip title={short?.name} arrow placement="top">
            <Typography
              component="h2"
              sx={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                textOverflow: "ellipsis",
                cursor: "pointer",
                ...fontStyles.openSans.bold,
              }}
              variant="videoTitle"
              onClick={handleCardClick}
              ref={titleRef}
            >
              {short?.content_details[0]?.name}
            </Typography>
          </Tooltip>
        ) : (
          <Typography
            component="h2"
            sx={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
              cursor: "pointer",
              ...fontStyles.openSans.bold,
            }}
            variant="videoTitle"
            onClick={handleCardClick}
            ref={titleRef}
          >
            {short?.content_details[0]?.name}
          </Typography>
        )}
      </Box>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareUrl}
        title={short?.name}
        videoUrl={short?.content_details[0]?.url}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={handleSnackbarClose}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default SliderCard;
