import { fontSize, fontStyles } from "@/theme/theme";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const StackVideoCard = ({ video, layout }) => {
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
    <Box sx={{ display: "flex", gap: "0.75rem", overflow: "hidden" }}>
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
