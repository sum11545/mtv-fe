import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Stack,
  Paper,
  Divider,
  Tooltip,
} from "@mui/material";

import { useRouter } from "next/router";
import { fontSize, fontStyles } from "../../theme/theme";
import Image from "next/image";
import StackVideoCard from "../cards/StackVideoCard";

const StackLayout = ({ name, contents, id, sectionData, section }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showTooltip, setShowTooltip] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const isOverflowing =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setShowTooltip(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [section?.name]);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            px: { md: 2, lg: 2, xs: 1.5 },
            py: { md: 2, lg: 2, xs: 2 },
          }}
        >
          <Tooltip
            title={showTooltip ? section?.name || "" : ""}
            arrow
            placement="top"
          >
            <Typography
              ref={textRef}
              component="h1"
              variant="sectionTitleOfStackLayout"
              fontWeight="bold"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
                maxWidth: "100%",
                cursor: "pointer",
                ...fontStyles.openSans.bold,
              }}
            >
              {section?.name}
            </Typography>
          </Tooltip>
        </Box>
        <Stack spacing={2}>
          {section?.contents?.map((video, index, arr) => (
            <>
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
                  px: { md: 2, lg: 2, xs: "10px" },
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
                <StackVideoCard video={video} isMobile={isMobile} />
              </Paper>
              {index !== arr.length - 1 ? <Divider sx={{ my: 1 }} /> : <></>}
            </>
          ))}
        </Stack>
      </Box>

      {/* <Divider sx={{ my: 1 }} /> */}
    </>
  );
};

export default StackLayout;
