import { useState, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import GridCard from "../cards/GridCard";
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { fontSize, fontStyles, palette } from "../../theme/theme";
import StackVideoCard from "../cards/StackVideoCard";
import ArrowIcon from "@/components/icons/ArrowIcon";
import { DynamicIcon } from "@/components/icons";
import { useContent } from "@/hooks/useContent";
import CustomTooltip from "../CustomTooltip";

const GridLayout = ({
  name,
  contents,
  id,
  sectionData,
  section,
  sectionIndex,
  bgColor,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm")); // 600px - 899.99px
  const isMd = useMediaQuery(theme.breakpoints.only("md")); // 900px - 1199.99px
  const isLg = useMediaQuery(theme.breakpoints.only("lg")); // 1200px - 1535.99px
  const isLgPlus = useMediaQuery(theme.breakpoints.up("lgPlus")); //  1500px - 1920px
  const isXl = useMediaQuery(theme.breakpoints.up("xl")); // >= 1920
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { getButtonLabel, getButtonConfig, getColor, isDarkMode } =
    useContent();
  const isAd = section?.is_ad;

  const isShort =
    sectionData[0]?.contents[0]?.content_details[0]?.content_type_id == "CTSR";

  // for alternate background color issue
  // here i am giving direct values of how much content should be visible in each row so whenever
  // you are changing grid size make changes here as well otherwise you won't get bg color row wise
  const getItemsPerRow = () => {
    if (isMobile) return 1;
    if (isSm) return isShort ? 6 : 2;
    if (isMd) return isShort ? 4 : 3;
    if (isLg) return isShort ? 2.4 : 4;
    if (isXl) return isShort ? 2.4 : 4;
    if (isLgPlus) return isShort ? 2.4 : 4;
    return isShort ? 2.4 : 3; // fallback
  };

  // for alternate background color issue
  // Function to group contents into rows
  const groupIntoRows = (contents) => {
    const itemsPerRow = getItemsPerRow();
    const rows = [];
    let currentRow = [];

    contents.forEach((content, index) => {
      if (content.type === "section") {
        // If we have items in current row, push it first
        if (currentRow.length > 0) {
          rows.push({ type: "row", items: currentRow });
          currentRow = [];
        }
        // Add section as a standalone item
        rows.push({ type: "section", content: content });
      } else {
        // Add content/ad_content to current row
        currentRow.push(content);

        // If current row is full or this is the last item, push the row
        if (
          currentRow.length === itemsPerRow ||
          index === contents.length - 1
        ) {
          rows.push({ type: "row", items: currentRow });
          currentRow = [];
        }
      }
    });

    return rows;
  };

  // Function to get row background color // for alternate background color issue
  const getRowBackgroundColor = (rowIndex) => {
    if (isAd || isMobile) return theme.palette.background.default;

    if (router.pathname === "/[section]") {
      // For section pages, just alternate based on row index only
      if (rowIndex % 2 === 0) {
        return theme.palette.background.default;
      } else {
        return theme.palette.background.sectionBg;
      }
    }

    return theme.palette.background.default;
  };

  // for alternate background color issue
  // Group all contents into rows maintaining original order
  const groupedContent = groupIntoRows(section.contents);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const scrollAmount =
        direction === "left" ? -containerWidth : containerWidth;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleViewMore = () => {
    // Find the section by index to get its slug
    let currentSection = sectionData.find((item) => item.id == section.id);
    if (currentSection && currentSection.slug) {
      // storing current section name in session storage inorder to access and show in back to button text in layout file
      sessionStorage.setItem("sectionName", currentSection.name);
      router.push(`/${currentSection.slug}`);
    }
  };

  return (
    <Box
      sx={{
        background: bgColor,
        px: router.pathname == "/" ? 2.5 : "", // for alternate background color issue
        pb: {
          md: 0,
          xs: router.pathname === "/" ? "25px" : 0,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: {
            xl: isAd ? "1rem" : "1.5625rem", // 16px : 25px
            lg: isAd ? "0.7rem" : "0.9375rem", // 11.2px : 15px
            xs: isAd ? "0.75rem" : "1.25rem", // 12px : 20px
          },
          pt: {
            xl: "1.5625rem", // 25px
            lg: "0.9375rem", // 15px
            xs: "1.25rem", // 20px
          },
        }}
      >
        <Box
          sx={{
            flex: isMobile ? "1 1 auto" : "0 1 auto",
            minWidth: 0,
            width: isMobile ? "calc(100% - 120px)" : "calc(100% - 150px)",
            px: router.pathname === "/[section]" ? 2.5 : "", // for alternate background color issue
          }}
        >
          <CustomTooltip text={section.name}>
            <Typography
              component={isAd ? "h4" : "h1"}
              sx={{
                color: isAd
                  ? theme.palette.custom.advertisementColor
                  : "primary.main",
                fontFamily: isAd
                  ? fontStyles.openSans.bold
                  : fontStyles.montserrat.bold,
                marginLeft: "10px",
                typography: isAd ? "advertisementTitle" : "sectionTitle",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                display: "inline",
              }}
            >
              {section.name}
            </Typography>
          </CustomTooltip>
        </Box>

        {/* for mobile device showing sponsor name next to section name instead of inside card */}
        {isAd &&
          isMobile &&
          (() => {
            const sponsor = section.contents?.find(
              (c) => c?.content_details?.[0]?.sponsor_name
            )?.content_details?.[0]?.sponsor_name;

            return (
              sponsor && (
                <Typography
                  variant="adSponsored"
                  sx={{
                    lineHeight: 1.1,
                    color: theme.palette.custom.adText,
                    ...fontStyles.montserrat.regular,
                    fontStyle: "italic",
                  }}
                >
                  {sponsor}
                </Typography>
              )
            );
          })()}

        {/* showing view more button only in home page(/ means home page) and also if the total content is greater then current content */}
        {section.total_contents > section.contents.length &&
          router?.pathname === "/" &&
          section.is_ad === false && (
            <Button
              // endIcon={<ArrowIcon />}
              endIcon={
                <DynamicIcon
                  keyword={isHovered ? "ARROW-YELLOW" : "ARROW"}
                  height={"15px"}
                  width={"15px"}
                  style={{
                    color: isDarkMode
                      ? isHovered
                        ? ""
                        : "#fff"
                      : isHovered
                      ? "black"
                      : "",
                  }}
                />
              }
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              sx={{
                textTransform: "none",
                ...fontStyles.openSans.regular,
                color: isDarkMode ? "#fff" : getColor("primary"),
                "&:hover": {
                  bgcolor: "transparent",
                  color: isDarkMode ? getColor("secondary") : "common.black",
                  "& .MuiButton-endIcon": {
                    transform: "translateX(5px)",
                    transition: "transform 0.3s ease-in-out",
                  },
                },
                "& .MuiButton-endIcon": {
                  transition: "transform 0.3s ease-in-out",
                },
                typography: "viewMoreLabel",
              }}
              onClick={handleViewMore}
            >
              {isMobile ? "" : getButtonLabel("viewMore")}
            </Button>
          )}
      </Box>

      {/* // for alternate background color issue */}
      {/* Conditional rendering based on route*/}
      {router.pathname === "/[section]" ? (
        // Section page: Use row-based grouping with background colors
        groupedContent.map((group, groupIndex) => {
          if (group.type === "row") {
            // Count only row groups for background color calculation
            const rowIndex =
              groupedContent
                .slice(0, groupIndex + 1)
                .filter((g) => g.type === "row").length - 1;

            return (
              <Box
                key={`row-${groupIndex}`}
                sx={{
                  backgroundColor: getRowBackgroundColor(rowIndex),
                  mb: groupIndex < groupedContent.length - 1 ? 2 : 0,
                  px: router.pathname === "/[section]" ? 2.5 : "", // for alternate background color issue
                }}
              >
                <Grid container spacing={2}>
                  {group.items.map((video, itemIndex) => {
                    return (
                      <Grid
                        item
                        key={video.id}
                        lg={isShort ? 2.4 : 3}
                        xl={isShort ? 2.4 : 3}
                        lgPlus={isShort ? 2.4 : 3}
                        md={4}
                        sm={6}
                        xs={12}
                      >
                        {itemIndex !== 0 &&
                        router.pathname === "/" &&
                        video.type !== "ad_content" &&
                        isMobile ? (
                          <StackVideoCard
                            video={video}
                            id={section.id}
                            sectionData={sectionData}
                            section={section}
                            showLanguageComponent={true}
                            isMobile={isMobile}
                          />
                        ) : (
                          <GridCard
                            video={video}
                            id={section.id}
                            sectionData={sectionData}
                            section={section}
                          />
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            );
          } else if (group.type === "section") {
            // if the section is Advertisement
            const video = group.content;
            return (
              <Grid
                container
                spacing={2}
                key={`section-${groupIndex}`}
                sx={{
                  mb: 2,
                  px: router.pathname === "/[section]" ? 2.5 : "", // for alternate background color issue
                }}
              >
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    {/* Section Title */}
                    <Box
                      sx={{
                        flex: "1 1 auto",
                        minWidth: 0,
                        width: isMobile
                          ? "calc(100% - 120px)"
                          : "calc(100% - 150px)",
                      }}
                    >
                      <CustomTooltip text={video.name}>
                        <Typography
                          component={video.is_ad ? "h4" : "h1"}
                          variant={
                            video.is_ad ? "advertisementTitle" : "sectionTitle"
                          }
                          sx={{
                            color: video.is_ad
                              ? theme.palette.custom.advertisementColor
                              : "primary.main",
                            fontFamily: video.is_ad
                              ? { ...fontStyles.openSans.bold }
                              : { ...fontStyles.montserrat.bold },
                          }}
                        >
                          {video.name}
                        </Typography>
                      </CustomTooltip>
                    </Box>

                    {/* for mobile device showing sponsor name next to section name instead of inside card for nested sections */}
                    {video.is_ad &&
                      isMobile &&
                      (() => {
                        const sponsor = video.contents?.find(
                          (c) => c?.content_details?.[0]?.sponsor_name
                        )?.content_details?.[0]?.sponsor_name;

                        return (
                          sponsor && (
                            <Typography
                              variant="adSponsored"
                              sx={{
                                lineHeight: 1.1,
                                color: theme.palette.custom.adText,
                                ...fontStyles.montserrat.regular,
                                fontStyle: "italic",
                              }}
                            >
                              {sponsor}
                            </Typography>
                          )
                        );
                      })()}
                  </Box>

                  {/* Section Grid Content */}
                  <Grid container spacing={0}>
                    {video.contents.map((vid) => (
                      <Grid
                        item
                        key={vid.id}
                        lg={6}
                        xl={6}
                        md={6}
                        sm={6}
                        xs={12}
                      >
                        <GridCard
                          video={vid}
                          id={video.id}
                          sectionData={video}
                          section={video}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            );
          }

          return null;
        })
      ) : (
        // Home page: Use original rendering logic
        <Grid container spacing={!isAd && 2}>
          {section.contents.map((video, index) => {
            if (video.type === "content" || video.type === "ad_content") {
              return (
                <Grid
                  item
                  key={video.id}
                  lg={video.type == "ad_content" ? 6 : 3}
                  xl={video.type == "ad_content" ? 6 : 3}
                  md={video.type == "ad_content" ? 6 : 4}
                  sm={6}
                  xs={12}
                >
                  {index !== 0 &&
                  router.pathname === "/" &&
                  video.type !== "ad_content" &&
                  isMobile ? (
                    <StackVideoCard
                      video={video}
                      id={section.id}
                      sectionData={sectionData}
                      section={section}
                      showLanguageComponent={true}
                      isMobile={isMobile}
                    />
                  ) : (
                    <GridCard
                      video={video}
                      id={section.id}
                      sectionData={sectionData}
                      section={section}
                    />
                  )}
                </Grid>
              );
            } else if (video.type === "section") {
              return (
                <Grid item key={video.id} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 1.5,
                    }}
                  >
                    {/* Section Title */}
                    <Box
                      sx={{
                        flex: "1 1 auto",
                        minWidth: 0,
                        width: isMobile
                          ? "calc(100% - 120px)"
                          : "calc(100% - 150px)",
                      }}
                    >
                      <CustomTooltip text={video.name}>
                        <Typography
                          variant={
                            video.is_ad ? "advertisementTitle" : "sectionTitle"
                          }
                          sx={{
                            color: video.is_ad
                              ? theme.palette.custom.advertisementColor
                              : "primary.main",
                            fontFamily: video.is_ad
                              ? { ...fontStyles.openSans.bold }
                              : { ...fontStyles.montserrat.bold },
                          }}
                        >
                          {video.name}
                        </Typography>
                      </CustomTooltip>
                    </Box>

                    {/* for mobile device showing sponsor name next to section name instead of inside card for nested sections */}
                    {video.is_ad &&
                      isMobile &&
                      (() => {
                        const sponsor = video.contents?.find(
                          (c) => c?.content_details?.[0]?.sponsor_name
                        )?.content_details?.[0]?.sponsor_name;

                        return (
                          sponsor && (
                            <Typography
                              variant="adSponsored"
                              sx={{
                                lineHeight: 1.1,
                                color: theme.palette.custom.adText,
                                ...fontStyles.montserrat.regular,
                                fontStyle: "italic",
                              }}
                            >
                              {sponsor}
                            </Typography>
                          )
                        );
                      })()}
                  </Box>

                  {/* Section Grid Content */}
                  <Grid container spacing={0}>
                    {video.contents.map((vid) => (
                      <Grid
                        item
                        key={vid.id}
                        lg={vid.type == "ad_content" ? 6 : 3}
                        xl={vid.type == "ad_content" ? 6 : 3}
                        md={vid.type == "ad_content" ? 6 : 4}
                        sm={6}
                        xs={12}
                      >
                        <GridCard
                          video={vid}
                          id={video.id}
                          sectionData={video}
                          section={video}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              );
            } else {
              return <></>;
            }
          })}
        </Grid>
      )}
    </Box>
  );
};

export default GridLayout;
