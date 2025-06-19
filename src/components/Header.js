import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Badge,
  styled,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import Image from "next/image";
import { fontStyles, fontSize } from "../theme/theme";
import SearchBar from "./SearchBar";
import Link from "next/link";

const Header = ({ toggleSidebar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === "dark";

  const LogoWrapper = styled(Box)({
    display: "flex",
    alignItems: "center",
    position: "relative",
    height: "40px",
    width: "170px",
    // border: "1px solid green",
    marginLeft: " -14px",
  });

  if (isMobile) {
    return (
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "background.paper",
          color: "text.primary",
          boxShadow: "none",
          // borderBottom: theme.palette.mode === "light" && "1px solid",
          // borderColor: theme.palette.mode === "light" && "divider",
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            py: 1,
            gap: 1,
          }}
        >
          {/* Top row with logo and icons */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              px: { xs: 0.5, sm: 1 },
            }}
          >
            {/* Logo */}
            <Link href="/">
              <LogoWrapper>
                <Image
                  src={
                    isDarkMode
                      ? "/images/logos/header-logo-light.png"
                      : "/images/logos/header-logo-dark.png"
                  }
                  alt="Money TV Logo"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </LogoWrapper>
            </Link>
            {/* Right side icons */}
            <Box sx={{ display: "flex" }}>
              {/* <IconButton
                size="large"
                aria-label="show notifications"
                color="inherit"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: fontSize.icon.large,
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton> */}
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="toggle sidebar"
                onClick={toggleSidebar}
                sx={{
                  ml: 1,
                  "& .MuiSvgIcon-root": {
                    fontSize: fontSize.icon.large,
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Bottom row with search bar */}
          <Box sx={{ width: "100%", px: { xs: 0.5, sm: 1 } }}>
            <SearchBar />
          </Box>
        </Toolbar>
      </AppBar>
    );
  }

  // Desktop view
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "background.paper",
        color: "text.primary",
        paddingLeft: 3,
        boxShadow: "none",
        // borderBottom: theme.palette.mode === "light" && "1px solid",
        // borderColor: theme.palette.mode === "light" && "divider",
      }}
      elevation={0}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 0.5,
          px: { xs: 0.5, sm: 1.5 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flex: 1,
            gap: 2,
          }}
        >
          {/* Logo */}
          <Link href="/">
            <LogoWrapper>
              <Image
                src={
                  isDarkMode
                    ? "/images/logos/header-logo-light.png"
                    : "/images/logos/header-logo-dark.png"
                }
                alt="Money TV Logo"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </LogoWrapper>
          </Link>

          {/* Search Bar */}
          <SearchBar />
        </Box>

        {/* Right side icons */}
        <Box sx={{ display: "flex", marginRight: "5px" }}>
          {/* <IconButton
            size="large"
            aria-label="show notifications"
            color="inherit"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: fontSize.icon.large,
              },
            }}
          >
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="toggle sidebar"
            onClick={toggleSidebar}
            sx={{
              ml: 1,
              "& .MuiSvgIcon-root": {
                fontSize: fontSize.icon.large,
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
