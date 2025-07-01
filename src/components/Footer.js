import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Feedback,
  YouTube,
} from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { fontStyles, fontSize, palette } from "../theme/theme";
import { DynamicIcon } from "./icons";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";

const LogoWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  position: "relative",
  width: "230px",
  height: "43px",
  marginLeft: " -25px",
  // border: "1px solid green",
});

// Mobile Footer Component
const MobileFooter = (props) => {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    validateEmail,
    validateForm,
  } = props;
  const theme = useTheme();
  const router = useRouter();
  const isDarkMode = theme.palette.mode === "dark";
  const { config, getUrl } = useContent();

  return (
    <Box
      sx={{
        py: 4,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo first */}
      <Box sx={{ mb: 4 }}>
        <LogoWrapper>
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
        </LogoWrapper>
      </Box>

      {/* Form second */}
      {/* <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: fontSize.typography.body1,
            ...fontStyles.openSans.semibold,
          }}
        >
          <DynamicIcon
            keyword={config.footer.icons.feedback}
            width={"20px"}
            height={"20px"}
            style={{
              color: isDarkMode
                ? palette?.dark?.primary?.main
                : palette?.light?.primary?.main,
            }}
          />
          {config.footer.feedbackTitle}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            size="small"
            label={config.forms.labels.name}
            variant="standard"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.42)"
                    : "1px solid rgba(0, 0, 0, 0.42)",
              },
              "& .MuiInputLabel-root": {
                fontSize: fontSize.form.label,
                ...fontStyles.openSans.regular,
              },
              "& .MuiInputBase-input": {
                fontSize: fontSize.form.label,
                ...fontStyles.openSans.regular,
              },
              "& .MuiFormHelperText-root": {
                fontSize: fontSize.form.helper,
                marginTop: "3px",
              },
            }}
          />
          <TextField
            size="small"
            label={config.forms.labels.feedbackEmail}
            type="email"
            variant="standard"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            sx={{
              "& .MuiInput-underline:before": {
                borderBottom:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.42)"
                    : "1px solid rgba(0, 0, 0, 0.42)",
              },
              "& .MuiInputLabel-root": {
                fontSize: fontSize.form.label,
                ...fontStyles.openSans.regular,
              },
              "& .MuiInputBase-input": {
                fontSize: fontSize.form.label,
                ...fontStyles.openSans.regular,
              },
              "& .MuiFormHelperText-root": {
                fontSize: fontSize.form.helper,
                marginTop: "3px",
              },
            }}
          />
          <TextField
            size="small"
            label={config.forms.labels.feedbackMessage}
            multiline
            rows={3}
            variant="standard"
            fullWidth
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={Boolean(errors.message)}
            helperText={errors.message}
            sx={{
              mb: 2,
              "& .MuiInput-underline:before": {
                borderBottom:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.42)"
                    : "1px solid rgba(0, 0, 0, 0.42)",
              },
              "& .MuiInputLabel-root": {
                fontSize: fontSize.form.label,
                ...fontStyles.openSans.regular,
              },
              "& .MuiInputBase-input": {
                fontSize: fontSize.form.label,
                ...fontStyles.openSans.regular,
              },
              "& .MuiFormHelperText-root": {
                fontSize: fontSize.form.helper,
                marginTop: "3px",
              },
            }}
          />
          <Button
            type="submit"
            sx={{
              minWidth: 150,
              color: "text.primary",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor: "transparent",
                color: "primary.main",
              },
              textTransform: "none",
              p: 0,
              width: "100%",
              marginRight: "auto",
              marginLeft: "auto",
              fontSize: fontSize.button.medium,
              ...fontStyles.sfPro.display.bold,
            }}
          >
            {config.footer.sendMessage}
          </Button>
        </Box>
      </Box> */}

      {/* Vertical Divider */}
      <Divider orientation="horizontal" flexItem sx={{ mb: 2 }} />

      {/* Links third */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 1. Let's find true value here text */}
        <Typography
          variant="h6"
          color="primary.main"
          sx={{
            fontSize: fontSize.typography.body1,
            mb: 1,
            ...fontStyles.montserrat.bold,
          }}
        >
          {config.footer.slogan}
        </Typography>

        {/* 2. grow@moneytv.live link */}
        <Typography
          color="primary.main"
          onClick={() =>
            window.open(`mailto:${getUrl("external", "contactEmail")}`, "_self")
          }
          sx={{
            display: "block",
            mb: 2,
            textDecoration: "underline",
            fontSize: fontSize.nav.primary,
            ...fontStyles.openSans.regular,
            cursor: "pointer",
            "&:hover": {
              color: "primary.dark",
            },
          }}
        >
          {getUrl("external", "contactEmail")}
        </Typography>

        {/* 3. Social media icons */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
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

        {/* 4. Privacy, Terms, Help links in a row */}
        <Stack direction="row" spacing={2}>
          {/* <Typography
            color="primary.main"
            onClick={() => router.push(getUrl('external', 'privacy'))}
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              "&:hover": {
                color: "primary.dark",
              }
            }}
          >
            {config.footer.links.privacyPolicy}
          </Typography>
          <Typography
            color="primary.main"
            onClick={() => router.push(getUrl('external', 'terms'))}
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              "&:hover": {
                color: "primary.dark",
              }
            }}
          >
            {config.footer.links.termsOfUse}
          </Typography> */}
          {/* <Typography
            color="primary.main"
            onClick={() => router.push(getUrl('external', 'help'))}
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              "&:hover": {
                color: "primary.dark",
              }
            }}
          >
            {config.footer.links.help}
          </Typography> */}
        </Stack>

        {/* 5. Additional footer links - First group */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Typography
            color="primary.main"
            onClick={() => {}}
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {config.footer.links.mpu}
          </Typography>
          <Typography
            color="primary.main"
            onClick={() => {}}
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {config.footer.links.sib}
          </Typography>
        </Stack>

        {/* 6. Additional footer links - Second group */}
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Typography
            color="primary.main"
            onClick={() => {}}
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {config.footer.links.kyp}
          </Typography>
          <Typography
            color="primary.main"
            onClick={() => {}}
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {config.footer.links.ray}
          </Typography>
        </Stack>

        {/* Horizontal Divider between second and third group */}
        <Divider orientation="horizontal" flexItem sx={{ mt: 3, mb: 2 }} />

        {/* 7. Additional footer links - Third group */}
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Typography
            color="primary.main"
            onClick={() =>
              window.open(
                "http://money-tv-dev.s3-website.ap-south-1.amazonaws.com/MTV-Web/index.html",
                "_blank"
              )
            }
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {config.footer.links.aboutUs}
          </Typography>
          <Typography
            color="primary.main"
            onClick={() =>
              window.open(
                "http://money-tv-dev.s3-website.ap-south-1.amazonaws.com/MTV-Web/index.html#contact_area",
                "_blank"
              )
            }
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {config.footer.links.contactUs}
          </Typography>
        </Stack>

        {/* 8. Terms & Conditions link */}
        <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
          <Typography
            color="primary.main"
            onClick={() => router.push(getUrl("external", "privacy"))}
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {config.footer.links.privacyPolicy}
          </Typography>

          <Typography
            color="primary.main"
            onClick={() => router.push(getUrl("external", "terms"))}
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
              cursor: "pointer",
              textDecoration: "underline",
              "&:hover": {
                color: "primary.dark",
              },
            }}
          >
            {config.footer.links.termsCondition}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

// Main Footer Component
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDarkMode = theme.palette.mode === "dark";
  const { config, getUrl } = useContent();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    let tempErrors = {
      name: "",
      email: "",
      message: "",
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = config.forms.validation.required;
      isValid = false;
    } else if (formData.name.length < 2) {
      tempErrors.name = config.forms.validation.nameMinLength;
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      tempErrors.email = config.forms.validation.required;
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = config.forms.validation.invalidEmail;
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      tempErrors.message = config.forms.validation.required;
      isValid = false;
    } else if (formData.message.length < 10) {
      tempErrors.message = config.forms.validation.messageMinLength;
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle successful form submission here
      console.log("Form submitted:", formData);
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  // Desktop Footer (original unchanged)
  const renderDesktopFooter = () => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 4,
        }}
      >
        {/* First Section - Logo and Contact */}
        <Box sx={{ flex: 1, paddingY: 4 }}>
          <Box sx={{ mb: 6 }}>
            <LogoWrapper>
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
            </LogoWrapper>
          </Box>

          <Box>
            <Typography
              color="primary.main"
              sx={{
                fontSize: fontSize.typography.body2,
                ...fontStyles.montserrat.bold,
              }}
            >
              {config.footer.slogan}
            </Typography>
            <Typography
              color="primary.main"
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
                fontSize: fontSize.nav.primary,
                ...fontStyles.openSans.regular,
                cursor: "pointer",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {getUrl("external", "contactEmail")}
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
        </Box>
        {/* Vertical Divider */}
        <Divider orientation="vertical" flexItem sx={{ mx: 2, my: 5 }} />

        {/* Second Section - First Group of Links */}
        <Box sx={{ flex: 1, paddingTop: 7 }}>
          <Stack spacing={2}>
            <Typography
              color="primary.main"
              onClick={() => {}}
              sx={{
                fontSize: fontSize.nav.primary,
                ...fontStyles.openSans.regular,
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {config.footer.links.mpu}
            </Typography>

            <Typography
              color="primary.main"
              onClick={() => {}}
              sx={{
                fontSize: fontSize.nav.primary,
                ...fontStyles.openSans.regular,
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {config.footer.links.sib}
            </Typography>

            <Typography
              color="primary.main"
              onClick={() => {}}
              sx={{
                fontSize: fontSize.nav.primary,
                ...fontStyles.openSans.regular,
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {config.footer.links.kyp}
            </Typography>

            <Typography
              color="primary.main"
              onClick={() => {}}
              sx={{
                fontSize: fontSize.nav.primary,
                ...fontStyles.openSans.regular,
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {config.footer.links.ray}
            </Typography>
          </Stack>
        </Box>

        {/* Vertical Divider */}
        <Divider orientation="vertical" flexItem sx={{ mx: 2, my: 5 }} />

        {/* Third Section - Second Group of Links */}
        <Box sx={{ flex: 1, paddingTop: 7 }}>
          <Stack spacing={2}>
            <Typography
              color="primary.main"
              onClick={() =>
                window.open(
                  "http://money-tv-dev.s3-website.ap-south-1.amazonaws.com/MTV-Web/index.html",
                  "_blank"
                )
              }
              sx={{
                fontSize: fontSize.nav.primary,
                ...fontStyles.openSans.regular,
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {config.footer.links.aboutUs}
            </Typography>

            <Typography
              color="primary.main"
              onClick={() =>
                window.open(
                  "http://money-tv-dev.s3-website.ap-south-1.amazonaws.com/MTV-Web/index.html#contact_area",
                  "_blank"
                )
              }
              sx={{
                fontSize: fontSize.nav.primary,
                ...fontStyles.openSans.regular,
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {config.footer.links.contactUs}
            </Typography>

            <Typography
              color="primary.main"
              onClick={() => router.push(getUrl("external", "privacy"))}
              sx={{
                fontSize: fontSize.nav.primary,
                ...fontStyles.openSans.regular,
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {config.footer.links.privacyPolicy}
            </Typography>

            <Typography
              color="primary.main"
              onClick={() => router.push(getUrl("external", "terms"))}
              sx={{
                fontSize: fontSize.nav.primary,
                ...fontStyles.openSans.regular,
                cursor: "pointer",
                textDecoration: "underline",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              {config.footer.links.termsCondition}
            </Typography>
          </Stack>
        </Box>
        {/* Right Side - Feedback Form */}
        {/* <Box sx={{ flex: 1, padding: 4 }}>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: fontSize.typography.h5,
              ...fontStyles.openSans.semibold,
            }}
          >
            <DynamicIcon
              keyword={config.footer.icons.feedback}
              width={"20px"}
              height={"20px"}
              style={{
                color: isDarkMode
                  ? palette?.dark?.primary?.main
                  : palette?.light?.primary?.main,
              }}
            />
            {config.footer.feedbackTitle}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
              <TextField
                size="small"
                label={config.forms.labels.name}
                variant="standard"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottom:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.42)"
                        : "1px solid rgba(0, 0, 0, 0.42)",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: fontSize.form.label,
                    ...fontStyles.openSans.regular,
                  },
                  "& .MuiInputBase-input": {
                    fontSize: fontSize.form.label,
                    ...fontStyles.openSans.regular,
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: fontSize.form.helper,
                    marginTop: "3px",
                  },
                }}
              />
              <TextField
                size="small"
                label={config.forms.labels.feedbackEmail}
                type="email"
                variant="standard"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                sx={{
                  "& .MuiInput-underline:before": {
                    borderBottom:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.42)"
                        : "1px solid rgba(0, 0, 0, 0.42)",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: fontSize.form.label,
                    ...fontStyles.openSans.regular,
                  },
                  "& .MuiInputBase-input": {
                    fontSize: fontSize.form.label,
                    ...fontStyles.openSans.regular,
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: fontSize.form.helper,
                    marginTop: "3px",
                  },
                }}
              />
            </Box>
            <TextField
              size="small"
              label={config.forms.labels.feedbackMessage}
              multiline
              rows={3}
              variant="standard"
              fullWidth
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={Boolean(errors.message)}
              helperText={errors.message}
              sx={{
                mb: 2,
                "& .MuiInput-underline:before": {
                  borderBottom:
                    theme.palette.mode === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.42)"
                      : "1px solid rgba(0, 0, 0, 0.42)",
                },
                "& .MuiInputLabel-root": {
                  fontSize: fontSize.form.label,
                  ...fontStyles.openSans.regular,
                },
                "& .MuiInputBase-input": {
                  fontSize: fontSize.form.label,
                  ...fontStyles.openSans.regular,
                },
                "& .MuiFormHelperText-root": {
                  fontSize: fontSize.form.helper,
                  marginTop: "3px",
                },
              }}
            />
            <Button
              type="submit"
              sx={{
                minWidth: 150,
                color: "text.primary",
                backgroundColor: "transparent",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "primary.main",
                },
                textTransform: "none",
                p: 0,
                width: "100%",
                marginRight: "auto",
                marginLeft: "auto",
                fontSize: fontSize.button.medium,
                ...fontStyles.sfPro.display.bold,
              }}
            >
              {config.footer.sendMessage}
            </Button>
          </Box>
        </Box> */}
      </Box>
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        bgcolor:
          theme.palette.mode === "dark"
            ? palette.dark.background.default
            : palette.light.background.footer,
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Container maxWidth="lg">
        {isMobile ? (
          <MobileFooter
            formData={formData}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            validateEmail={validateEmail}
            validateForm={validateForm}
          />
        ) : (
          renderDesktopFooter()
        )}
      </Container>
    </Box>
  );
};

export default Footer;
