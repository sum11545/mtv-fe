import { fontSize } from "@/theme/theme";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const LangauePopUp = ({
  languageList,
  contentDetails,
  setSelectedContent,
  setShowLanguages,
}) => {
  const theme = useTheme();
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
          }}
          key={lang.id}
        >
          {lang.name}
        </Typography>
      ))}
    </Box>
  ) : (
    <></>
  );
};

export default LangauePopUp;
