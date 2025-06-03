import { useState, useRef } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  Paper,
  Divider,
} from "@mui/material";

import { useRouter } from "next/router";
import { fontSize, fontStyles } from "../../theme/theme";

const StackLayout = ({ name, contents, id, sectionData, section }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const size = section.layout_config.size;
  const height = section?.layout_config?.height;
  const spacing = section?.layout_config?.spacing;

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          {section?.name}
        </Typography>
        <Stack spacing={2}>
          {section?.contents?.map((video) => (
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
                router.push(`/${section.slug}/${video.id}`);
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
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* <Divider sx={{ my: 1 }} /> */}
    </>
  );
};

export default StackLayout;
