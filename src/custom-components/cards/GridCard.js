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
import { LanguageComponet } from "../LanguageComponet";

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

const GridCard = ({ video, id, sectionData, section }) => {
  const theme = useTheme();
  const router = useRouter();
  const [shareUrl, setShareUrl] = useState("");
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  const [isShareHovered, setIsShareHovered] = useState(false);
  const [isCopyHovered, setIsCopyHovered] = useState(false);
  const [selectedContent, setSelectedContent] = useState(
    video?.content_details[0]
  );
  const [showTooltip, setShowTooltip] = useState(false);
  const titleRef = React.useRef(null);
  const {
    getButtonConfig,
    getSocialUrl,
    getSuccessMessage,
    isDarkMode,
    isFeatureEnabled,
    config,
  } = useContent();

  const shareMessage = config.messages.shareMessage;

  // These below states and ref code are for language component tooltip alignment
  const [tooltipOffset, setTooltipOffset] = useState(0);
  const cardRef = React.useRef(null);
  const languageButtonRef = React.useRef(null);

  // Calculate tooltip offset based on card and button positions
  useEffect(() => {
    const calculateOffset = () => {
      if (cardRef.current && languageButtonRef.current) {
        const cardRect = cardRef.current.getBoundingClientRect();
        const buttonRect = languageButtonRef.current.getBoundingClientRect();

        // Calculate the distance from button to the start of the card
        const offset = buttonRect.left - cardRect.left;
        setTooltipOffset(-offset);
      }
    };

    // Calculate on mount and when content changes
    calculateOffset();

    // Recalculate on window resize
    const handleResize = () => calculateOffset();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [selectedContent]);

  // Get button configurations
  const whatsappConfig = getButtonConfig("whatsapp");
  const shareConfig = getButtonConfig("share");
  const copyConfig = getButtonConfig("copy");
  const contentLanguages = video?.content_details?.map((v) => {
    return { ...v.language, content_id: v.id };
  });
  let isAd = ["ATI", "ATV", "ATT"].includes(selectedContent?.content_type_id);
  let isShort = selectedContent?.content_type_id == "CTSR"; // CTSR  is for shorts.

  const heightMap = isAd
    ? theme.customHeightsForGridCard.ad
    : isShort
    ? theme.customHeightsForGridCard.short
    : theme.customHeightsForGridCard.content;

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
      `${shareMessage}${selectedContent?.url}`
    );
    window.open(shareUrl, "_blank");
  };

  const handleCardClick = () => {
    // if video type is ad then don't redirect it to any ad url
    if (video.type == "ad_content") {
      window.open(selectedContent?.cta_url, "_blank");
    } else {
      // If content type is short then i am redirecting it to static shorts/id page i.e. short detail page
      if (isShort) {
        let shortId = video?.id;
        router.push(`/shorts/${section.slug}/${shortId}`);
      } else {
        // If content type is not short then i am redirecting it to dynamic section/contentId page i.e. video detail page

        // Find the section this video belongs to
        // console.log(section?.slug);
        // If we're in a section list page, use the section prop directly
        if (section?.slug) {
          router.push({
            pathname: `/${section.slug}/${video.id}`,
            query: {
              language: selectedContent?.language?.id,
            },
          });
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
    const details = selectedContent;
    if (!details || details.platform !== "PY")
      return "/images/404-not-found.jpg";

    const url = details.url;
    let videoId = "";

    try {
      const youtubeRegex =
        /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
      const match = url.match(youtubeRegex);
      videoId = match?.[1] ?? "";
    } catch (err) {
      return "/images/404-not-found.jpg";
    }

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : "/images/404-not-found.jpg";
  };

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
  }, [selectedContent?.name]);

  return (
    <>
      <Card
        ref={cardRef} // for language component tooltip horizontal alignment
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
      >
        <Box
          onClick={handleCardClick}
          sx={{
            height: {
              xs: heightMap.xs,
              sm: heightMap.sm,
              md: heightMap.md,
              lg: heightMap.lg,
              lgPlus: heightMap.lgPlus,
              xl: heightMap.xl,
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
              alt={selectedContent?.name}
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
              position: "relative",
              zIndex: 5,
              flexDirection: "column",
              "&:last-child": {
                paddingBottom: 1.5,
              },
            }}
          >
            <Box
              sx={{
                minHeight: "3em", // Fixed height to ensure consistent button positioning
                display: "flex",
                alignItems: "flex-start", // Align title to top of container
                mb: 1, // Add margin bottom for spacing
              }}
            >
              {showTooltip ? (
                <Tooltip title={selectedContent?.name} arrow placement="top">
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
                    {selectedContent?.name}
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
                  {selectedContent?.name}
                </Typography>
              )}
            </Box>
            {!isShort && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <LanguageComponet
                  langaugeName={selectedContent?.language?.name}
                  contentLanguages={contentLanguages}
                  contentDetails={video?.content_details}
                  setSelectedContent={setSelectedContent}
                  section={section}
                  video={video}
                  selectedContent={selectedContent}
                  tooltipOffset={tooltipOffset}
                  languageButtonRef={languageButtonRef}
                />
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
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
                          isDarkMode
                            ? whatsappConfig.colors?.normal
                            : "grey.500"
                        }
                        hoverTextColor={
                          isDarkMode ? whatsappConfig.colors?.hover : "#111"
                        }
                      />
                    )}

                    {isFeatureEnabled("enableCopyLink") && (
                      <CopyButton
                        color={isCopyHovered ? "#fff" : ""}
                        text={`${shareMessage} ${video?.content_details[0]?.url}`}
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
            )}
          </CardContent>
        )}
      </Card>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        url={shareUrl}
        title={selectedContent?.name}
        videoUrl={selectedContent?.url}
      />
    </>
  );
};

export default GridCard;
