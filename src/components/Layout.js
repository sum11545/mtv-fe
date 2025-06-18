import { useState, useEffect } from "react";
import { Box, styled, ThemeProvider, useMediaQuery, Button } from "@mui/material";
import { useRouter } from "next/router";
import { ArrowBack } from "@mui/icons-material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CategoryTabs from "./CategoryTabs";
import Footer from "./Footer";
import NoVideosPage from "@/pages/no-videos";
import createAppTheme from "@/theme/theme";
import { fontSize, fontStyles } from "@/theme/theme";

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

const BackButtonContainer = styled(Box)(({ theme }) => ({
  position: "fixed",
  top: "64px",
  left: 0,
  right: MINI_DRAWER_WIDTH,
  zIndex: theme.zIndex.appBar - 1,
  backgroundColor: theme.palette.background.default,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down("sm")]: {
    top: "64px",
    right: 0,
    left: 0,
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const BackButton = ({ onClick, label }) => {
  return (
    <BackButtonContainer>
      <Button
        startIcon={<ArrowBack />}
        onClick={onClick}
        sx={{
          color: "text.primary",
          textTransform: "none",
          fontSize: fontSize.button.medium,
          ...fontStyles.openSans.regular,
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        {label}
      </Button>
    </BackButtonContainer>
  );
};

const Layout = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");
  const router = useRouter();

  // Check if current page is shorts page
  const isShortsPage = router.pathname.includes("/shorts");

  // Determine if we should show back button and what the back action should be
  const getBackButtonInfo = () => {
    const { pathname, query } = router;
    
    // If we're on a video detail page (e.g., /section-slug/video-id)
    if (pathname === "/[section]/[video]" && query.section && query.video) {
      return {
        show: true,
        label: `Back to ${query.section.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
        action: () => router.push(`/${query.section}`)
      };
    }
    
    // If we're on a shorts detail page (e.g., /shorts/short-id)
    if (pathname === "/shorts/[short]" && query.short) {
      return {
        show: true,
        label: "Back to Home",
        action: () => router.push("/")
      };
    }
    
    // If we're on a section page (e.g., /section-slug)
    if (pathname === "/[section]" && query.section) {
      return {
        show: true,
        label: "Back to Home",
        action: () => router.push("/")
      };
    }
    
    return { show: false };
  };

  const backButtonInfo = getBackButtonInfo();

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
        {/* Back Button */}
        {backButtonInfo.show && (
          <BackButton 
            onClick={backButtonInfo.action} 
            label={backButtonInfo.label} 
          />
        )}
        {/* Hide category tabs on mobile for shorts detail page */}
        {/* {!(isMobile || isShortsPage) && (
          <TabsContainer>
            <CategoryTabs />
          </TabsContainer>
        )} */}
        <Main
          isShortsPageMobile={isMobile && isShortsPage}
          sx={{ 
            marginTop: backButtonInfo.show 
              ? (isShortsPage || isMobile ? "120px" : "120px")
              : (isShortsPage || isMobile ? "64px" : "104px")
          }}
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
