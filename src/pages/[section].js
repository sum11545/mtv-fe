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

          // For showing the section name in back to button text in layout file
          let sec1 = JSON.parse(localStorage.getItem("sections")) || [];
          let sec2 =
            res?.data?.response?.sections?.map((item) => ({
              id: item.id,
              name: item.name,
              slug: item.slug,
            })) || [];

          let mergedSections = [...sec1, ...sec2].reduce((acc, current) => {
            if (!acc.some((item) => item.slug === current.slug)) {
              acc.push(current);
            }
            return acc;
          }, []);
          localStorage.setItem("sections", JSON.stringify(mergedSections));
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
        sx={{
          backgroundColor: theme.palette.background.default,
          zIndex: 100,
          height: "100vh",
        }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Container disableGutters maxWidth="xl">
        <Box>
          {sectionData?.map((section, index) => {
            switch (section.layout_type) {
              case "LGRID":
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
              case "LSLIDER":
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
