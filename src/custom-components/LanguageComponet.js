import { fontSize, fontStyles } from "@/theme/theme";
import {
  Box,
  Modal,
  Popper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// For mobile device showing this popup
const LanguagePopUp = ({
  languageList,
  contentDetails,
  setShowLanguages,
  selectedContent,
  handleLanguageSelect,
}) => {
  const theme = useTheme();

  // custom font family for language for making selected language bold because Montserrat doesn't supports bold
  // weights for certain non-Latin scripts like Tamil, Bengali, Kannada, Marathi, Telugu, Gujarati, or Hindi
  const getFontFamily = (langId) => {
    switch (langId) {
      case "LTN":
        return "'Noto Sans Tamil', sans-serif";
      case "LBE":
        return "'Noto Sans Bengali', sans-serif";
      case "LKA":
        return "'Noto Sans Kannada', sans-serif";
      case "LMAR":
      case "LHI":
        return "'Noto Sans Devanagari', sans-serif";
      case "LTL":
        return "'Noto Sans Telugu', sans-serif";
      case "LGJ":
        return "'Noto Sans Gujarati', sans-serif";
      case "LEN":
        return "'Open Sans', sans-serif";
      default:
        return "'Open Sans', sans-serif";
    }
  };

  return languageList.length > 0 ? (
    <Modal
      open={true}
      onClose={() => setShowLanguages(false)}
      hideBackdrop={true}
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          // borderRadius: "16px 16px 0 0",
          width: "100%",
          maxHeight: "60vh",
          overflow: "hidden",
          position: "relative",
          border: "none",
          outline: "none",
          boxShadow: "0px -4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 20px",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: theme.palette.text.primary,
            }}
          >
            Select Language
          </Typography>
          <IconButton
            onClick={() => setShowLanguages(false)}
            size="small"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box> */}

        {/* Language List */}
        <Box
          sx={{
            maxHeight: "calc(60vh - 80px)",
            overflowY: "auto",
            padding: "8px 0",
          }}
        >
          {languageList.map((lang, idx) => {
            const content = contentDetails?.find(
              (item) => item.id === lang.content_id
            );
            const isSelected =
              selectedContent?.id === content?.id ||
              selectedContent?.language?.id === content?.language?.id;

            return (
              <Box
                key={lang.id}
                component="button"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLanguageSelect(lang);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleLanguageSelect(lang);
                }}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 25px",
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                  width: "100%",
                  textAlign: "left",
                  userSelect: "none",
                  WebkitTapHighlightColor: "transparent",
                  touchAction: "manipulation",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                  "&:active": {
                    backgroundColor: theme.palette.action.selected,
                  },
                  "&:focus": {
                    outline: "none",
                    backgroundColor: theme.palette.action.hover,
                  },
                  borderBottom:
                    idx === languageList.length - 1
                      ? "none"
                      : `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography
                  sx={{
                    typography: "languageOptionText",
                    fontFamily: getFontFamily(lang.id),
                    fontWeight: isSelected ? 700 : 400,
                    color: theme.palette.text.primary,
                  }}
                >
                  {lang?.name}
                </Typography>

                {/* Check icon for selected language only */}
                {isSelected && (
                  <CheckIcon
                    sx={{
                      p: 0.5,
                      color: theme.palette.background.paper,
                      background: theme.palette.primary.main,
                      borderRadius: "50%",
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Modal>
  ) : (
    <></>
  );
};

export const LanguageComponet = ({
  langaugeName,
  contentLanguages = [],
  contentDetails,
  setSelectedContent,
  section,
  video,
  selectedContent,
  tooltipOffset = 0,
  languageButtonRef,
}) => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  // Handle button click
  const handleButtonClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      setShowLanguages(!showLanguages);
    }
  };

  // Determine border color based on state
  const getBorderColor = () => {
    if (showLanguages || isHovered) {
      return theme.palette.custom.languageCountBorder;
    }
    return theme.palette.divider;
  };

  const handleLanguageSelect = (lang) => {
    const content = contentDetails?.find((item) => item.id === lang.content_id);
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
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
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
              backgroundColor: theme.palette.background.language,
              borderRadius: "8px",
            }}
            component="span"
            variant="languageText"
          >
            {langaugeName}
          </Typography>
          {contentLanguages.length > 1 &&
            // For mobile device, showing LanguagePopUp component
            (isMobile ? (
              <Box
                onClick={handleButtonClick}
                sx={{
                  display: "inline-block",
                  borderRadius: "50%",
                  border: `1px solid ${getBorderColor()}`,
                  fontSize: {
                    xl: fontSize.typography.h6,
                    lg: fontSize.typography.body1,
                    xs: fontSize.typography.body1,
                  },
                  padding: {
                    xl: "6px 10px",
                    lg: "1px 5px",
                    sm: "1px 5px",
                    xs: "1px 5px",
                  },
                  fontWeight: "bold",
                  position: "relative",
                  ml: "4px",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease",
                }}
              >
                +{contentLanguages.length}
                {showLanguages && (
                  <LanguagePopUp
                    languageList={contentLanguages}
                    contentDetails={contentDetails}
                    setSelectedContent={setSelectedContent}
                    setShowLanguages={setShowLanguages}
                    section={section}
                    video={video}
                    selectedContent={selectedContent}
                    handleLanguageSelect={handleLanguageSelect}
                  />
                )}
              </Box>
            ) : (
              // for large device, showing tooltip
              <Tooltip
                placement="top-start" // align to the start (left side)
                arrow
                title={
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: 1,
                      whiteSpace: "nowrap",
                      overflowX: "auto",
                      maxWidth: 300,
                      "&::-webkit-scrollbar": {
                        display: "none", // Chrome, Safari
                      },
                      scrollbarWidth: "none", // Firefox
                      msOverflowStyle: "none",
                    }}
                  >
                    {contentLanguages?.map((lang, idx) => (
                      <Typography
                        key={idx}
                        variant="languageOptionTextLarge"
                        onClick={() => handleLanguageSelect(lang)}
                        sx={{
                          cursor: "pointer",
                          ...fontStyles.openSans.regular,
                        }}
                      >
                        {lang?.name}
                      </Typography>
                    ))}
                  </Box>
                }
                componentsProps={{
                  tooltip: {
                    sx: {
                      backgroundColor: "#fff",
                      color: "#000",
                      border: "1px solid #000",
                      boxShadow: 2,
                      maxWidth: "unset",
                      "& .MuiTooltip-arrow": {
                        "&::before": {
                          backgroundColor: "#fff", // fill color
                          border: "1px solid #000", // border around the arrow
                          transform: "rotate(45deg)",
                        },
                      },
                    },
                  },
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          // if we want the tooltip to always start from the start of the grid card then use below code
                          // offset: [
                          //   tooltipOffset ||
                          //     (contentLanguages?.length > 3 ? -70 : -50), // Use calculated offset or fallback
                          //   -8, // adjusts tooltip position vertically
                          // ],
                          offset: [
                            contentLanguages?.length > 3 ? tooltipOffset : -50, // Use calculated offset or fallback
                            -8, // adjusts tooltip position vertically
                          ],
                        },
                      },
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "viewport",
                        },
                      },
                    ],
                  },
                }}
              >
                {/* Trigger Button */}
                <Box
                  ref={languageButtonRef}
                  component="span"
                  sx={{
                    display: "inline-block",
                    borderRadius: "50%",
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: {
                      xl: fontSize.typography.h6,
                      lg: fontSize.typography.body1,
                      xs: fontSize.typography.body1,
                    },
                    padding: {
                      xl: "6px 10px",
                      lg: "1px 5px",
                      sm: "1px 5px",
                      xs: "1px 5px",
                    },
                    fontWeight: "bold",
                    // position: "relative",
                    ml: "4px",
                    cursor: "pointer",
                    transition: "border-color 0.2s ease",
                    "&:hover": {
                      borderColor: theme.palette.custom.languageCountBorder,
                    },
                  }}
                >
                  +{contentLanguages.length}
                </Box>
              </Tooltip>
            ))}
        </Box>
      </Box>
    </>
  );
};
