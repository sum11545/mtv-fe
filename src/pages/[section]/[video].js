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

const ActionButton = ({ icon, label, onClick, isReversed = false }) => (
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

const VideoDetailPage = () => {
  const router = useRouter();
  const { section, video } = router.query;
  const theme = useTheme();
  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const [videoDetailData, setVideoDetailData] = useState(null);
  const { fetchVideoDetailPageData } = useMain();

  useEffect(() => {
    // Set share URL only after component mounts on client side
    setShareUrl(window.location.href);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchVideoDetailPageData(section, video);
        console.log({ res });
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
      // Remove any additional parameters
      videoId = videoId.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Handle other video platforms here if needed
    return url;
  };

  const handleShare = () => {
    if (videoData) {
      setShareDialogOpen(true);
    }
  };

  const handleWhatsApp = () => {
    if (videoData) {
      const text = encodeURIComponent(
        `${videoData.content_details[0]?.url}\n${window.location.href}`
      );
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 3, sm: 5, md: 5 },
          width: "100%",
          maxWidth: "100% !important",
        }}
      >
        <Grid container spacing={3}>
          {/* Left side - Video and details */}
          <Grid item xs={12} md={9}>
            {/* Video Player */}
            <Box
              sx={{
                width: "100%",
                position: "relative",
                paddingTop: "50.25%", // 16:9 aspect ratio
                bgcolor: "black",
                borderRadius: 2,
                overflow: "hidden",
                mb: 2,
              }}
            >
              <iframe
                src={getEmbedUrl(videoDetailData?.url)}
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
                <ActionButton
                  icon={<WhatsApp sx={{ fontSize: fontSize.icon.small }} />}
                  label="Send"
                  onClick={handleWhatsApp}
                />
                <CopyButton text={videoDetailData?.url} />
              </Box>
              <ActionButton
                icon={
                  <Reply
                    sx={{
                      fontSize: fontSize.icon.small,
                      transform: "rotate(180deg) scaleY(-1)",
                    }}
                  />
                }
                label="Share"
                onClick={handleShare}
                isReversed={true}
              />
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
                {videoDetailData?.description}
              </Typography>
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
                backgroundColor: "background.paper",
                borderRadius: 2,
                height: "100%",
                px: { md: 2, lg: 2 },
                pb: { md: 3, lg: 3 },
                "& .MuiPaper-root": {
                  backgroundColor: "background.paper",
                },
              }}
            >
              {/* Section 1: Related Videos */}
              {/* <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Related Videos
                </Typography>
                <Stack spacing={2}>
                  {relatedVideos.map((video) => (
                    <Paper
                      key={video.id}
                      elevation={0}
                      className="video-card"
                      sx={{
                        display: "flex",
                        gap: 1,
                        borderRadius: 0,
                        overflow: "hidden",
                        cursor: "pointer",
                        backgroundColor: "background.paper",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                              ? "rgba(0, 0, 0, 0.04)"
                              : "rgba(255, 255, 255, 0.08)",
                        },
                      }}
                      onClick={() => {
                        router.push(`/${section}/${video.id}`);
                      }}
                    >
                      <Box
                        sx={{
                          width: 100,
                          minWidth: 100,
                          height: 50,
                          position: "relative",
                          borderRadius: 1,
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          component="img"
                          src={video.thumbnailUrl}
                          alt={video.name}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <Box sx={{ flex: 1, py: 0.5 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.2,
                            mb: 0.5,
                            fontSize: fontSize.typography.caption,
                            color: (theme) =>
                              theme.palette.mode === "light"
                                ? "black"
                                : "inherit",
                            ...fontStyles.openSans.bold,
                          }}
                        >
                          {video.name}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </Box> */}

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
                        sectionData={sectionData}
                      />
                    );
                  case "ad":
                    return (
                      <AdSection
                        key={`${section.type}-${index}`}
                        name={section.name}
                        ads={section.contents}
                        section={section}
                        sectionData={sectionData}
                      />
                    );
                  default:
                    return null;
                }
              })}

              <Divider sx={{ my: 1 }} />
            </Box>
          </Grid>
        </Grid>
      </Container>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareUrl}
        title={videoData?.name}
      />
    </>
  );
};

export default VideoDetailPage;

// Remove getStaticPaths and getStaticProps and replace with getServerSideProps
export async function getServerSideProps({ params, req, res }) {
  const { section, video } = params;

  try {
    // Set cache headers
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );

    return {
      props: {
        // We'll fetch the data client-side using the useEffect hook
        section,
        video,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      notFound: true,
    };
  }
}
