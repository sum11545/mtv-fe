import createAxiosInstance from "@/configs/axios";
import AdSection from "@/custom-components/layouts/AdSection";
import GridLayout from "@/custom-components/layouts/GridLayout";
import SliderLayout from "@/custom-components/layouts/SliderLayout";
import StackLayout from "@/custom-components/layouts/StackLayout";
import NoVideosFound from "@/custom-components/NoVideosFound";
import { fontStyles } from "@/theme/theme";
import {
  Backdrop,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";

const SearchPage = () => {
  const axiosInstance = createAxiosInstance();
  const router = useRouter();
  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!_.isEmpty(router.query)) {
        try {
          const query = router.query;
          let searchQueryParams = {};
          if (query?.mtvCode) {
            searchQueryParams["mtv_code"] = query?.mtvCode;
          }

          if (query?.searchQuery) {
            searchQueryParams["search_query"] = query?.searchQuery;
          }
          const response = await axiosInstance.get("/search/searchResults", {
            params: searchQueryParams,
          });
          setSectionData(response?.data?.response?.sections ?? []);
        } catch (error) {
          throw error;
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSearchResults();
  }, [router.query]);

  return sectionData.length == 0 && !loading ? (
    <>
      <Typography
        variant={"h6"}
        component="h2"
        sx={{
          ml: 5.5,
          color: "primary.main",
          fontFamily: { ...fontStyles.montserrat.bold },
        }}
      >
        Search Results
      </Typography>
      <NoVideosFound searchQuery={router.query?.searchQuery} />
    </>
  ) : (
    <>
      <Backdrop
        sx={{ background: "#FFF", zIndex: 1, height: "100vh" }}
        open={loading}
      >
        <CircularProgress />
      </Backdrop>
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
              return (
                <GridLayout
                  section={section}
                  sectionData={sectionData}
                  key={`${section.type}-${index}`}
                />
              );
            case "slider":
              return (
                <SliderLayout
                  name={section.name}
                  section={section}
                  key={`${section.type}-${index}`}
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
    </>
  );
};

export default SearchPage;
