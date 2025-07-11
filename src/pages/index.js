import { useCallback, useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GridLayout from "../custom-components/layouts/GridLayout";
import SliderLayout from "../custom-components/layouts/SliderLayout";
import AdSection from "../custom-components/layouts/AdSection";
import { useMain } from "@/context/MainContext";
import { useRouter } from "next/router";

export default function Home() {
  const [sectionData, setSectionData] = useState(null);
  const theme = useTheme();
  const { loading, error, fetchHomePageData } = useMain();
  let sectionIndex = 0;
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchHomePageData();
        const sections = res?.data?.response?.sections;
        setSectionData(sections);
      } catch (err) {
        console.error("Error fetching home data:", err);
      }
    };

    loadData();
  }, []);

  const getBackgroundColor = (isAd) => {
    if (isAd) return theme.palette.background.default;

    if (sectionIndex % 2 !== 0) {
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
        sx={{ background: "transparent", zIndex: 100, height: "100vh" }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          width: "100%",
          maxWidth: "100% !important",
          marginTop: router.pathname == "/" && isMobile && "-60px",
        }}
      >
        {sectionData?.map((section, index) => {
          switch (section.layout_type) {
            case "LGRID":
              const isAd = section.is_ad;
              const bgColor = getBackgroundColor(isAd);
              return (
                <GridLayout
                  section={section}
                  sectionData={sectionData}
                  sectionIndex={sectionIndex}
                  bgColor={bgColor}
                  key={`${section.type}-${index}`}
                />
              );
            case "LSLIDER":
              return (
                <SliderLayout
                  name={section.name}
                  section={section}
                  sectionData={sectionData}
                  key={`${section.type}-${index}`}
                  styles={{ px: 2.5 }}
                />
              );
            default:
              return null;
          }
        })}
      </Container>
    </>
  );
}
