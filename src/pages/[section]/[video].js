import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
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
import { LanguageComponet } from "@/custom-components/LanguageComponet";

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
const maxChars = 100;
const VideoDetailPage = () => {
  const router = useRouter();
  const { section, video } = router.query;
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  const [isShareHovered, setIsShareHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);
  const [langaugeList, setLanguageList] = useState([]);
  const [videoDetailData, setVideoDetailData] = useState(null);
  const { fetchVideoDetailPageData, loading } = useMain();
  const [selectedContent, setSelectedContent] = useState(null);
  const [leftContentHeight, setLeftContentHeight] = useState(0);
  const leftContentRef = useRef(null);

  const {
    getButtonConfig,
    getSocialUrl,
    getSuccessMessage,
    isDarkMode,
    isFeatureEnabled,
    config,
  } = useContent();

  const shareMessage = config.messages.shareMessage;

  // Get button configurations
  const whatsappConfig = getButtonConfig("whatsapp");
  const shareConfig = getButtonConfig("share");
  const copyConfig = getButtonConfig("copy");

  const shouldTruncate =
    isMobile && selectedContent?.description?.length > maxChars;
  const displayText =
    shouldTruncate && !showMore
      ? selectedContent?.description?.slice(0, maxChars) + "..."
      : selectedContent?.description;

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
    // Re-measure after toggle
    setTimeout(() => {
      if (leftContentRef.current && !isMobile) {
        const height = leftContentRef.current.getBoundingClientRect().height;
        console.log("Height after toggle:", height);
        setLeftContentHeight(height);
      }
    }, 50);
  };

  // Dynamic height measurement effect
  useEffect(() => {
    const measureLeftContent = () => {
      if (leftContentRef.current && !isMobile) {
        // Wait for layout to complete
        requestAnimationFrame(() => {
          const element = leftContentRef.current;
          const height = element.getBoundingClientRect().height;

          setLeftContentHeight(height);
        });
      }
    };

    // Initial measurement
    measureLeftContent();

    // Measure after a delay to ensure content is fully loaded
    const timer = setTimeout(measureLeftContent, 200);

    // Add resize listener for dynamic updates
    const handleResize = () => {
      measureLeftContent();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedContent, showMore, videoDetailData, isMobile]);
  useEffect(() => {
    // Set share URL only after component mounts on client side
    setShareUrl(window.location.href);
  }, []);
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchVideoDetailPageData(section, video);
        setVideoDetailData(res?.data?.response);
        setLanguageList(
          res?.data?.response?.content_details?.map((v) => {
            return { ...v.language, content_id: v.id };
          })
        );
        setSelectedContent(
          res?.data?.response?.content_details?.find(
            (v) => v?.language?.id === router.query.language
          )
        );
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
      // Add autoplay and mute parameters
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
        `${shareMessage}${videoDetailData.content_details[0].url}`
      );
      window.open(shareUrl, "_blank");
    }
  };

  // custom font family for language for making selected language bold because Montserrat doesn't supports bold
  // weights for certain non-Latin scripts like Tamil, Bengali, Kannada, Marathi, Telugu, Gujarati, or Hindi
  const getFontFamily = (langId) => {
    switch (langId) {
      case "LTN":
        return "'Noto Sans Tamil', sans-serif";
      case "LBE":
        return "'Noto Sans Bengali', sans-serif";
      case "LKA":
        return "'Noto Sans Kannada', sans-serif";
      case "LMAR":
      case "LHI":
        return "'Noto Sans Devanagari', sans-serif";
      case "LTL":
        return "'Noto Sans Telugu', sans-serif";
      case "LGJ":
        return "'Noto Sans Gujarati', sans-serif";
      case "LEN":
        return "'Open Sans', sans-serif";
      default:
        return "'Open Sans', sans-serif";
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
          <Grid item xs={12} md={9} ref={leftContentRef}>
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
                src={getEmbedUrl(selectedContent?.url)}
                title={selectedContent?.name}
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
                ml: 2,
              }}
            >
              <Box component="section" sx={{ mb: 1 }}>
                {/* Section Title & Language Tags */}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap", // allow wrapping
                    alignItems: "flex-start",
                    gap: 1,
                  }}
                >
                  {/* Section Title */}
                  <Typography
                    // variant="subtitle2"
                    // fontWeight="bold"
                    // color="text.secondary"
                    // sx={{ whiteSpace: "nowrap" }} // prevent title from wrapping
                    component="h1"
                    variant="sectionTitleOfVideoDetailPage"
                    sx={{
                      mb: 1,
                      ...fontStyles.openSans.bold,
                    }}
                  >
                    {videoDetailData?.section_name}
                  </Typography>

                  {/* Language Tags */}
                  {isMobile ? (
                    <LanguageComponet
                      contentDetails={videoDetailData?.content_details}
                      langaugeName={selectedContent?.language?.name}
                      setSelectedContent={setSelectedContent}
                      contentLanguages={langaugeList}
                      section={section}
                      video={video}
                      selectedContent={selectedContent}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "4px",
                        ml: 2,
                        flex: 1, // occupy remaining space
                        minWidth: 0, // prevent overflow
                      }}
                    >
                      {langaugeList?.map((lang) => (
                        <Typography
                          key={lang.id}
                          sx={{
                            padding: "2px 8px",
                            fontSize: "0.75rem",
                            cursor: "pointer",
                            background:
                              lang.id === router.query.language
                                ? theme.palette.common.white
                                : theme.palette.background.language,
                            color:
                              lang.id === router.query.language
                                ? theme.palette.common.black
                                : "inherit",
                            borderRadius: "8px",
                            border:
                              lang.id === router.query.language
                                ? `1px solid ${theme.palette.common.black}`
                                : "none",
                            fontFamily: getFontFamily(lang.id),
                            fontWeight:
                              lang.id === router.query.language ? 700 : 400,
                          }}
                          onClick={() =>
                            router.replace({
                              pathname: router.pathname,
                              query: {
                                ...router.query,
                                language: lang.id,
                              },
                            })
                          }
                        >
                          {lang?.name}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Video Title */}
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  mb: 1,
                  ...fontStyles.openSans.bold,
                  typography: "videoTitleOfVideoDetailPage",
                }}
              >
                {selectedContent?.name}
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
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, ml: -1 }}
                >
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
                      text={`${shareMessage} ${selectedContent?.url}`}
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
                  variant="videoDescriptionOfVideoDetailPage"
                  sx={{
                    whiteSpace: "pre-wrap",
                    ...fontStyles.sfPro.text.regular,
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
                height: {
                  md: leftContentHeight > 0 ? `${leftContentHeight}px` : "auto",
                  xs: "auto",
                },
                maxHeight: {
                  md:
                    leftContentHeight > 0
                      ? `${leftContentHeight}px`
                      : "calc(100vh - 100px)",
                  xs: "none",
                },
                overflowY: {
                  md: "auto",
                  xs: "visible",
                },
                pb: { md: 3, lg: 3 },
                "&::-webkit-scrollbar": {
                  width: "4px !important",
                  height: "8px !important",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1) !important"
                      : "rgba(0,0,0,0.1) !important",
                },
                "&::-webkit-scrollbar-track": {
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.1) !important"
                      : "rgba(0,0,0,0.1) !important",
                  borderRadius: "4px !important",
                },
                "&::-webkit-scrollbar-thumb": {
                  background:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.4) !important"
                      : "rgba(0,0,0,0.4) !important",
                  borderRadius: "4px !important",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(255,255,255,0.6) !important"
                        : "rgba(0,0,0,0.6) !important",
                  },
                },
                "& .MuiPaper-root": {
                  backgroundColor:
                    theme.palette.background.videoDetailSectionBg,
                },
              }}
            >
              {videoDetailData?.sections?.map((section, index) => {
                switch (section.layout_type) {
                  case "LGRID":
                    return (
                      <GridLayout
                        key={`${section.type}-${index}`}
                        video={section.contents}
                        section={section}
                        sectionData={section.contents}
                      />
                    );
                  case "LSTACK":
                    return (
                      <StackLayout
                        key={`${section.type}-${index}`}
                        video={section.contents}
                        section={section}
                        sectionData={videoDetailData}
                      />
                    );
                  case "LSLIDER":
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
