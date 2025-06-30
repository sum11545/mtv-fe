import { fontSize, fontStyles } from "@/theme/theme";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import LangauePopUp from "./LangauePopUp";

export const LanguageComponet = ({
  langaugeName,
  contentLanguages = [],
  contentDetails,
  setSelectedContent,
}) => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  // if we click on language list, it shows the list but when we click anywhere then it should be closed.
  const containerRef = useRef(null);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowLanguages(false);
      }
    };

    if (showLanguages) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLanguages]);
  //

  // Determine border color based on state
  const getBorderColor = () => {
    if (showLanguages || isHovered) {
      return theme.palette.custom.languageCountBorder;
    }
    return theme.palette.divider;
  };

  return (
    <Box
      ref={containerRef}
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
              onClick={() => {
                setShowLanguages(true);
              }}
              onMouseEnter={() => {
                setIsHovered(true);
                setShowLanguages(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
              sx={{
                borderRadius: "1rem",
                border: `1px solid ${getBorderColor()}`,
                fontSize: {
                  xl: fontSize.typography.h6,
                  lg: fontSize.typography.body1,
                  xs: fontSize.typography.body1,
                },
                padding: {
                  xl: "5px",
                  lg: "2px 5px",
                  sm: "2px 5px",
                  xs: "2px 5px",
                },
                fontWeight: "bold",
                position: "relative",
                ml: "4px",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
                ...(showLanguages && {
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: 0,
                    height: 0,
                    borderLeft: "7px solid transparent",
                    borderRight: "7px solid transparent",
                    borderTop: `7px solid ${getBorderColor()}`,
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
                  border: `1px solid ${getBorderColor()}`,
                  display: "flex",
                  justifyContent: "space-evenly",
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: "0px 0px 8px rgba(0,0,0,0.3)",
                  borderRadius: "5px",
                  flexWrap: "wrap",
                  height: "25px",
                  overflow: "hidden",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={(e) => {
                  e.preventDefault();
                  setIsHovered(false);
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
