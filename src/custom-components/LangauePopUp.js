import { Typography } from "@mui/material";
import React from "react";

const LangauePopUp = ({
  languageList,
  contentDetails,
  setSelectedContent,
  setShowLanguages,
}) => {
  return languageList.length > 0 ? (
    languageList.map((lang) => (
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
    ))
  ) : (
    <></>
  );
};

export default LangauePopUp;
