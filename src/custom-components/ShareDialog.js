import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Button,
  TextField,
  Snackbar,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  WhatsApp,
  Facebook,
  Twitter,
  LinkedIn,
  Reddit,
  Email,
  Telegram,
  ContentCopy,
  Check,
} from "@mui/icons-material";
import { fontStyles, fontSize } from "../theme/theme";
import { useContent } from "../hooks/useContent";

const ShareDialog = ({ open, onClose, url, title, videoUrl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { getSocialUrl } = useContent();

  // Social platforms configuration - using getSocialUrl for consistent URL formatting
  const socialPlatforms = [
    {
      name: "WhatsApp",
      icon: WhatsApp,
      color: "#25D366",
      shareUrl: (url, title) => getSocialUrl("whatsapp", url, videoUrl),
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "#1877F2",
      shareUrl: (url) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "#1DA1F2",
      shareUrl: (url, title) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: LinkedIn,
      color: "#0A66C2",
      shareUrl: (url, title) =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
    },
    {
      name: "Reddit",
      icon: Reddit,
      color: "#FF4500",
      shareUrl: (url, title) =>
        `https://reddit.com/submit?url=${encodeURIComponent(url)}`,
    },
    {
      name: "Email",
      icon: Email,
      color: "#EA4335",
      shareUrl: (url, title) => `mailto:?body=${encodeURIComponent(url)}`,
    },
    {
      name: "Telegram",
      icon: Telegram,
      color: "#0088cc",
      shareUrl: (url, title) =>
        `https://t.me/share/url?url=${encodeURIComponent(url)}`,
    },
  ];

  const handleShare = (platform) => {
    // Use videoUrl if provided, otherwise fallback to page url
    const urlToShare = videoUrl || url;
    window.open(platform.shareUrl(urlToShare, title), "_blank");
  };

  const handleCopyLink = () => {
    // Use videoUrl if provided, otherwise fallback to page url
    const urlToCopy = videoUrl || url;
    navigator.clipboard.writeText(urlToCopy);
    setCopied(true);
    setSnackbarOpen(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: isMobile ? "100%" : "500px",
          },
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Share</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {socialPlatforms.map((platform) => (
              <Grid item xs={4} sm={3} key={platform.name}>
                <Button
                  fullWidth
                  onClick={() => handleShare(platform)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <platform.icon
                    sx={{
                      color: platform.color,
                      fontSize: fontSize.icon.large,
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: "text.secondary",
                      ...fontStyles.sfPro.condensed.regular,
                    }}
                  >
                    {platform.name}
                  </Typography>
                </Button>
              </Grid>
            ))}
          </Grid>

          {/* Separator line like YouTube */}
          <Box
            sx={{
              borderTop: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "#e0e0e0"
              }`,
              mb: 3,
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: `1px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "#d1d5db"
              }`,
              borderRadius: "6px",
              overflow: "hidden",
              backgroundColor:
                theme.palette.mode === "dark" ? "#0d1117" : "#ffffff",
              padding: "10px 5px",
            }}
          >
            <TextField
              fullWidth
              value={videoUrl || url}
              variant="outlined"
              size="small"
              InputProps={{
                readOnly: true,
                sx: {
                  backgroundColor: "transparent",
                  border: "none",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& input": {
                    padding: "8px 12px",
                    fontSize: "14px",
                    fontFamily:
                      "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
                    color:
                      theme.palette.mode === "dark" ? "#e6edf3" : "#1f2328",
                    cursor: "text",
                    lineHeight: "20px",
                    backgroundColor: "transparent",
                  },
                },
              }}
              sx={{
                "& .MuiInputBase-root": {
                  height: "32px",
                  backgroundColor: "transparent",
                },
              }}
            />
            <Button
              variant="text"
              onClick={handleCopyLink}
              sx={{
                minWidth: "60px",
                height: "35px",
                backgroundColor: copied ? "#1f883d" : "#001691",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 500,
                textTransform: "none",
                boxShadow: "none",
                border: "none",
                borderLeft: `1px solid ${
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.13)"
                    : "#d1d5db"
                }`,
                borderRadius: "50px",
                "&:hover": {
                  backgroundColor: copied ? "#1a7f37" : "#001066",
                  boxShadow: "none",
                },
                "&:active": {
                  backgroundColor: copied ? "#176f2c" : "#000d4d",
                },
                transition: "background-color 0.2s",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default ShareDialog;
