import { fontSize, fontStyles } from "@/theme/theme";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import LangauePopUp from "../LangauePopUp";
import { LanguageComponet } from "../LanguageComponet";

const StackVideoCard = ({
  video,
  sectionData,
  section,
  id,
  showLanguageComponent = false,
}) => {
  const router = useRouter();
  const [selectedContent, setSelectedContent] = useState(
    video?.content_details[0]
  );
  const contentLanguages = video?.content_details?.map((v) => {
    return { ...v.language, content_id: v.id };
  });
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
          opacity: 0.8,
        },
      }}
      onClick={handleCardClick}
    >
      <Box
        sx={{
          width: {
            xl: 124,
            lg: 100,
            md: 100,
            sm: 124,
            xs: 124,
          },
          height: {
            xl: 70,
            lg: 50,
            md: 50,
            sm: 70,
            xs: 70,
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
          component="h2"
          variant="stackCardVideoTitle"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            wordBreak: "break-all",
            lineHeight: 1.2,
            mb: 0.5,
            color: (theme) =>
              theme.palette.mode === "light" ? "black" : "inherit",
            ...fontStyles.openSans.bold,
          }}
        >
          {video?.name}
        </Typography>
        {showLanguageComponent ? (
          <LanguageComponet
            contentDetails={video?.content_details}
            langaugeName={selectedContent?.language?.name}
            setSelectedContent={setSelectedContent}
            contentLanguages={contentLanguages}
          />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default StackVideoCard;
