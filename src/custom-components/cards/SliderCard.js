import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  useTheme,
  IconButton,
  Snackbar,
  useMediaQuery,
  Typography,
  Tooltip,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMain } from "@/context/MainContext";
import { fontSize } from "@/theme/theme";
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
  const [formattedDate, setFormattedDate] = useState("recently");
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const dims = theme.customDimensionForSliderCard;

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

    const url = details.url;
    let videoId = "";

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
  useEffect(() => {
    setMounted(true);
    try {
      const date = formatDistanceToNow(new Date(short.uploadDate), {
        addSuffix: true,
      });
      setFormattedDate(date);
    } catch (error) {
      setFormattedDate("recently");
    }
  }, [short.uploadDate]);

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
          <CardMedia
            component="img"
            image={getThumbnailUrl()}
            alt={short.name}
            sx={{
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Copy Icon - Top Right (visible on hover) */}
          {/* {isHovered && (
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "50%",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DynamicIcon
                keyword="ENLARGE"
                height="16px"
                width="16px"
                style={{ color: "#666" }}
              />
            </Box>
          )} */}
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

      {/* <ShareDialog
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
      /> */}
    </>
  );
};

export default SliderCard;
