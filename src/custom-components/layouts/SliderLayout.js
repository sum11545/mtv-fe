import { useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SliderCard from "../cards/SliderCard";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useRouter } from "next/router";
import { fontStyles } from "../../theme/theme";
import { DynamicIcon } from "@/components/icons";
import { useContent } from "@/hooks/useContent";

const SliderLayout = ({
  title,
  shorts,
  sectionIndex,
  sectionData,
  section,
  styles = {},
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { getButtonLabel, getButtonConfig, getColor, isDarkMode } = useContent();
  const size = section?.layout_config?.size;
  const height = section?.layout_config?.height;
  const width = section?.layout_config?.width;
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
    <Box sx={{ mb: 4, ...styles }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: {
            xl: "1.5625rem", // 25px
            lg: "0.9375rem", // 15px
            xs: "1.25rem", // 20px
          },
          pt: {
            xl: "1.5625rem", // 25px
            lg: "0.9375rem", // 15px
            xs: "1.25rem", // 20px
          },
        }}
      >
        <Typography
          variant="sectionTitle"
          sx={{
            color: router?.pathname === "/" ? "primary.main" : "inherit",
            ...fontStyles.montserrat.bold,
          }}
        >
          {section.name}
        </Typography>

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
                  variant="body1"
                  sx={{
                    lineHeight: 1.1,
                    color: theme.palette.custom.adText,
                    fontSize: fontSize.typography.caption,
                    ...fontStyles.montserrat.regular,
                    fontStyle: "italic",
                  }}
                >
                  - {sponsor}
                </Typography>
              )
            );
          })()}

        {/* showing view more button only in home page(/ means home page) and also if the total content is greater then current content */}
        {section.total_contents > section.contents.length &&
          router?.pathname === "/" && (
            <Button
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

      <Box sx={{ position: "relative" }}>
        {showLeftScroll && !isMobile && (
          <IconButton
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
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
        )}

        <Box
          ref={scrollContainerRef}
          onScroll={handleScroll}
          sx={{
            display: "flex",
            flexShrink: 0,
            gap: 2,
            overflowX: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            // px: 1,
            maxWidth: "100%", // Ensure container doesn't exceed viewport
            // height: height && {
            //   lg: height.lg,
            //   md: height.md,
            //   xl: height.xl,
            //   xs: height.xs,
            // },
          }}
        >
          {section?.contents?.map((short) => (
            <Box key={short.id}>
              <SliderCard
                key={short.id}
                short={short}
                sectionIndex={sectionIndex}
                sectionData={sectionData}
                section={section}
                styles={{ height, width }}
              />
            </Box>
          ))}
        </Box>

        {showRightScroll && !isMobile && (
          <IconButton
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
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
        )}
      </Box>
    </Box>
  );
};

export default SliderLayout;
