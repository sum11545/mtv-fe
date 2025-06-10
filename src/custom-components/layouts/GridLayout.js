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
import { fontSize, fontStyles } from "../../theme/theme";
import StackVideoCard from "../cards/StackVideoCard";

const GridLayout = ({ name, contents, id, sectionData, section, bgColor }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const size = section.layout_config.size;
  const height = section?.layout_config?.height;
  const width = section?.layout_config?.width;
  const spacing = section?.layout_config?.spacing;
  const isAd = section?.is_ad;

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
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant={isAd ? "body2" : "h6"}
          component="h2"
          sx={{
            color: "primary.main",
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
              endIcon={<ChevronRightIcon />}
              sx={{
                textTransform: "none",
                ...fontStyles.openSans.regular,
              }}
              onClick={handleViewMore}
            >
              View More
            </Button>
          )}
      </Box>

      {/* <Box sx={{ position: "relative" }}> */}
      {/* {showLeftScroll && (
          <IconButton
            sx={{
              position: "absolute",
              left: -20,
              top: "30%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": { bgcolor: "background.paper" },
            }}
            onClick={() => scroll("left")}
          >
            <ChevronLeftIcon />
          </IconButton>
        )} */}

      {/* <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        > */}
      <Grid
        container
        spacing={spacing ?? 2}
        sx={
          {
            // flexWrap: "nowrap",
            // width: "max-content",
          }
        }
      >
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
                <GridCard
                  video={video}
                  id={section.id}
                  sectionData={sectionData}
                  section={section}
                  styles={{ height, width }}
                />
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
      {/* </Box> */}

      {/* {showRightScroll && !isMobile && (
          <IconButton
            sx={{
              position: "absolute",
              right: -20,
              top: "30%",
              transform: "translateY(-50%)",
              zIndex: 2,
              bgcolor: "background.paper",
              boxShadow: 2,
              "&:hover": { bgcolor: "background.paper" },
            }}
            onClick={() => scroll("right")}
          >
            <ChevronRightIcon />
          </IconButton>
        )} */}
      {/* </Box> */}
    </Box>
  );
};

export default GridLayout;
