import { fontSize, fontStyles } from "@/theme/theme";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

const StackVideoCard = ({ video, layout, sectionData, section, id }) => {
  const router = useRouter();
  
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

  const handleCardClick = () => {
    // if video type is ad then don't redirect it to any ad url
    if (video.type == "ad_content") {
      window.open(video.content_details[0]?.cta_url, "_blank");
    } else {
      let isShort = video?.content_details[0]?.content_type_id == "CTSR"; // CTSR is for shorts.
      
      // If content type is short then redirect to static shorts/id page
      if (isShort) {
        let shortId = video?.id;
        router.push(`/shorts/${shortId}`);
      } else {
        // If content type is not short then redirect to dynamic section/contentId page

        // If we're in a section list page, use the section prop directly
        if (section?.slug) {
          router.push(`/${section.slug}/${video.id}`);
          return;
        }

        // If we're in the home page, find the section from sectionData
        const foundSection = sectionData?.find((s, index) => {
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

  return (
    <Box 
      sx={{ 
        display: "flex", 
        gap: "0.75rem", 
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
          opacity: 0.8
        }
      }}
      onClick={handleCardClick}
    >
      <Box
        sx={{
          width: {
            xl: layout?.width?.xl || 100,
            lg: layout?.width?.lg || 100,
            md: layout?.width?.md || 100,
            sm: layout?.width?.sm || 100,
            xs: layout?.width?.xs || 100,
          },
          height: {
            xl: layout?.height?.xl || 50,
            lg: layout?.height?.lg || 50,
            md: layout?.height?.md || 50,
            sm: layout?.height?.sm || 50,
            xs: layout?.height?.xs || 50,
          },
          position: "relative",
        }}
      >
        <Box
          component={"img"}
          src={getThumbnailUrl()}
          alt={video.name}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      </Box>
      <Box
        sx={{ flex: 1, py: 0.5, overflow: "hidden", textOverflow: "ellipsis" }}
      >
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            lineHeight: 1.2,
            mb: 0.5,
            fontSize: fontSize.typography.caption,
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "inherit",
            ...fontStyles.openSans.bold,
          }}
        >
          {video?.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default StackVideoCard;
