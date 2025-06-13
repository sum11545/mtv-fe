import createAxiosInstance from "@/configs/axios";
import AdSection from "@/custom-components/layouts/AdSection";
import GridLayout from "@/custom-components/layouts/GridLayout";
import SliderLayout from "@/custom-components/layouts/SliderLayout";
import StackLayout from "@/custom-components/layouts/StackLayout";
import NoVideosFound from "@/custom-components/NoVideosFound";
import { fontStyles } from "@/theme/theme";
import { Container, Typography } from "@mui/material";
import React from "react";

export async function getServerSideProps(context) {
  const axiosInstance = createAxiosInstance();
  const query = context?.query;
  let searchQueryParams = {};
  if (query?.mtvCode) {
    searchQueryParams["mtv_code"] = query?.mtvCode;
  }

  if (query?.searchQuery) {
    searchQueryParams["search_query"] = query?.searchQuery;
  }
  const result = await axiosInstance.get(`/search/searchResults`, {
    params: searchQueryParams,
  });
  return {
    props: {
      query,
      results: result.data,
    },
  };
}
const SearchPage = ({ results, query }) => {
  const { response, message } = results;

  const sectionData = response?.sections;
  return response.length == 0 ? (
    <>
    <Typography
            // variant="h3"
            // gutterBottom
            // color="primary"
            // sx={{
            //   ml: 5,
            //   ...fontStyles.sfPro.display.bold,
            // }}
            variant={"h6"}
            component="h2"
            sx={{
              ml: 5.5,
              color: "primary.main",
              fontFamily: { ...fontStyles.montserrat.bold }
            }}
          >
            Search Results
          </Typography>
    <NoVideosFound searchQuery={query?.searchQuery}/>
    </>
  ) : (
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
          case "stack":
            return (
              <StackLayout
                key={`${section.type}-${index}`}
                video={section.contents}
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
};

export default SearchPage;
