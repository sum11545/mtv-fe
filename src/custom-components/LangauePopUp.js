import { Box, Typography } from "@mui/material";
import React from "react";

const LangauePopUp = ({
  languageList,
  contentDetails,
  setSelectedContent,
  setShowLanguages,
}) => {
  return languageList.length > 0 ? (
    <Box
      sx={{
        position: "absolute",
        zIndex: 100,
        border: "1px solid #000",
        display: "flex",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
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
            fontSize: "0.75rem",
            cursor: "pointer",
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
