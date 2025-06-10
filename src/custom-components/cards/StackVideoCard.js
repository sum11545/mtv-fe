import { fontSize, fontStyles } from "@/theme/theme";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const StackVideoCard = ({ video, layout }) => {
  console.log({ layout });
  return (
    <>
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
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Box
          component={"img"}
          src={video?.content_details[0]?.thumbnail_url}
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
              theme.palette.mode === "light" ? "black" : "inherit",
            ...fontStyles.openSans.bold,
          }}
        >
          {video?.name}
        </Typography>
      </Box>
    </>
  );
};

export default StackVideoCard;
