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
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { getButtonLabel, getButtonConfig, getColor, isDarkMode } = useContent();
  const size = section.layout_config.size;
  const height = section?.layout_config?.height;
  const width = section?.layout_config?.width;
  const spacing = section?.layout_config?.spacing;
  const isAd = section?.is_ad;
  let rowCount = 1;

  const getBackgroundColor = (isAd, index, isMobile, size) => {
    if (isAd || isMobile) return theme.palette.background.default;
    contentIndex++;
    const getIsIndexCurrentRow = (size) => {
      // 4 * 0 && 4 * 1
      // 4 * 0 && 4 * 1
      // 4 * 0 && 4 * 1
      // 4 * 0 && 4 * 1
      return index >= size * (rowCount - 1) && index <= size * rowCount;
    };
    const isIndexInCurrentRowXl = getIsIndexCurrentRow(size?.xl);

    if (!isIndexInCurrentRowXl) rowCount++;
    console.log({ sectionIndex, rowCount });
    if (rowCount % 2 === 0 || sectionIndex % 2 === 0) {
      return theme.palette.background.sectionBg;
    } else {
      return theme.palette.background.default;
    }
  };

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
        px: 2.5,
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
            xl: "1.375rem",
            lg: "1.125rem",
            xs: "1.563rem",
          },
          pt: {
            xl: "1.75rem",
            lg: "1.25rem",
            xs: "1.563rem",
          },
        }}
      >
        <Typography
          variant={isAd ? "advertisementTitle" : "sectionTitle"}
          sx={{
            color: isAd
              ? theme.palette.custom.advertisementColor
              : "primary.main",
            fontFamily: isAd
              ? { ...fontStyles.openSans.bold }
              : { ...fontStyles.montserrat.bold },
          }}
        >
          {section.name}
        </Typography>

        {/* showing view more button only in home page(/ means home page) and also if the total content is greater then current content */}
        {section.total_contents > section.contents.length &&
          router?.pathname === "/" &&
          section.is_ad === false && (
            <Button
              // endIcon={<ArrowIcon />}
              endIcon={<DynamicIcon 
                keyword={isHovered ? 'ARROW-YELLOW' : 'ARROW'}
                height={"15px"} 
                width={"15px"}
                style={{
                  color: isDarkMode 
                    ? (isHovered ? '' : '#fff')
                    : (isHovered ? 'black' : '')
                }}
              />}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              sx={{
                textTransform: "none",
                ...fontStyles.openSans.regular,
                color: isDarkMode ? '#fff' : getColor('primary'),
                '&:hover': {
                  bgcolor: 'transparent',
                  color: isDarkMode ? getColor('secondary') : 'common.black',
                  '& .MuiButton-endIcon': {
                    transform: 'translateX(5px)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                },
                '& .MuiButton-endIcon': {
                  transition: 'transform 0.3s ease-in-out'
                }
              }}
              onClick={handleViewMore}
            >
              {isMobile ? "" : getButtonLabel('viewMore')}
            </Button>
          )}
      </Box>
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
                {/* Section Title */}
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    color: "primary.main",
                    ...fontStyles.montserrat.bold,
                    mb: 1, // margin bottom for spacing
                  }}
                >
                  {video.name}
                </Typography>

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
    </Box>
  );
};

export default GridLayout;
