import { useState, useEffect } from "react";
import { Box, styled, ThemeProvider, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CategoryTabs from "./CategoryTabs";
import Footer from "./Footer";
import NoVideosPage from "@/pages/no-videos";
import createAppTheme from "@/theme/theme";

const MINI_DRAWER_WIDTH = 70;

const Main = styled("main")(({ theme, isShortsPageMobile }) => ({
  flexGrow: 1,
  width: `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: isShortsPageMobile ? 0 : theme.spacing(20),
  },
}));

const TabsContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "64px",
  left: 0,
  right: MINI_DRAWER_WIDTH,
  zIndex: theme.zIndex.appBar - 1,
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down("sm")]: {
    top: "112px",
    right: 0,
  },
}));

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");
  const router = useRouter();

  // Check if current page is shorts page
  const isShortsPage = router.pathname.includes("/shorts");

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) {
        setIsDarkMode(savedMode === "true");
      } else {
        const prefersDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDarkMode(prefersDarkMode);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", newMode.toString());
    }
  };

  if (!mounted) {
    return null;
  }

  const currentTheme = createAppTheme(isDarkMode ? "dark" : "light");

  return (
    <ThemeProvider theme={currentTheme}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Header toggleSidebar={toggleSidebar} />
        {/* Hide category tabs on mobile for shorts detail page */}
        {!(isMobile || isShortsPage) && (
          <TabsContainer>
            <CategoryTabs />
          </TabsContainer>
        )}
        <Main
          isShortsPageMobile={isMobile && isShortsPage}
          sx={{ marginTop: isShortsPage || isMobile ? "64px" : "104px" }}
        >
          {children}
          {/* <NoVideosPage /> */}
        </Main>
        {/* Hide footer on mobile for shorts detail page */}
        {!(isMobile || isShortsPage) && <Footer />}
        <Sidebar
          open={sidebarOpen}
          onClose={toggleSidebar}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          isMobile={isMobile}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
