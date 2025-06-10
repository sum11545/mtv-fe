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
import Image from "next/image";
import StackVideoCard from "../cards/StackVideoCard";

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
              <StackVideoCard video={video} layout={section?.layout_config} />
            </Paper>
          ))}
        </Stack>
      </Box>

      {/* <Divider sx={{ my: 1 }} /> */}
    </>
  );
};

export default StackLayout;
