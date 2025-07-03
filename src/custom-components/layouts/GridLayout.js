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
  const isXl = useMediaQuery(theme.breakpoints.up("xl"));
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { getButtonLabel, getButtonConfig, getColor, isDarkMode } =
    useContent();
  const size = section.layout_config.size;
  const height = section?.layout_config?.height;
  const width = section?.layout_config?.width;
  const spacing = section?.layout_config?.spacing;
  const isAd = section?.is_ad;

  // for alternate background color issue
  const getItemsPerRow = () => {
    if (isMobile) return size.xs;
    if (isSm) return size.sm;
    if (isMd) return size.md;
    if (isLg) return size.lg;
    if (isXl) return size.xl;
    return size.xl; // fallback
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
    if (isAd || isMobile || isSm) return theme.palette.background.default;

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
            flex: "0 1 auto",
            minWidth: 0,
            width: isMobile ? "calc(100% - 120px)" : "calc(100% - 150px)",
            px: router.pathname === "/[section]" ? 2.5 : "", // for alternate background color issue
          }}
        >
          <CustomTooltip text={section.name}>
            <Typography
              variant={isAd ? "advertisementTitle" : "sectionTitle"}
              sx={{
                color: isAd
                  ? theme.palette.custom.advertisementColor
                  : "primary.main",
                fontFamily: isAd
                  ? { ...fontStyles.openSans.bold }
                  : { ...fontStyles.montserrat.bold },
                marginLeft: "10px",
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
                <Grid container spacing={spacing ?? 2}>
                  {group.items.map((video, itemIndex) => {
                    return (
                      <Grid
                        item
                        key={video.id}
                        lg={12 / size.lg}
                        md={12 / size.md}
                        xl={12 / size.xl}
                        xs={12 / size.xs}
                      >
                        {itemIndex !== 0 &&
                        router.pathname === "/" &&
                        video.type !== "ad_content" &&
                        isMobile ? (
                          <StackVideoCard
                            video={video}
                            layout={section?.layout_config}
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
                            styles={{ height, width }}
                          />
                        )}
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            );
          } else if (group.type === "section") {
            const video = group.content;
            return (
              <Grid
                container
                spacing={spacing ?? 2}
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
                        lg={12 / (video?.layout_config?.size?.lg || 4)}
                        md={12 / (video?.layout_config?.size?.md || 3)}
                        xl={12 / (video?.layout_config?.size?.xl || 4)}
                        xs={12 / (video?.layout_config?.size?.xs || 2)}
                      >
                        <GridCard
                          video={vid}
                          id={video.id}
                          sectionData={video}
                          section={video}
                          styles={{
                            height: video?.layout_config?.height || "auto",
                            width: video?.layout_config?.width || "100%",
                          }}
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
        <Grid container spacing={spacing ?? 2}>
          {section.contents.map((video, index) => {
            if (video.type === "content" || video.type === "ad_content") {
              return (
                <Grid
                  item
                  key={video.id}
                  lg={12 / size.lg}
                  md={12 / size.md}
                  xl={12 / size.xl}
                  xs={12 / size.xs}
                >
                  {index !== 0 &&
                  router.pathname === "/" &&
                  video.type !== "ad_content" &&
                  isMobile ? (
                    <StackVideoCard
                      video={video}
                      layout={section?.layout_config}
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
                      styles={{ height, width }}
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
                        lg={12 / (video?.layout_config?.size?.lg || 4)}
                        md={12 / (video?.layout_config?.size?.md || 3)}
                        xl={12 / (video?.layout_config?.size?.xl || 4)}
                        xs={12 / (video?.layout_config?.size?.xs || 2)}
                      >
                        <GridCard
                          video={vid}
                          id={video.id}
                          sectionData={video}
                          section={video}
                          styles={{
                            height: video?.layout_config?.height || "auto",
                            width: video?.layout_config?.width || "100%",
                          }}
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
