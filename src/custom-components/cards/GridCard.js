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
  useMediaQuery,
  Snackbar,
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
import Image from "next/image";
import ShareShortMobileIcon from "@/components/icons/ShareShortMobileIcon";
import { ShortCopyMobileIcon } from "@/components/icons/ShortCopyMobileIcon";
import ShortWhatsAppMobileIcon from "@/components/icons/ShortWhatsAppMobileIcon";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
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
    snackbarDuration,
  } = useContent();

  const [isHovered, setIsHovered] = useState(false);

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
    setShareDialogOpen(true);
  };

  const handleWhatsApp = (e) => {
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

        // if we get guest name or organization name then adding that in the url else not.
        const OrgGuest = (video?.org_guest_url || "").replace(/^\/|\/$/g, "");

        const fullPath = `/shorts/${section?.slug}${
          OrgGuest ? `/${OrgGuest}` : ""
        }/${shortId}`;

        router.push(fullPath);
      } else {
        // If content type is not short then i am redirecting it to dynamic section/contentId page i.e. video detail page

        // Find the section this video belongs to
        // console.log(section?.slug);
        // If we're in a section list page, use the section prop directly
        if (section?.slug && video?.id) {
          // if we get guest name or organization name then adding that in the url else not.
          const OrgGuest = (video?.org_guest_url || "").replace(/^\/|\/$/g, "");

          const fullPath = `/${section.slug}${OrgGuest ? `/${OrgGuest}` : ""}/${
            video.id
          }`;

          router.push({
            pathname: fullPath,
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
          // if we get guest name or organization name then adding that in the url else not.
          const OrgGuest = (video?.org_guest_url || "").replace(/^\/|\/$/g, "");

          const fullPath = `/${foundSection.slug}${
            OrgGuest ? `/${OrgGuest}` : ""
          }/${video.id}`;

          router.push({
            pathname: fullPath,
            query: {
              language: selectedContent?.language?.id,
            },
          });
        }
      }
    }
  };
  const getThumbnailUrl = () => {
    const details = selectedContent;
    if (!details || details.platform !== "PY")
      return "/images/404-not-found.jpg";

    // If backend already provides a thumbnail, use it
    if (details.thumbnail_url) {
      return details.thumbnail_url;
    }

    // else use youtubes URL
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const successMessage = getSuccessMessage("linkCopied");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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

  const handleCopy = () => {
    let text = `${shareMessage} ${selectedContent?.url}`;
    navigator.clipboard?.writeText(text);
    setSnackbarOpen(true);
  };

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
          mb: !isMobile && isAd && 2,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
            // aspectRatio: "9/16",
            // if we give aspectRatio to shorts and remove the above height then the thumbnail showing extra
            // spaces gets resolved but the problem is it doesn't take height and width from design
            position: "relative",
            ...(isShort &&
              isMobile && {
                aspectRatio: "9/16",
                maxWidth: "210px",
                mx: "auto",
                width: "210px",
                borderRadius: "12px",
                overflow: "hidden",
              }),
          }}
        >
          {/* if my content is ad then i am showing ad card */}
          {isAd ? (
            <AdCard ad={video} />
          ) : (
            <>
              <Image
                src={getThumbnailUrl()}
                alt={selectedContent?.name}
                fill
                style={{
                  borderRadius: "12px",
                  objectFit: isShort ? "cover" : "fill",
                }}
                priority
              />

              {isShort && (
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
                        height={isXl ? "32px" : "23px"}
                        width={isXl ? "32px" : "23px"}
                        onClick={handleCardClick}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </Box>

                  <Box sx={{ pb: 0.2, marginLeft: "auto", pr: 0.2 }}>
                    <MobileActionButton
                      icon={
                        <ShortWhatsAppMobileIcon
                          height={isXl ? "35px" : "25px"}
                          width={isXl ? "35px" : "25px"}
                        />
                      }
                      onClick={handleWhatsApp}
                      label="WhatsApp"
                    />
                    <MobileActionButton
                      icon={
                        <ShortCopyMobileIcon
                          height={isXl ? "35px" : "25px"}
                          width={isXl ? "35px" : "25px"}
                        />
                      }
                      onClick={handleCopy}
                      label="Copy"
                      isCopyButton={true}
                    />
                    <MobileActionButton
                      icon={
                        <ShareShortMobileIcon
                          height={isXl ? "35px" : "25px"}
                          width={isXl ? "35px" : "25px"}
                        />
                      }
                      onClick={handleShare}
                      label="Share"
                    />
                  </Box>
                </Box>
              )}
            </>
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
              maxWidth: isShort && isMobile ? "210px" : "none",
              mx: isShort && isMobile ? "auto" : "none",
              "&:last-child": {
                paddingBottom: 1.5,
              },
            }}
          >
            <Box
              sx={{
                minHeight: isShort && isMobile ? "auto" : "3em", // Fixed height to ensure consistent button positioning
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

export default GridCard;
