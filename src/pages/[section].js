import { useRouter } from "next/router";
import {
  Box,
  Container,
  Typography,
  Grid,
  useTheme,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useMain } from "@/context/MainContext";
import AdSection from "@/custom-components/layouts/AdSection";
import GridLayout from "@/custom-components/layouts/GridLayout";
import SliderLayout from "@/custom-components/layouts/SliderLayout";

export default function SectionPage({ sectionSlug }) {
  const router = useRouter();
  const theme = useTheme();
  const { section } = router.query;
  const [sectionData, setSectionData] = useState(null);
  const { loading, error, fetchSectionPageData } = useMain();
  let sectionIndex = 1;

  useEffect(() => {
    if (section) {
      const loadData = async () => {
        try {
          const res = await fetchSectionPageData(section);
          const sections = res?.data?.response?.sections;
          setSectionData(sections);
        } catch (err) {
          console.error("Error fetching section list data:", err);
        }
      };
      loadData();
    }
  }, [section]);

  const getBackgroundColor = (isAd) => {
    if (isAd) return theme.palette.background.default;

    if (sectionIndex % 2 === 0) {
      sectionIndex++;

      return theme.palette.background.sectionBg;
    } else {
      sectionIndex++;

      return theme.palette.background.default;
    }
  };

  return (
    <>
      <Backdrop
        sx={{ background: "#FFF", zIndex: 1, height: "100vh" }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Container disableGutters maxWidth="xl">
        <Box>
          {sectionData?.map((section, index) => {
            switch (section.layout_config?.type) {
              case "grid":
                const isAd = section.is_ad;
                const bgColor = getBackgroundColor(isAd);
                return (
                  <GridLayout
                    key={`${section.type}-${index}`}
                    video={section.contents}
                    section={section}
                    sectionData={sectionData}
                    sectionIndex={index + 1}
                    bgColor={bgColor}
                  />
                );
              case "slider":
                return (
                  <SliderLayout
                    key={`${section.type}-${section.id}`}
                    name={section.name}
                    section={section}
                    sectionData={sectionData}
                  />
                );
              case "ad":
                return (
                  <AdSection
                    key={`${section.type}-${index}`}
                    name={section.name}
                    ads={section.contents}
                    section={section}
                    sectionData={sectionData}
                  />
                );
              default:
                return null;
            }
          })}
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps({ params, req, res }) {
  const { section } = params;

  try {
    // Set cache headers
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );

    return {
      props: {
        sectionSlug: section,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      notFound: true,
    };
  }
}
