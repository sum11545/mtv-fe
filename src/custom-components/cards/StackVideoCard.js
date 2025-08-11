import { fontSize, fontStyles } from "@/theme/theme";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { LanguageComponet } from "../LanguageComponet";

const StackVideoCard = ({
  video,
  sectionData,
  section,
  id,
  showLanguageComponent = false,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const dims = theme.customDimensionsForStackCard;
  const textRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const [selectedContent, setSelectedContent] = useState(
    video?.content_details[0]
  );
  const contentLanguages = video?.content_details?.map((v) => {
    return { ...v.language, content_id: v.id };
  });

  // Check if text is truncated (has ellipsis)
  useEffect(() => {
    if (textRef.current && video?.content_details[0]?.name) {
      const element = textRef.current;
      const isOverflowing = element.scrollHeight > element.clientHeight;
      setShowTooltip(isOverflowing);
    }
  }, [video?.content_details[0]?.name]);

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
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : "/images/404-not-found.jpg";
  };

  const handleCardClick = () => {
    // if video type is ad then don't redirect it to any ad url
    if (video.type == "ad_content") {
      window.open(selectedContent?.cta_url, "_blank");
    } else {
      let isShort = selectedContent?.content_type_id == "CTSR"; // CTSR is for shorts.

      // If content type is short then redirect to static shorts/id page
      if (isShort) {
        let shortId = video?.id;

        // if we get guest name or organization name then adding that in the url else not.
        const OrgGuest = (video?.org_guest_url || "").replace(/^\/|\/$/g, "");

        const fullPath = `/shorts/${section?.slug}${
          OrgGuest ? `/${OrgGuest}` : ""
        }/${shortId}`;

        router.push(fullPath);
      } else {
        // If content type is not short then redirect to dynamic section/contentId page

        // If we're in a section list page, use the section prop directly
        if (section?.slug && selectedContent?.language?.id) {
          // if we get guest name or organization name then adding that in the url else not.
          const OrgGuest = (video?.org_guest_url || "").replace(/^\/|\/$/g, "");

          const fullPath = `/${section.slug}${OrgGuest ? `/${OrgGuest}` : ""}/${
            video.id
          }`;

          // Navigate to that page with query params (e.g., language)
          router.push({
            pathname: fullPath,
            query: {
              language: selectedContent?.language?.id,
            },
          });
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
          // if we get guest name or organization name then adding that in the url else not.
          const OrgGuest = (video?.org_guest_url || "").replace(/^\/|\/$/g, "");

          const fullPath = `/${foundSection.slug}${
            OrgGuest ? `/${OrgGuest}` : ""
          }/${video.id}`;

          // Navigate to that page with query params (e.g., language)
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
        width: "100%",
      }}
      onClick={() => handleCardClick()}
    >
      <Box
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
          position: "relative",
        }}
      >
        <Box
          component={"img"}
          src={getThumbnailUrl()}
          alt={selectedContent.name}
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          flex: 1,
          // minWidth: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            py: 0.5,
            overflow: "hidden",
            // minWidth: 0,
          }}
        >
          <Tooltip
            title={showTooltip ? selectedContent?.name : ""}
            arrow
            placement="bottom"
          >
            <Typography
              variant="stackCardVideoTitle"
              component={"h2"}
              ref={textRef}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                lineHeight: 1.2,
                mb: 0.5,
                color: (theme) =>
                  theme.palette.mode === "light" ? "black" : "inherit",
                ...fontStyles.openSans.bold,
              }}
            >
              {selectedContent?.name}
            </Typography>
          </Tooltip>
        </Box>

        {showLanguageComponent ? (
          <LanguageComponet
            contentDetails={video?.content_details}
            langaugeName={selectedContent?.language?.name}
            setSelectedContent={setSelectedContent}
            contentLanguages={contentLanguages}
            section={section}
            video={video}
            selectedContent={selectedContent}
          />
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default StackVideoCard;
