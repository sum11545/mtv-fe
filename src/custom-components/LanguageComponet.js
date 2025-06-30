import { fontSize, fontStyles } from "@/theme/theme";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import LangauePopUp from "./LangauePopUp";

export const LanguageComponet = ({
  langaugeName,
  contentLanguages = [],
  contentDetails,
  setSelectedContent,
}) => {
  const [showLanguages, setShowLanguages] = useState(false);
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          sx={{
            ...fontStyles.montserrat.regular,
            padding: {
              xl: "7px 12px",
              lg: "4px 20px",
              xs: "4px 20px",
            },
            fontSize: {
              xl: fontSize.typography.h6,
              lg: fontSize.typography.caption,
              xs: fontSize.typography.caption,
            },
            backgroundColor: theme.palette.background.language,
            borderRadius: "8px",
          }}
          component="span"
        >
          {langaugeName}
        </Typography>
        {contentLanguages.length > 1 && (
          <>
            <Box
              component={"span"}
              onClick={() => setShowLanguages(true)}
              sx={{
                borderRadius: "1rem",
                border: `1px solid ${theme.palette.custom.languageCountBorder}`,
                fontSize: {
                  xl: fontSize.typography.h6,
                  lg: fontSize.typography.body1,
                  xs: fontSize.typography.body1,
                },
                padding: {
                  xl: "7px",
                  lg: "2px 10px",
                  sm: "2px 10px",
                  xs: "2px 10px",
                },
                fontWeight: "bold",
                position: "relative",
                ml: "4px",
                ...(showLanguages && {
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: `7px solid ${theme.palette.custom.languageCountBorder}`,
                    left: "50%",
                    top: "-27%",
                    transform: "translateX(-50%)",
                    zIndex: 100,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: `6px solid ${theme.palette.background.paper}`,
                    left: "50%",
                    top: "calc(100% + 1px)", // Slight offset to sit inside black stroke
                    transform: "translateX(-50%)",
                    zIndex: 101,
                  },
                }),
              }}
            >
              +{contentLanguages.length}
            </Box>
            {showLanguages && (
              <Box
                sx={{
                  position: "absolute",
                  top: "33%",
                  zIndex: 100,
                  border: `1px solid ${theme.palette.custom.languageCountBorder}`,
                  display: "flex",
                  justifyContent: "space-evenly",
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.3)",
                  borderRadius: "5px",
                  flexWrap: "wrap",
                  height: "25px",
                  overflow: "hidden",
                }}
                onMouseLeave={(e) => {
                  e.preventDefault();
                  setShowLanguages(false);
                }}
              >
                <LangauePopUp
                  languageList={contentLanguages}
                  contentDetails={contentDetails}
                  setSelectedContent={setSelectedContent}
                  setShowLanguages={setShowLanguages}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};
