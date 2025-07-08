import { fontSize } from "@/theme/theme";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useRouter } from "next/router";

const LangauePopUp = ({
  languageList,
  contentDetails,
  setSelectedContent,
  setShowLanguages,
  section,
  video,
}) => {
  const theme = useTheme();
  const router = useRouter();

  return languageList.length > 0 ? (
    <Box
      sx={{
        position: "absolute",
        zIndex: 100,
        border: `1px solid ${theme.palette.custom.languageCountBorder}`,
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 8px #00000038",
        borderRadius: "5px",
        bottom: "120%",
      }}
      onMouseLeave={(e) => {
        e.preventDefault();
        setShowLanguages(false);
      }}
    >
      {languageList.map((lang) => (
        <Typography
          sx={{
            padding: "3px 5px",
            fontSize: {
              xl: fontSize.typography.caption,
              lg: fontSize.typography.overline,
            },
            cursor: "pointer",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black,
          }}
          onClick={() => {
            const content = contentDetails?.find(
              (item) => item.id === lang.content_id
            );
            setShowLanguages(false);
            setSelectedContent({
              ...content,
            });

            // Navigate to the video single view with the new language
            if (section?.slug) {
              router.push({
                pathname: `/${section.slug}/${video.id}`,
                query: {
                  language: content?.language?.id,
                },
              });
              return;
            } else {
              router.replace({
                pathname: router.pathname,
                query: {
                  ...router.query,
                  language: content?.language?.id,
                },
              });
            }
          }}
          key={lang.id}
        >
          {lang?.name}
        </Typography>
      ))}
    </Box>
  ) : (
    <></>
  );
};

export default LangauePopUp;
