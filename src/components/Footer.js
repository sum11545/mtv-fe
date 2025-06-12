import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Link,
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
import styled from "@emotion/styled";
import { fontStyles, fontSize, palette } from "../theme/theme";
import { DynamicIcon } from "./icons";

const LogoWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  position: "relative",
  // width: "120px",
  height: "40px",
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
  const isDarkMode = theme.palette.mode === "dark";

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
            height={230}
            width={230}
            style={{ objectFit: "contain" }}
            priority
          />
        </LogoWrapper>
      </Box>

      {/* Form second */}
      <Box sx={{ mb: 4 }}>
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
          <Feedback sx={{ fontSize: fontSize.typography.subtitle1 }} /> Send
          Feedback
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            size="small"
            label="Name"
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
            label="Email"
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
            label="Message"
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
            Send Message
          </Button>
        </Box>
      </Box>

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
          Let's 'find true value here.'
        </Typography>

        {/* 2. grow@moneytv.live link */}
        <Link
          href="#"
          sx={{
            display: "block",
            mb: 2,
            fontSize: fontSize.nav.primary,
            ...fontStyles.openSans.regular,
          }}
        >
          grow@moneytv.live
        </Link>

        {/* 3. Social media icons */}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: fontSize.icon.medium,
                color: "primary.main",
              },
            }}
          >
           
          </IconButton>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: fontSize.icon.medium,
                color: "primary.main",
              },
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: fontSize.icon.medium,
                color: "primary.main",
              },
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: fontSize.icon.medium,
                color: "primary.main",
              },
            }}
          >
            <LinkedIn />
          </IconButton>
          <IconButton
            size="small"
            sx={{
              "& .MuiSvgIcon-root": {
                fontSize: fontSize.icon.medium,
                color: "primary.main",
              },
            }}
          >
            <Facebook />
          </IconButton>
        </Stack>

        {/* 4. Privacy, Terms, Help links in a row */}
        <Stack direction="row" spacing={2}>
          <Link
            href="#"
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
            }}
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
            }}
          >
            Terms of Use
          </Link>
          <Link
            href="#"
            sx={{
              fontSize: fontSize.nav.primary,
              ...fontStyles.openSans.regular,
            }}
          >
            Help
          </Link>
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
      tempErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.length < 2) {
      tempErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      tempErrors.message = "Message must be at least 10 characters";
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
  const renderDesktopFooter = () => (
    <Box
      sx={{
        display: "flex",
        gap: 4,
      }}
    >
      {/* Left Side */}
      <Box sx={{ flex: 1, paddingY: 4 }}>
        <Box sx={{ mb: 3 }}>
          <LogoWrapper>
            <Image
              src={
                isDarkMode
                  ? "/images/logos/footer-logo-light.png"
                  : "/images/logos/footer-logo-dark.png"
              }
              alt="Money TV Logo"
              height={230}
              width={230}
              style={{ objectFit: "contain" }}
              priority
            />
          </LogoWrapper>
        </Box>

        {/* <Divider sx={{ mb: 3 }} /> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            gap: 4,
            mt: 6,
          }}
        >
          {/* Left section after divider */}
          <Box>
            <Typography
              color="primary.main"
              sx={{
                fontSize: fontSize.typography.body2,
                ...fontStyles.montserrat.bold,
              }}
            >
              Let's 'find true value here.'
            </Typography>
            <Link
              href="#"
              sx={{ display: "block", mb: 2, fontSize: fontSize.nav.primary, ...fontStyles.openSans.small }}
            >
              grow@moneytv.live
            </Link>
            <Stack direction="row" spacing={1}>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: fontSize.icon.medium,
                    color: "primary.main",
                  },
                }}
              >
            
                 <DynamicIcon width={"30px"} height={"30px"} keyword={"YT"} style={{
          color: isDarkMode ? palette?.dark?.primary?.main : '' // Use theme's primary text color for consistency
        }}/>
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: fontSize.icon.medium,
                    color: "primary.main",
                  },
                }}
              >
                {/* <Instagram /> */}
                <DynamicIcon  keyword={"INSTA"} style={{
          color: isDarkMode ? palette?.dark?.primary?.main : '' // Use theme's primary text color for consistency
        }}/>

              </IconButton>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: fontSize.icon.medium,
                    color: "primary.main",
                  },
                }}
              >
                {/* <Twitter /> */}
                <DynamicIcon keyword={"X"} style={{
          color: isDarkMode ? palette?.dark?.primary?.main : '' // Use theme's primary text color for consistency
        }}/>
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: fontSize.icon.medium,
                    color: "primary.main",
                  },
                }}
              >
                {/* <LinkedIn /> */}
                <DynamicIcon keyword={"IN"} style={{
          color: isDarkMode ? palette?.dark?.primary?.main : '' // Use theme's primary text color for consistency
        }}/>
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: fontSize.icon.medium,
                    color: "primary.main",
                  },
                }}
              >
                {/* <Facebook /> */}
                <DynamicIcon keyword={"FB"} style={{
          color: isDarkMode ? palette?.dark?.primary?.main : '' // Use theme's primary text color for consistency
        }}/>
              </IconButton>
            </Stack>
          </Box>

          {/* Vertical Divider */}
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />

          {/* Right section */}
          <Box>
            <Stack spacing={1}>
              <Link href="#" sx={{ fontSize: fontSize.nav.primary }}>
                Privacy Policy
              </Link>
              <Link href="#" sx={{ fontSize: fontSize.nav.primary }}>
                Terms of Use
              </Link>
              <Link href="#" sx={{ fontSize: fontSize.nav.primary }}>
                Help
              </Link>
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Right Side - Feedback Form */}
      <Box sx={{ flex: 1, padding: 4 }}>
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
          {/* <Feedback sx={{ fontSize: fontSize.typography.subtitle1 }} />  */}
          <DynamicIcon keyword={"FEEDBACK"} width={"20px"} height={"20px"} style={{
            color: isDarkMode ? palette?.dark?.primary?.main : palette?.light?.primary?.main // Use theme's primary text color for consistency
          }}/>
          Send
          Feedback
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <TextField
              size="small"
              label="Name"
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
              label="Email"
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
            label="Message"
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
            Send Message
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        bgcolor: theme.palette.mode === "dark" ? palette.dark.background.default : palette.light.background.footer,
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
