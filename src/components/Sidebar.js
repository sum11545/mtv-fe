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
import Image from "next/image";
import { fontSize, fontStyles, layout, palette} from "../theme/theme";
import { useMain } from "@/context/MainContext";
import { DynamicIcon, MoonStarIcon } from "./icons";

// const bottomSidebarItems = [{ text: "Settings", icon: <SettingsIcon /> }];

const Sidebar = ({ open, onClose, isDarkMode, onToggleTheme }) => {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { fetchSideBarData } = useMain();
  const [sidebarItems, setSidebarItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const iconStyle = {
    color: isDarkMode ? palette?.dark?.primary?.main :''// Use theme's primary text color for consistency
  };

  const bottomSidebarItems = [
    // { text: "Settings", icon: <DynamicIcon keyword={"SETTINGS"} style={iconStyle} /> }
  ];

  useEffect(() => {
    const SidebarData = async () => {
      setIsLoading(true);
      try {
        const res = await fetchSideBarData();
        const data = res?.data?.response?.data;

        // Dynamic icon style based on theme mode


        
        // Map the API data with dynamic icons
        const mappedItems = data.map(item => ({
          text: item.name,
          section_slug: item.section_slug,
          icon: <DynamicIcon keyword={item.keyword} style={iconStyle} />, // Use DynamicIcon with theme-aware color
          keyword: item.keyword
        }));
        
        setSidebarItems(mappedItems);
      } catch (err) {
        console.error("Error fetching sidebar data:", err);
        // Dynamic icon style for fallback items
        const fallbackIconStyle = {
          color: theme.palette.text.primary // Use theme's primary text color for consistency
        };
        
        // Fallback to default items if API fails
        setSidebarItems([
          { text: "TV", icon: <DynamicIcon keyword="TV" style={fallbackIconStyle} /> },
          { text: "Market Update", icon: <DynamicIcon keyword="MU" style={fallbackIconStyle} /> },
          { text: "Technical Indicators", icon: <DynamicIcon keyword="TI" style={fallbackIconStyle} /> },
          { text: "Top 10 Picks", icon: <DynamicIcon keyword="T10P" style={fallbackIconStyle} /> },
          { text: "Latest News", icon: <DynamicIcon keyword="LN" style={fallbackIconStyle} /> },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    SidebarData();
  }, [isDarkMode]);

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
            width: theme.layout?.sidebar?.mini?.width || layout.sidebar.mini.width,
            flexShrink: 0,
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: theme.layout?.sidebar?.mini?.width || layout.sidebar.mini.width,
              boxSizing: "border-box",
              top: `${theme.layout?.appBar?.height || layout.appBar.height}px`,
              height: `calc(100% - ${theme.layout?.appBar?.height || layout.appBar.height}px)`,
              backgroundColor: `${isDarkMode ? theme.palette.background.default : theme.palette.background.default} !important`,
              backgroundImage: "none !important",
              borderLeft: `${theme.layout?.spacing?.border?.thin || layout.spacing.border.thin} solid`,
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
                    minHeight: theme.layout?.spacing?.buttonHeight?.topIconsCompact || layout.spacing.buttonHeight.topIconsCompact,
                    justifyContent: "center",
                    px: theme.layout?.spacing?.padding?.xsmall || layout.spacing.padding.xsmall,
                    py: theme.layout?.spacing?.padding?.xsmall || layout.spacing.padding.xsmall,
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
                      gap: theme.layout?.spacing?.gap?.xxsmall || layout.spacing.gap.xxsmall,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        "& img": {
                          width: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                          height: theme.fontSize?.icon?.medium || fontSize.icon.medium,
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
                        lineHeight: theme.layout?.text?.lineHeight?.tight || layout.text.lineHeight.tight,
                        maxWidth: theme.layout?.text?.maxWidth?.iconLabel || layout.text.maxWidth.iconLabel,
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
                    minHeight: theme.layout?.spacing?.buttonHeight?.bottomIconsCompact || layout.spacing.buttonHeight.bottomIconsCompact,
                    justifyContent: "center",
                    px: theme.layout?.spacing?.padding?.xsmall || layout.spacing.padding.xsmall,
                    py: theme.layout?.spacing?.padding?.xxsmall || layout.spacing.padding.xxsmall,
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
                      gap: theme.layout?.spacing?.gap?.xxsmall || layout.spacing.gap.xxsmall,
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
                        "& img": {
                          width: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                          height: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                        },
                      }}
                    >
                      {isDarkMode ? <LightModeIcon /> : <MoonStarIcon />}
                    </Box>
                  </Box>
                </ListItemButton>
              </ListItem>

              {bottomSidebarItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    sx={{
                      minHeight: theme.layout?.spacing?.buttonHeight?.bottomIconsCompact || layout.spacing.buttonHeight.bottomIconsCompact,
                      justifyContent: "center",
                      px: theme.layout?.spacing?.padding?.xsmall || layout.spacing.padding.xsmall,
                      py: theme.layout?.spacing?.padding?.xxsmall || layout.spacing.padding.xxsmall,
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
                                              gap: theme.layout?.spacing?.gap?.xxsmall || layout.spacing.gap.xxsmall,
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
                    </Box>
                  </ListItemButton>
                </ListItem>
              ))}

              <ListItem disablePadding>
                                  <ListItemButton
                    sx={{
                      minHeight: theme.layout?.spacing?.buttonHeight?.bottomIconsCompact || layout.spacing.buttonHeight.bottomIconsCompact,
                      justifyContent: "center",
                      px: theme.layout?.spacing?.padding?.xsmall || layout.spacing.padding.xsmall,
                      py: theme.layout?.spacing?.padding?.xxsmall || layout.spacing.padding.xxsmall,
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
                      gap: theme.layout?.spacing?.gap?.xxsmall || layout.spacing.gap.xxsmall,
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
                      {/* <SubscriptionsIcon /> */}
                      <DynamicIcon keyword={"YOUTUBE"} style={{
                    color: ''// Use theme's primary text color for consistency
                  }}/>
                    </Box>
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
          width: theme.layout?.sidebar?.drawer?.width || layout.sidebar.drawer.width,
          flexShrink: 0,
          position: "fixed",
          "& .MuiDrawer-paper": {
            width: isMobile ? (theme.layout?.sidebar?.drawer?.mobileWidth || layout.sidebar.drawer.mobileWidth) : (theme.layout?.sidebar?.drawer?.width || layout.sidebar.drawer.width),
            boxSizing: "border-box",
            top: 0,
            height: "100%",
            zIndex: (theme) => theme.zIndex.appBar + 1,
            backgroundColor: `${isDarkMode ? theme.palette.background.default : theme.palette.background.default} !important`,
            backgroundImage: "none !important",
            borderLeft: `${theme.layout?.spacing?.border?.thin || layout.spacing.border.thin} solid`,
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
            p: theme.layout?.spacing?.padding?.medium || layout.spacing.padding.medium,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: theme.layout?.spacing?.gap?.small || layout.spacing.gap.small }}>
            <Image
              // src="/assets/icons/favicon.png"
              src={isDarkMode ? "/assets/icons/favicon-dark.png" : "/assets/icons/favicon.png"}
              alt="Logo"
              width={24}
              height={24}
            />
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
             Welcome User
            </Typography>
          </Box>
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
          <List >
            {sidebarItems.map((item) => (
              <ListItem divider key={item.text} disablePadding>
                <ListItemButton  onClick={() => handleIconClick(item.section_slug)}>
                  <ListItemIcon
                    sx={{
                      minWidth: theme.layout?.spacing?.iconContainer?.minWidth || layout.spacing.iconContainer.minWidth,
                      "& .MuiSvgIcon-root": {
                        fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                      },
                      "& img": {
                        width: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                        height: theme.fontSize?.icon?.medium || fontSize.icon.medium,
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
          <Box sx={{ p: theme.layout?.spacing?.padding?.xsmall || layout.spacing.padding.xsmall }}>
          <Divider />
            <List dense>
              <ListItem disablePadding>
                <ListItemButton onClick={onToggleTheme}>
                  <ListItemIcon
                    sx={{
                      minWidth: theme.layout?.spacing?.iconContainer?.minWidth || layout.spacing.iconContainer.minWidth,
                      "& .MuiSvgIcon-root": {
                        fontSize: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                      },
                      "& img": {
                        width: theme.fontSize?.icon?.medium || fontSize.icon.medium,
                        height: theme.fontSize?.icon?.medium || fontSize.icon.medium,
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
                        minWidth: theme.layout?.spacing?.iconContainer?.minWidth || layout.spacing.iconContainer.minWidth,
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
                  <DynamicIcon keyword={"YOUTUBE"} style={{
                    color: palette?.dark?.primary?.main// Use theme's primary text color for consistency
                  }}/>
                }
                sx={{
                  pr:11,
                  mb: theme.layout?.spacing?.padding?.small || layout.spacing.padding.small,
                  mt: 0,
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
