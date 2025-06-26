import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Stack,
  Divider,
  useTheme,
  Link,
  useMediaQuery,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { WhatsApp, ContentCopy, Reply } from "@mui/icons-material";
import GridLayout from "../../custom-components/layouts/GridLayout";
import SliderLayout from "../../custom-components/layouts/SliderLayout";
import ShareDialog from "../../custom-components/ShareDialog";
import CopyButton from "../../custom-components/CopyButton";
import { fontSize, fontStyles } from "../../theme/theme";
import { useMain } from "@/context/MainContext";
import StackLayout from "@/custom-components/layouts/StackLayout";
import AdSection from "@/custom-components/layouts/AdSection";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
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
const maxChars = 100;
const VideoDetailPage = () => {
  const router = useRouter();
  const { section, video } = router.query;
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  const [isShareHovered, setIsShareHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);

  const [videoDetailData, setVideoDetailData] = useState(null);
  const { fetchVideoDetailPageData, loading } = useMain();
  const {
    getButtonConfig,
    getSocialUrl,
    getSuccessMessage,
    isDarkMode,
    isFeatureEnabled,
  } = useContent();

  // Get button configurations
  const whatsappConfig = getButtonConfig("whatsapp");
  const shareConfig = getButtonConfig("share");
  const copyConfig = getButtonConfig("copy");

  const shouldTruncate =
    isMobile && videoDetailData?.description.length > maxChars;
  const displayText =
    shouldTruncate && !showMore
      ? videoDetailData?.description.slice(0, maxChars) + "..."
      : videoDetailData?.description;

  const toggleShowMore = () => setShowMore((prev) => !prev);
  useEffect(() => {
    // Set share URL only after component mounts on client side
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchVideoDetailPageData(section, video);
        setVideoDetailData(res?.data?.response);
      } catch (err) {
        console.error("Error fetching home data:", err);
      }
    };

    loadData();
  }, [router.query]);

  // Function to convert video URL to embed URL
  const getEmbedUrl = (url) => {
    if (!url) return "";

    // Handle YouTube URLs
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      // Extract video ID from YouTube URL
      let videoId = "";
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("watch?v=")[1];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1];
      }
      // Remove any additional parameters (e.g., ?si=...)
      videoId = videoId.split(/[?&]/)[0];
      // Add autoplay parameter for immediate playback
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    // Handle other video platforms here if needed
    return url;
  };

  const handleShare = () => {
    if (videoDetailData) {
      setShareDialogOpen(true);
    }
  };

  const handleWhatsApp = () => {
    if (videoDetailData) {
      const shareUrl = getSocialUrl(
        "whatsapp",
        window.location.href,
        videoDetailData.content_details[0].url
      );
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <>
      <Backdrop
        sx={{ background: "transparent", zIndex: 100, height: "100vh" }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>

      <Container
        maxWidth="xl"
        sx={{
          width: "100%",
          maxWidth: "100% !important",
          mb: "21px",
        }}
        disableGutters
      >
        <Grid container spacing={2} sx={{ px: { lg: 2.5, sm: 0 } }}>
          {/* Left side - Video and details */}
          <Grid item xs={12} md={9}>
            {/* Video Player */}
            <Box
              sx={{
                width: "100%",
                position: "relative",
                paddingTop: "50.25%", // 16:9 aspect ratio
                bgcolor: "black",
                borderRadius: {
                  md: "12px",
                  xs: "12px",
                },

                overflow: "hidden",
                mb: 2,
              }}
            >
              <iframe
                src={getEmbedUrl(videoDetailData?.content_details[0]?.url)}
                title={videoDetailData?.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Box
              sx={{
                px: {
                  md: 0,
                  xs: "10px",
                },
              }}
            >
              {/* Section Title */}
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                color="text.secondary"
                sx={{ mb: 1 }}
              >
                {/* {sectionData?.sectionTitle} */}
              </Typography>

              {/* Video Title */}
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  mb: 1,
                  ...fontStyles.openSans.bold,
                }}
              >
                {videoDetailData?.name}
              </Typography>

              {/* Action Buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 2,
                  mb: 1,
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
                      text={videoDetailData?.content_details[0]?.url}
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

              {/* Video Description */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: "pre-wrap",
                    fontSize: fontSize.typography.body2,
                    color: "text.secondary",
                  }}
                >
                  {displayText}
                  {shouldTruncate && (
                    <Button
                      onClick={toggleShowMore}
                      sx={{
                        display: "block",
                        background: "none",
                        border: "none",
                        color: theme.palette.primary,
                        cursor: "pointer",
                        padding: 0,
                        textAlign: "center",
                        margin: "auto",
                        pt: "1rem",
                      }}
                    >
                      {showMore ? "Read Less" : "Read More"}
                    </Button>
                  )}
                </Typography>
              </Box>
            </Box>
            {/* Advertisement Section */}
            {/* {adData && (
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Sponsored
                </Typography>
                <Link
                  href={adData.redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    display: "block",
                    "&:hover": {
                      opacity: 0.9,
                    },
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Box
                      component="img"
                      src={adData.adImageUrl}
                      alt={adData.title}
                      sx={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        background:
                          "linear-gradient(transparent, rgba(0,0,0,0.7))",
                        color: "white",
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold">
                        {adData.title}
                      </Typography>
                      <Typography variant="body2">
                        {adData.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Link>
              </Box>
            )} */}
          </Grid>

          {/* Right side - Sidebar with 4 sections */}
          <Grid item xs={12} md={3}>
            <Box
              className="sidebar-container"
              sx={{
                backgroundColor: theme.palette.background.videoDetailSectionBg,
                borderRadius: {
                  md: 2,
                  sm: 0,
                },
                height: "100%",

                pb: { md: 3, lg: 3 },
                "& .MuiPaper-root": {
                  backgroundColor:
                    theme.palette.background.videoDetailSectionBg,
                },
              }}
            >
              {videoDetailData?.sections?.map((section, index) => {
                switch (section.layout_config?.type) {
                  case "grid":
                    return (
                      <GridLayout
                        key={`${section.type}-${index}`}
                        video={section.contents}
                        section={section}
                        sectionData={section.contents}
                      />
                    );
                  case "stack":
                    return (
                      <StackLayout
                        key={`${section.type}-${index}`}
                        video={section.contents}
                        section={section}
                        sectionData={videoDetailData}
                      />
                    );
                  case "slider":
                    return (
                      <SliderLayout
                        key={`${section.type}-${section.id}`}
                        name={section.name}
                        section={section}
                        sectionData={videoDetailData}
                        styles={{ px: { md: 2, lg: 2, xs: 2 } }}
                      />
                    );
                  case "ad":
                    return (
                      <AdSection
                        key={`${section.type}-${index}`}
                        name={section.name}
                        ads={section.contents}
                        section={section}
                        sectionData={videoDetailData}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareUrl}
        title={videoDetailData?.name}
        videoUrl={videoDetailData?.content_details[0]?.url}
      />
    </>
  );
};

export default VideoDetailPage;
