import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  IconButton,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Reply, WhatsApp } from "@mui/icons-material";
import { useRouter } from "next/router";
import ShareDialog from "../ShareDialog";
import CopyButton from "../CopyButton";
import { useMain } from "@/context/MainContext";
import AdCard from "./AdCard";
import { fontStyles, fontSize, palette } from "../../theme/theme";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import ShareIcon from "@/components/icons/ShareIcon";
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

const GridCard = ({ video, id, sectionData, section, styles }) => {
  const theme = useTheme();
  const router = useRouter();
  const [shareUrl, setShareUrl] = useState("");
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  const [isShareHovered, setIsShareHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);
  const { contentConfigurations } = useMain();
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

  let isAd = ["ATI", "ATV", "ATT"].includes(
    video?.content_details[0]?.content_type_id
  );
  let isShort = video?.content_details[0]?.content_type_id == "CTSR"; // CTSR  is for shorts.

  // Finding the content type id and then applying height and width according to configuration
  const layout = contentConfigurations?.find(
    (item) => item.content_type_id == video?.content_details[0]?.content_type_id
  );

  // let height = layout?.layout?.height;
  // let width = layout?.layout?.width;

  const height = styles.height;
  const width = styles.width;

  useEffect(() => {
    // Set share URL only after component mounts on client side
    setShareUrl(window.location.href);
  }, []);

  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  const handleShare = (e) => {
    e.stopPropagation(); // Prevent card click event
    setShareDialogOpen(true);
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation(); // Prevent card click event
    const shareUrl = getSocialUrl(
      "whatsapp",
      window.location.href,
      video.content_details[0].url
    );
    window.open(shareUrl, "_blank");
  };

  const handleCardClick = () => {
    // if video type is ad then don't redirect it to any ad url
    if (video.type == "ad_content") {
      window.open(video.content_details[0]?.cta_url, "_blank");
    } else {
      // If content type is short then i am redirecting it to static shorts/id page i.e. short detail page
      if (isShort) {
        let shortId = video?.id;
        router.push(`/shorts/${shortId}`);
      } else {
        // If content type is not short then i am redirecting it to dynamic section/contentId page i.e. video detail page

        // Find the section this video belongs to
        // console.log(section?.slug);
        // If we're in a section list page, use the section prop directly
        if (section?.slug) {
          router.push(`/${section.slug}/${video.id}`);
          return;
        }

        // If we're in the home page, find the section from sectionData
        const foundSection = sectionData.find((s, index) => {
          if (typeof id === "number") {
            return index === id;
          }
          return s.contents?.some((v) => v.id === video.id);
        });

        if (foundSection) {
          router.push(`/${foundSection.slug}/${video.id}`);
        }
      }
    }
  };
  const getThumbnailUrl = () => {
    const details = video?.content_details?.[0];
    if (!details || details.platform !== "PY")
      return "/images/404-not-found.jpg";

    const url = details.url;
    let videoId = "";

    try {
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;
      const match = url.match(youtubeRegex);
      videoId = match?.[1] ?? "";
    } catch (err) {
      return "/images/404-not-found.jpg";
    }

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
      : "/images/404-not-found.jpg";
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            cursor: "pointer",
          },
          border: "none",
          boxShadow: "none",
          borderRadius: 0,
          background: "none",
        }}
        onClick={handleCardClick}
      >
        <Box
          sx={{
            width: width && {
              lg: width?.lg,
              md: width?.md,
              sm: width?.sm,
              xs: width?.xs,
            },
            height: height && {
              lg: height?.lg,
              md: height?.md,
              sm: height?.sm,
              xs: height?.xs,
            },
          }}
        >
          {/* if my content is ad then i am showing ad card */}
          {isAd ? (
            <AdCard ad={video} />
          ) : (
            <CardMedia
              component="img"
              image={getThumbnailUrl()} // currently we don't have to show carousel in each content that's why mapping 0th element
              alt={video.name}
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "12px",
              }}
            />
          )}
        </Box>

        {/* Not showing video name and send, copy and share buttons for ad 
        and for shorts showing only video name and for grid showing both */}

        {!isAd && (
          <CardContent
            sx={{
              flexGrow: 1,
              py: "14px",
              px: 0,
              display: "flex",
              flexDirection: "column",
              height: isShort ? "50px" : "90px",
              justifyContent: "space-between",
              "&:last-child": {
                paddingBottom: 1.5,
              },
            }}
          >
            <Box
              sx={{
                minHeight: "2.2em", // Fixed height for video name area (2 lines)
                maxHeight: "2.2em",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              {/* <Tooltip title={video.name} arrow> */}
              <Typography
                component="div"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineHeight: 1.2,
                  fontSize: fontSize.typography.body2,
                  ...fontStyles.openSans.bold,
                }}
              >
                {video.name}
              </Typography>
              {/* </Tooltip> */}
            </Box>
            {!isShort && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "-5px",
                    ...fontStyles.sfPro.condensed.regular,
                  }}
                >
                  {/* Show action buttons only if features are enabled */}
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
                      text={video?.content_details[0]?.url}
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
            )}
          </CardContent>
        )}
      </Card>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareUrl}
        title={video.name}
        videoUrl={video?.content_details[0]?.url}
      />
    </>
  );
};

export default GridCard;
