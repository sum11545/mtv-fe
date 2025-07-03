import { useState, useEffect } from "react";
import {
  Box,
  styled,
  ThemeProvider,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useRouter } from "next/router";
import { ArrowBack } from "@mui/icons-material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import CategoryTabs from "./CategoryTabs";
import Footer from "./Footer";
import NoVideosPage from "@/pages/no-videos";
import createAppTheme from "@/theme/theme";
import { fontSize, fontStyles } from "@/theme/theme";
import { DynamicIcon } from "@/components/icons";
import { useContent } from "@/hooks/useContent";

const MINI_DRAWER_WIDTH = 70;

const Main = styled("main")(({ theme, isShortsPageMobile }) => ({
  flexGrow: 1,
  width: `calc(100% - ${MINI_DRAWER_WIDTH}px)`,
  minHeight: "80vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    marginTop: isShortsPageMobile ? 0 : theme.spacing(15),
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
  padding: theme.spacing(1, 2),
  [theme.breakpoints.down("sm")]: {
    top: "64px",
    right: 0,
    left: 0,
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const BackButton = ({ onClick, label }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { getColor, isDarkMode } = useContent();

  return (
    <BackButtonContainer>
      <Button
        startIcon={
          <DynamicIcon
            keyword={isHovered ? "ARROW-LEFT_YELLOW" : "ARROW-LEFT"}
            height={"15px"}
            width={"15px"}
            style={{
              color: isDarkMode
                ? isHovered
                  ? ""
                  : "#fff"
                : isHovered
                ? "black"
                : "",
              transform: "rotate(180deg)", // Rotate arrow to point left for back
            }}
          />
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        sx={{
          textTransform: "none",
          ...fontStyles.openSans.regular,
          color: isDarkMode ? "#fff" : "black",
          "&:hover": {
            bgcolor: "transparent",
            color: isDarkMode ? getColor("secondary") : "common.black",
            "& .MuiButton-startIcon": {
              transform: "translateX(-5px) rotate(180deg)",
              transition: "transform 0.3s ease-in-out",
            },
          },
          "& .MuiButton-startIcon": {
            transition: "transform 0.3s ease-in-out",
            transform: "rotate(180deg)",
          },
          typography: "backToText",
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
  const [navigationHistory, setNavigationHistory] = useState([]);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  const [cachedBackLabel, setCachedBackLabel] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  const router = useRouter();

  // Check if current page is shorts page
  const isShortsPage = router.pathname.includes("/shorts");

  // Get the previous route from navigation history
  const getPreviousRoute = () => {
    if (navigationHistory.length >= 2) {
      return navigationHistory[navigationHistory.length - 2];
    }
    return null;
  };

  // Get a user-friendly label for a route
  const getRouteLabel = (route) => {
    if (!route) return "Home";

    const { pathname, query } = route;
    console.log("route", route);

    if (pathname === "/") return "Home";
    if (pathname === "/search") return "Search";
    if (pathname === "/[section]" && query.section) {
      return query.section
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
    }
    if (pathname === "/[section]/[video]" && query.section) {
      return query.section
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
    }
    if (pathname === "/shorts/[short]") return "Shorts";
    if (pathname === "/privacy-policy") return "Privacy Policy";
    if (pathname === "/terms-of-service") return "Terms of Service";
    if (pathname === "/help") return "Help";

    return "Previous Page";
  };

  // Navigate to a specific route
  const navigateToRoute = (route) => {
    if (!route) {
      router.push("/");
      return;
    }

    const { pathname, query } = route;

    if (pathname === "/") {
      router.push("/");
    } else if (pathname === "/search") {
      router.push("/search");
    } else if (pathname === "/[section]" && query.section) {
      router.push(`/${query.section}`);
    } else if (
      pathname === "/[section]/[video]" &&
      query.section &&
      query.video
    ) {
      router.push(`/${query.section}/${query.video}`);
    } else if (pathname === "/shorts/[short]" && query.short) {
      router.push(`/shorts/${query.short}`);
    } else {
      router.push(pathname);
    }
  };

  // Determine if we should show back button and what the back action should be
  const getBackButtonInfo = () => {
    const { pathname, query } = router;
    const previousRoute = getPreviousRoute();

    // Show back button for pages that should have navigation
    const shouldShowBackButton = [
      "/[section]/[video]",
      "/shorts/[short]",
      "/[section]",
      "/search",
      "/privacy-policy",
      "/terms-of-service",
      "/help",
    ].includes(pathname);

    if (shouldShowBackButton) {
      const previousLabel = getRouteLabel(previousRoute);

      return {
        show: true,
        label:
          isNavigatingBack && cachedBackLabel
            ? cachedBackLabel
            : `Back to ${previousLabel}`,
        action: () => {
          if (previousRoute) {
            // Cache the current label and set navigation state
            setCachedBackLabel(`Back to ${previousLabel}`);
            setIsNavigatingBack(true);

            // Store the route to navigate to before updating history
            const routeToNavigate = { ...previousRoute };
            try {
              // Navigate to the previous route
              navigateToRoute(routeToNavigate);
              // Remove current route from history
              setNavigationHistory((prev) => prev.slice(0, -1));
            } catch (error) {
              console.error("Navigation failed, falling back to home:", error);
              router.push("/");
            }
          } else {
            // Fallback to home if no previous route
            router.push("/");
          }
        },
      };
    }

    return { show: false };
  };

  const backButtonInfo = getBackButtonInfo();

  // Track route changes and build navigation history
  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      // Reset navigation state when route change completes
      setIsNavigatingBack(false);
      setCachedBackLabel(null);

      const currentRoute = {
        pathname: router.pathname,
        query: router.query,
        asPath: router.asPath,
        url: url,
      };

      setNavigationHistory((prev) => {
        // Don't add the same route consecutively
        const lastRoute = prev[prev.length - 1];
        if (
          lastRoute &&
          lastRoute.pathname === currentRoute.pathname &&
          JSON.stringify(lastRoute.query) === JSON.stringify(currentRoute.query)
        ) {
          return prev;
        }

        // Limit history to last 10 routes to prevent memory issues
        const newHistory = [...prev, currentRoute];
        return newHistory.slice(-10);
      });
    };

    // Add current route to history on component mount
    if (router.isReady) {
      handleRouteChangeComplete(router.asPath);
    }

    const handleRouteChangeError = () => {
      // Reset navigation state if route change fails
      setIsNavigatingBack(false);
      setCachedBackLabel(null);
    };

    // Listen for route changes
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.isReady, router.pathname, router.query, router.asPath]);

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) {
        setIsDarkMode(savedMode === "true");
        // Set initial body background to prevent flash
        document.body.style.backgroundColor =
          savedMode === "true" ? "#040C38" : "#ffffff";
      } else {
        const prefersDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDarkMode(prefersDarkMode);
        // Set initial body background to prevent flash
        document.body.style.backgroundColor = prefersDarkMode
          ? "#040C38"
          : "#ffffff";
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
      // Update body background immediately to prevent flash
      document.body.style.backgroundColor = newMode ? "#040C38" : "#ffffff";
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
              ? isShortsPage || isMobile
                ? "120px"
                : "120px"
              : isShortsPage || isMobile
              ? "70px"
              : "80px",
            // : "50px",
          }}
        >
          {children}
          {/* <NoVideosPage /> */}
        </Main>
        {/* Hide footer on mobile for shorts detail page */}
        {!isShortsPage && <Footer />}
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
