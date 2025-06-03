import React from "react";
import { Box, Container } from "@mui/material";
import NoVideosFound from "../custom-components/NoVideosFound";

const NoVideosPage = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        mt: { xs: 10, sm: 8 },
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <NoVideosFound searchQuery="Football Highlights" />
      </Container>
    </Box>
  );
};

export default NoVideosPage;
