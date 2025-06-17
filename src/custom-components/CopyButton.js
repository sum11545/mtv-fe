import React, { useState } from "react";
import { Box, Typography, Snackbar } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { fontSize, fontStyles } from "../theme/theme";
import CopyIcon from "@/components/icons/CopyIcon";
import { DynamicIcon } from "@/components/icons";

const CopyButton = ({color, text, label = "Copy", onMouseEnter, onMouseLeave, textColor, hoverTextColor, iconColor }) => {
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setSnackbarOpen(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          borderRadius: 1,
          cursor: "pointer",
          padding: "4px 8px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            "& .MuiTypography-root": {
              color: hoverTextColor || "grey.700",
            },
          },
        }}
        onClick={handleCopy}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* <CopyIcon /> */}
        <DynamicIcon
          height={"15px"} 
          width={"15px"} 
          keyword="COPY" 
          style={{
            color: iconColor || '',
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: copied ? "success.main" : (textColor || "grey.500"),
            fontSize: fontSize.typography.caption,
            userSelect: "none",
            ml: 0.5,
            transition: "color 0.2s ease-in-out",
            ...fontStyles.sfPro.condensed.regular,
          }}
        >
          {copied ? "Copied!" : label}
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1000}
        onClose={handleSnackbarClose}
        message="Link copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default CopyButton;
