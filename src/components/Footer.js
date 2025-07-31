import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
  Grid,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { fontStyles, fontSize, palette } from "../theme/theme";
import { DynamicIcon } from "./icons";
import { useContent } from "@/hooks/useContent";
import { useMain } from "@/context/MainContext";
import { chunk } from "lodash"; // or write a simple custom chunk function

// Mobile Footer Component
const MobileFooter = ({ sidebarItems, sidebarClickHandler }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { config, getUrl } = useContent();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pb: 4,
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="footerKeyTopics"
          sx={{ ...fontStyles.openSans.regular }}
        >
          <Typography
            component={"span"}
            variant="footerKeyTopics"
            sx={{ ...fontStyles.openSans.bold }}
          >
            Key Topics:
          </Typography>{" "}
          Stock Market | Mutual Funds | Personal Finance | Financial Planning |
          Passive Income | Stock Market For Beginners | Wealth Management | How
          To | Invest In Stocks | Investment Strategies | Stock Analysis |
          Retirement Planning | Financial Education | Market Analysis |
          Systematic Investment Plan | Investment Tips | Tax Saving Investments
          | Equity Investments | Investment Guide | Portfolio Management | Stock
          Picks | Financial Literacy | Stock Market Trends | Small Cap Stocks |
          Long Term Investment | Sector Trends | Mid Cap Stocks | Financial
          Decision Making | SME IPO | Alternative Investment Funds | PMS
          Investment
        </Typography>
      </Box>

      {/* Logo */}
      <Box sx={{ mt: 6, mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            width: "300px",
            height: "60px",
          }}
        >
          <Image
            src={
              isDarkMode
                ? "/images/logos/footer-logo-light.png"
                : "/images/logos/footer-logo-dark.png"
            }
            alt="Money TV Logo"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>
      </Box>

      {/* Vertical Divider */}
      {/* <Divider orientation="horizontal" flexItem sx={{ mb: 2 }} /> */}

      {/* Links Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Slogan */}
        <Typography
          variant="footerSlogan"
          color="primary.main"
          sx={{
            ...fontStyles.montserrat.bold,
          }}
        >
          {config.footer.slogan}
        </Typography>

        {/* Contact Email */}
        <Typography
          color="primary.main"
          variant="footerEmail"
          onClick={() =>
            window.open(`mailto:${getUrl("external", "contactEmail")}`, "_self")
          }
          sx={{
            display: "block",
            textDecoration: "underline",
            ...fontStyles.openSans.regular,
            cursor: "pointer",
            "&:hover": {
              color: "primary.dark",
            },
          }}
        >
          {getUrl("external", "contactEmail")}
        </Typography>

        {/* First Group of Links */}

        <Grid container mt={5}>
          <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
            <Typography
              variant="footerHeader"
              sx={{ textAlign: "center", ...fontStyles.openSans.bold }}
            >
              MONEY TV SERIES
            </Typography>
            <Stack
              direction="column"
              spacing={1.5}
              sx={{ mt: 2, alignItems: "center" }}
            >
              {sidebarItems?.map((item) => (
                <Typography
                  key={item.keyword}
                  color="primary.main"
                  variant="footerLinks"
                  onClick={() => sidebarClickHandler(item)}
                  sx={{
                    ...fontStyles.openSans.regular,
                    cursor: "pointer",
                    "&:hover": {
                      color: "primary.dark",
                    },
                  }}
                >
                  {item.keyword + " - " + item.name}
                </Typography>
              ))}
            </Stack>
          </Grid>
        </Grid>

        {/* Horizontal Divider */}
        {/* <Divider orientation="horizontal" flexItem sx={{ mt: 3, mb: 2 }} /> */}

        {/* Second Group of Links */}
        <Grid container mt={5}>
          <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
            <Typography
              variant="footerHeader"
              sx={{ textAlign: "center", ...fontStyles.openSans.bold }}
            >
              COMPANY
            </Typography>
            <Stack
              direction="column"
              spacing={1.5}
              sx={{ mt: 2, alignItems: "center" }}
            >
              <Typography
                color="primary.main"
                variant="footerLinks"
                onClick={() =>
                  window.open("https://moneytv.live/about/", "_blank")
                }
                sx={{
                  ...fontStyles.openSans.regular,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {config.footer.links.aboutUs}
              </Typography>
              <Typography
                color="primary.main"
                variant="footerLinks"
                onClick={() =>
                  window.open(
                    "http://money-tv-dev.s3-website.ap-south-1.amazonaws.com/MTV-Web/index.html#contact_area",
                    "_blank"
                  )
                }
                sx={{
                  ...fontStyles.openSans.regular,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {config.footer.links.contactUs}
              </Typography>
              <Typography
                color="primary.main"
                variant="footerLinks"
                onClick={() =>
                  window.open(getUrl("external", "privacy"), "_blank")
                }
                sx={{
                  ...fontStyles.openSans.regular,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {config.footer.links.privacyPolicy}
              </Typography>
              <Typography
                color="primary.main"
                variant="footerLinks"
                onClick={() =>
                  window.open(getUrl("external", "terms"), "_blank")
                }
                sx={{
                  ...fontStyles.openSans.regular,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {config.footer.links.termsCondition}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

// Desktop Footer Component
const DesktopFooter = ({ sidebarItems, sidebarClickHandler }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const { config, getUrl } = useContent();
  const chunkedSidebarItems = chunk(sidebarItems, 4);
  const columnCount = Math.ceil(sidebarItems.length / 4);
  const gridMdSize = Math.min(columnCount * 2.5, 12);

  return (
    <>
      <Box>
        <Typography
          variant="footerKeyTopics"
          sx={{ ...fontStyles.openSans.regular }}
        >
          <Typography
            component={"span"}
            variant="footerKeyTopics"
            sx={{ ...fontStyles.openSans.bold }}
          >
            Key Topics:
          </Typography>{" "}
          Stock Market | Mutual Funds | Personal Finance | Financial Planning |
          Passive Income | Stock Market For Beginners | Wealth Management | How
          To | Invest In Stocks | Investment Strategies | Stock Analysis |
          Retirement Planning | Financial Education | Market Analysis |
          Systematic Investment Plan | Investment Tips | Tax Saving Investments
          | Equity Investments | Investment Guide | Portfolio Management | Stock
          Picks | Financial Literacy | Stock Market Trends | Small Cap Stocks |
          Long Term Investment | Sector Trends | Mid Cap Stocks | Financial
          Decision Making | SME IPO | Alternative Investment Funds | PMS
          Investment
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 4,
        }}
      >
        {/* Keywords */}

        {/* First Section - Logo and Contact */}

        <Grid container spacing={2} sx={{ pt: 4, pb: 0 }}>
          <Grid item md={2.5}>
            <Box sx={{ mb: 5 }}>
              <Box
                mt={0.5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  width: "230px",
                  height: "43px",
                  marginLeft: " -25px",
                }}
              >
                <Image
                  src={
                    isDarkMode
                      ? "/images/logos/footer-logo-light.png"
                      : "/images/logos/footer-logo-dark.png"
                  }
                  alt="Money TV Logo"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>
            </Box>

            <Box>
              <Typography
                color="primary.main"
                variant="footerSlogan"
                sx={{
                  ...fontStyles.montserrat.bold,
                }}
              >
                {config.footer.slogan}
              </Typography>
              <Typography
                color="primary.main"
                variant="footerEmail"
                onClick={() =>
                  window.open(
                    `mailto:${getUrl("external", "contactEmail")}`,
                    "_self"
                  )
                }
                sx={{
                  display: "block",
                  mb: 3,
                  textDecoration: "underline",
                  ...fontStyles.openSans.regular,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {getUrl("external", "contactEmail")}
              </Typography>
            </Box>
          </Grid>

          {/* Vertical Divider */}
          {/* <Divider orientation="vertical" flexItem sx={{ mx: 2, my: 5 }} /> */}

          {/* Second Section - First Group of Links */}
          <Grid item md={gridMdSize}>
            <Typography
              variant="footerHeader"
              sx={{ ...fontStyles.openSans.bold }}
            >
              MONEY TV SERIES
            </Typography>

            <Grid container spacing={4}>
              {chunkedSidebarItems.map((group, colIndex) => (
                <Grid item key={colIndex} sx={{ mt: 2 }}>
                  <Stack spacing={1}>
                    {group.map((item) => (
                      <Typography
                        key={item.keyword}
                        color="primary.main"
                        variant="footerLinks"
                        onClick={() => sidebarClickHandler(item)}
                        sx={{
                          ...fontStyles.openSans.regular,
                          cursor: "pointer",
                          "&:hover": {
                            color: "primary.dark",
                          },
                        }}
                      >
                        {item.keyword + " - " + item.name}
                      </Typography>
                    ))}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* COMPANY Section */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="footerHeader"
              sx={{ ...fontStyles.openSans.bold }}
            >
              COMPANY
            </Typography>
            <Stack spacing={1} mt={1.5}>
              <Typography
                color="primary.main"
                variant="footerLinks"
                onClick={() =>
                  window.open("https://moneytv.live/about/", "_blank")
                }
                sx={{
                  ...fontStyles.openSans.regular,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {config.footer.links.aboutUs}
              </Typography>
              <Typography
                color="primary.main"
                variant="footerLinks"
                onClick={() =>
                  window.open(
                    "http://money-tv-dev.s3-website.ap-south-1.amazonaws.com/MTV-Web/index.html#contact_area",
                    "_blank"
                  )
                }
                sx={{
                  ...fontStyles.openSans.regular,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {config.footer.links.contactUs}
              </Typography>
              <Typography
                color="primary.main"
                variant="footerLinks"
                onClick={() =>
                  window.open(getUrl("external", "privacy"), "_blank")
                }
                sx={{
                  ...fontStyles.openSans.regular,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {config.footer.links.privacyPolicy}
              </Typography>
              <Typography
                color="primary.main"
                variant="footerLinks"
                onClick={() =>
                  window.open(getUrl("external", "terms"), "_blank")
                }
                sx={{
                  ...fontStyles.openSans.regular,
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
              >
                {config.footer.links.termsCondition}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

// Main Footer Component
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { fetchSideBarData } = useMain();
  const [sidebarItems, setSidebarItems] = useState([]);
  const { config, getUrl } = useContent();
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    const SidebarData = async () => {
      const res = await fetchSideBarData();
      const data = res?.data?.response?.data;
      setSidebarItems(data);
    };
    SidebarData();
  }, []);

  const sidebarClickHandler = (item) => {
    if (item.section_slug) {
      router.push(`/${item.section_slug}`);
    }
  };

  return (
    <>
      <Box
        mt={isMobile ? 7 : 8}
        component="footer"
        sx={{
          pt: {
            xs: 4,
            sm: 4,
            md: 5,
            lg: 5,
            xl: 8,
          },
          pb: 2.5,
          bgcolor:
            theme.palette.mode === "dark"
              ? palette.dark.background.default
              : palette.light.background.footer,
          borderTop: 1,
          borderColor: "divider",
          px: {
            xs: 1.6,
            sm: 2,
            md: 3.5,
            lg: 3.5,
            xl: 6,
          },
        }}
      >
        <Container maxWidth="xl">
          {isMobile ? (
            <MobileFooter
              sidebarItems={sidebarItems}
              sidebarClickHandler={sidebarClickHandler}
            />
          ) : (
            <DesktopFooter
              sidebarItems={sidebarItems}
              sidebarClickHandler={sidebarClickHandler}
            />
          )}
        </Container>
      </Box>

      {/* Visible for desktop only */}

      {isMobile ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 2.5,
            bgcolor:
              theme.palette.mode === "dark"
                ? palette.dark.background.default
                : palette.light.background.footer,
            borderTop: 1,
            borderColor: "divider",
            px: 5.5,
            gap: 3,
          }}
        >
          <Stack direction="row" spacing={2}>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerYoutube"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                width={"38px"}
                height={"38px"}
                keyword={config.footer.icons.youtube}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerInstagram"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                width={"28px"}
                height={"28px"}
                keyword={config.footer.icons.instagram}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerTwitter"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                width={"28px"}
                height={"28px"}
                keyword={config.footer.icons.twitter}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerLinkedin"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                width={"28px"}
                height={"28px"}
                keyword={config.footer.icons.linkedin}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerFacebook"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                width={"28px"}
                height={"28px"}
                keyword={config.footer.icons.facebook}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
          </Stack>
          <Typography
            variant="footerCopyright"
            sx={{
              ...fontStyles.montserrat.regular,
            }}
          >
            ©2025 Money TV. All Rights Reserved
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
            bgcolor:
              theme.palette.mode === "dark"
                ? palette.dark.background.default
                : palette.light.background.footer,
            borderTop: 1,
            borderColor: "divider",
            px: 5.5,
          }}
        >
          <Typography
            variant="footerCopyright"
            sx={{
              ...fontStyles.montserrat.regular,
            }}
          >
            ©2025 Money TV. All Rights Reserved
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerYoutube"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                width={"30px"}
                height={"30px"}
                keyword={config.footer.icons.youtube}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerInstagram"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                keyword={config.footer.icons.instagram}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerTwitter"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                keyword={config.footer.icons.twitter}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerLinkedin"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                keyword={config.footer.icons.linkedin}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
            <IconButton
              size="small"
              onClick={() =>
                window.open(getUrl("social", "footerFacebook"), "_blank")
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: fontSize.icon.medium,
                  color: "primary.main",
                },
              }}
            >
              <DynamicIcon
                keyword={config.footer.icons.facebook}
                style={{
                  color: isDarkMode ? palette?.dark?.primary?.main : "",
                }}
              />
            </IconButton>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Footer;
