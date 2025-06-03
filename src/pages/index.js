import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import GridLayout from "../custom-components/layouts/GridLayout";
import SliderLayout from "../custom-components/layouts/SliderLayout";
import AdSection from "../custom-components/layouts/AdSection";
import { useMain } from "@/context/MainContext";

export default function Home() {
  const [sectionData, setSectionData] = useState(null);
  const { loading, error, fetchHomePageData } = useMain();

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

  return (
    <Container
      maxWidth="xl"
      sx={{
        px: { xs: 3, sm: 5, md: 5 },
        width: "100%",
        maxWidth: "100% !important",
      }}
    >
      {sectionData?.map((section, index) => {
        switch (section.layout_config?.type) {
          case "grid":
            return <GridLayout section={section} sectionData={sectionData} />;
          case "slider":
            return (
              <SliderLayout
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
    </Container>
  );
}
