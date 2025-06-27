import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import Lottie from "lottie-react";
import sadAnimationData from "../../public/assets/animated-icons/sad-animation.json";
import sadAnimationDataWhite from "../../public/assets/animated-icons/sad-animation-white.json";
import { fontSize, fontStyles } from "@/theme/theme";
import createAxiosInstance from "@/configs/axios";

const NoVideosFound = ({ searchQuery = "Lorem Ipsum", mtvCode }) => {
  const axiosInstance = createAxiosInstance();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  // Function to truncate search query for display
  const truncateSearchQuery = (query, maxLength = 30) => {
    if (!query || query.length <= maxLength) return query;
    return query.substring(0, maxLength) + "...";
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // success | error
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!email.trim()) {
        setEmailError("Email is required");
        return;
      }

      if (!validateEmail(email)) {
        setEmailError("Please enter a valid email");
        return;
      }

      // Here you would typically handle the submission
      const response = await axiosInstance.post("/notifyMe", {
        email: email,
        search_query: searchQuery,
        mtv_code: mtvCode,
      });
      const successMessage = response?.data?.message;
      setEmail("");
      setEmailError("");
      setSnackbar({
        open: true,
        message: successMessage,
        severity: "success",
      });
      // Show success message or feedback
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      setEmailError(message);
      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
    }
  };

  const SadEmoji = () => (
    <Lottie
      animationData={isDarkMode ? sadAnimationDataWhite : sadAnimationData}
      style={{
        width: isMobile ? 70 : 150,
        height: isMobile ? 70 : 150,
        transform: `translateY(${isMobile ? "8px" : "15px"})`, // Move animation down to overlap more
      }}
      loop={true}
      autoplay={true}
    />
  );

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: isMobile ? 1 : 2, sm: 4 },
        m: { xs: 1, sm: 4 },
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
    >
      <Grid container spacing={2}>
        {/* Left side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRight: {
              xs: "none",
              md: `1px solid ${theme.palette.divider}`,
            },
            pr: { xs: 0, md: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: isMobile ? -1 : -1, // Negative margin to overlap with text below
              position: "relative",
              zIndex: 1,
            }}
          >
            <SadEmoji />
          </Box>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            align="center"
            sx={{
              ...fontStyles.sfPro.display.regular,
              mt: 0, // Remove any top margin
              position: "relative",
              zIndex: 2,
            }}
          >
            No Videos found for
          </Typography>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            gutterBottom
            align="center"
            color="primary"
            sx={{
              ...fontStyles.sfPro.display.bold,
              wordBreak: "break-word", // Handle very long words
              overflowWrap: "break-word", // Handle overflow
            }}
            title={searchQuery} // Show full text on hover
          >
            "{truncateSearchQuery(searchQuery, isMobile ? 20 : 30)}"
          </Typography>
        </Grid>

        {/* Right side */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            pl: { xs: 0, md: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "stretch", md: "center" },
            px: isMobile ? 0 : 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              textAlign: { xs: "center", md: "center" },
              width: "100%",
            }}
          >
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{
                // mb: 0.5,
                ...fontStyles.sfPro.display.regular,
                lineHeight: 1.3,
              }}
            >
              We're working hard to fulfil <br /> your video request. <br />{" "}
              <span style={{ ...fontStyles.sfPro.display.bold }}>
                You'll have the video soon!
              </span>
            </Typography>
            {/* <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{
                // fontWeight: 400,
                // mb: 0.5,
                // mt: -0.5,
                ...fontStyles.sfPro.display.regular,
              }}
            >
              your video request.
            </Typography> */}
            {/* <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{
                // mt: -0.5,
                ...fontStyles.sfPro.display.bold,
              }}
            >
              You'll have the video soon!
            </Typography> */}

            {/* Mobile only divider - moved below the text */}
            {isMobile && <Divider sx={{ width: "100%", my: 2 }} />}

            <Typography
              variant="body2"
              color="primary"
              sx={{
                mt: isMobile ? 1 : 4,
                mb: isMobile ? 0.7 : 1,
                ...fontStyles.sfPro.display.bold,
              }}
            >
              Notify me when it's there.
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                width: "100%",
                minWidth: isMobile ? 220 : "auto",
                maxWidth: isMobile ? "100%" : 300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                px: isMobile ? 1 : 0,
              }}
            >
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Enter Your Email ID"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                error={Boolean(emailError)}
                helperText={emailError}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? theme.palette.background.default
                        : theme.palette.grey[100],
                    "& fieldset": {
                      border: "none",
                    },
                    borderRadius: 0,
                    fontSize: fontSize.form.label,
                    ...fontStyles.sfPro.text.regular,
                  },
                  "& .MuiInputBase-input": {
                    fontSize: fontSize.form.label,
                    ...fontStyles.sfPro.text.regular,
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: fontSize.form.helper,
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                  textTransform: "none",
                  width: "100%",
                  borderRadius: 0,
                  ...fontStyles.sfPro.display.bold,
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default NoVideosFound;
