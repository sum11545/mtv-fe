import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  IconButton,
  Typography,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Subscriptions as SubscriptionsIcon,
  Whatshot as WhatshotIcon,
  VideoLibrary as VideoLibraryIcon,
  History as HistoryIcon,
  Close as CloseIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fontSize, fontStyles } from "../theme/theme";
import { useMain } from "@/context/MainContext";
import { MarketPillarIcon, MoonStarIcon, EyeIcon, AnalyticsIcon, StarIcon, ProfileIcon } from "./icons";

const DRAWER_WIDTH = 300;
const MINI_DRAWER_WIDTH = 70;

// Keep icons mapping for reference
const iconMapping = {
  TV: <MarketPillarIcon />,
  MU: <ProfileIcon />,
  TI: <EyeIcon />,
  T10P: <AnalyticsIcon />,
  LN: <StarIcon />,
};

const bottomSidebarItems = [{ text: "Settings", icon: <SettingsIcon /> }];

const Sidebar = ({ open, onClose, isDarkMode, onToggleTheme }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { fetchSideBarData } = useMain();
  const [sidebarItems, setSidebarItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const SidebarData = async () => {
      setIsLoading(true);
      try {
        const res = await fetchSideBarData();
        const data = res?.data?.response?.data;
        
        // Map the API data with icons
        const mappedItems = data.map(item => ({
          text: item.name,
          section_slug: item.section_slug,
          icon: iconMapping[item.keyword] || iconMapping.TV, // Default to MarketPillar icon if no match
          keyword: item.keyword
        }));
        
        setSidebarItems(mappedItems);
      } catch (err) {
        console.error("Error fetching sidebar data:", err);
        // Fallback to default items if API fails
        setSidebarItems([
          { text: "TV", icon: <MarketPillarIcon /> },
          { text: "Market Update", icon: <ProfileIcon /> },
          { text: "Technical Indicators", icon: <EyeIcon /> },
          { text: "Top 10 Picks", icon: <AnalyticsIcon /> },
          { text: "Latest News", icon: <StarIcon /> },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    SidebarData();
  }, [fetchSideBarData]);

  const handleIconClick = (section_slug) => {
    console.log(section_slug);
    if(section_slug){
      router.push(`/${section_slug}`);
    }
  };

  return (
    <>
      {/* Mini permanent drawer - Hidden on mobile */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="right"
          sx={{
            width: MINI_DRAWER_WIDTH,
            flexShrink: 0,
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: MINI_DRAWER_WIDTH,
              boxSizing: "border-box",
              top: "64px",
              height: `calc(100% - 64px)`,
              backgroundColor: "background.default",
              borderLeft: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            },
          }}
        >
          {/* Top icons */}
          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => handleIconClick(item.section_slug)}
                  sx={{
                    minHeight: 64,
                    justifyContent: "center",
                    px: 1,
                    py: 1,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "& .MuiSvgIcon-root": {
                          fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                        },
                        cursor: "pointer",
                        "&:hover": {
                          opacity: 0.8,
                        },
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        ...fontStyles.sfPro.condensed.regular,
                        fontSize: theme.fontSize?.typography?.overline || fontSize.typography.overline,
                        textTransform: "uppercase",
                        textAlign: "center",
                        lineHeight: 1,
                        maxWidth: "60px",
                        wordWrap: "break-word",
                      }}
                    >
                      {item.keyword}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Bottom icons */}
          <Box>
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={onToggleTheme}
                  sx={{
                    minHeight: 64,
                    justifyContent: "center",
                    px: 1,
                    py: 1,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "& .MuiSvgIcon-root": {
                          fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                        },
                      }}
                    >
                      {isDarkMode ? <LightModeIcon /> : <MoonStarIcon />}
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        ...fontStyles.sfPro.condensed.regular,
                        fontSize: theme.fontSize?.typography?.overline || fontSize.typography.overline,
                        textTransform: "uppercase",
                        textAlign: "center",
                        lineHeight: 1,
                        maxWidth: "60px",
                        wordWrap: "break-word",
                      }}
                    >
                      {isDarkMode ? "LIGHT" : "DARK"}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>

              {bottomSidebarItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    sx={{
                      minHeight: 64,
                      justifyContent: "center",
                      px: 1,
                      py: 1,
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          "& .MuiSvgIcon-root": {
                            fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                          },
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          ...fontStyles.sfPro.condensed.regular,
                          fontSize: theme.fontSize?.typography?.overline || fontSize.typography.overline,
                          textTransform: "uppercase",
                          textAlign: "center",
                          lineHeight: 1,
                          maxWidth: "60px",
                          wordWrap: "break-word",
                        }}
                      >
                        SET
                      </Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}

              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    minHeight: 64,
                    justifyContent: "center",
                    px: 1,
                    py: 1,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={() =>
                    window.open(
                      "https://www.youtube.com/@moneytvlive",
                      "_blank"
                    )
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "& .MuiSvgIcon-root": {
                          fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                          color: theme.palette.custom?.youtube?.main || "#FF0000",
                        },
                      }}
                    >
                      <SubscriptionsIcon />
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        ...fontStyles.sfPro.condensed.regular,
                        fontSize: theme.fontSize?.typography?.overline || fontSize.typography.overline,
                        textTransform: "uppercase",
                        textAlign: "center",
                        lineHeight: 1,
                        maxWidth: "60px",
                        wordWrap: "break-word",
                      }}
                    >
                      YT
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}

      {/* Full-width temporary drawer */}
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          position: "fixed",
          "& .MuiDrawer-paper": {
            width: isMobile ? "50%" : DRAWER_WIDTH,
            boxSizing: "border-box",
            top: 0,
            height: "100%",
            zIndex: (theme) => theme.zIndex.appBar + 1,
            borderLeft: "1px solid",
            borderColor: "divider",
          },
        }}
        variant="temporary"
        anchor="right"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            // mt: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            color="primary.main"
            sx={{
              ...fontStyles.sfPro.condensed.bold,
              fontSize: theme.fontSize?.typography?.h6 || fontSize.typography.h6,
              textTransform: "uppercase",
            }}
          >
            Welcome, User!
          </Typography>
          <IconButton
            onClick={onClose}
            edge="end"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {/* Main content */}
        <Box
          sx={{
            overflow: "auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Top menu items */}
          <List>
            {sidebarItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton  onClick={() => handleIconClick(item.section_slug)}>
                  <ListItemIcon
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                      },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        ...fontStyles.sfPro.condensed.regular,
                        fontSize: theme.fontSize?.nav?.primary || fontSize.nav.primary,
                        textTransform: "uppercase"
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* Bottom section */}
          <Box sx={{ p: 2 }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={onToggleTheme}>
                  <ListItemIcon
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                      },
                    }}
                  >
                    {isDarkMode ? <LightModeIcon /> : <MoonStarIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={isDarkMode ? "Switch to Light" : "Switch to Dark"}
                    sx={{
                      "& .MuiListItemText-primary": {
                        ...fontStyles.sfPro.condensed.regular,
                        fontSize: theme.fontSize?.nav?.primary || fontSize.nav.primary,
                        textTransform: "uppercase",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              {bottomSidebarItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                        },
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        "& .MuiListItemText-primary": {
                          ...fontStyles.sfPro.condensed.regular,
                          fontSize: theme.fontSize?.nav?.primary || fontSize.nav.primary,
                          textTransform: "uppercase",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <ListItem disablePadding>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() =>
                  window.open("https://www.youtube.com/@moneytvlive", "_blank")
                }
                startIcon={
                  <SubscriptionsIcon sx={{ fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium }} />
                }
                                  sx={{
                    mb: 2,
                    ...fontStyles.sfPro.condensed.bold,
                    fontSize: theme.fontSize?.button?.medium || fontSize.button.medium,
                    textTransform: "uppercase",
                    backgroundColor: theme.palette.custom?.youtube?.main || "#FF0000",
                    color: theme.palette.common?.white || "#FFFFFF",
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.common?.white || "#FFFFFF",
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.custom?.youtube?.dark || "#CC0000",
                    },
                  }}
              >
                Subscribe To YouTube
              </Button>
            </ListItem>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
