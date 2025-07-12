import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  useTheme,
  IconButton,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useMain } from "@/context/MainContext";
import { fontSize, fontStyles } from "@/theme/theme";
import { DynamicIcon } from "@/components/icons";

const SliderCard = ({ short, sectionIndex, id, sectionData }) => {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState("recently");
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const dims = theme.customDimensionForSliderCard;

  let isShort = short?.content_details[0]?.content_type_id == "CTSR"; // CTSR  is for shorts.

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
        router.push(`/shorts/${shortId}`);
      } else {
        // If content type is not short then i am redirecting it to dynamic section/contentId page i.e. video detail page

        // Find the section this short belongs to
        const section = sectionData?.sections?.find((s, index) => {
          if (typeof sectionIndex === "number") {
            return index === sectionIndex;
          }
          return s.type === "shorts";
        });

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
            alt={short.title}
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
    </>
  );
};

export default SliderCard;
