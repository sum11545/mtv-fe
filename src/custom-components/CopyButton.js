import React, { useState } from "react";
import { Box, Typography, Snackbar } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { fontSize, fontStyles } from "../theme/theme";
import CopyIcon from "@/components/icons/CopyIcon";
import { DynamicIcon } from "@/components/icons";
import { useContent } from "@/hooks/useContent";

const CopyButton = ({
  color,
  text,
  label,
  onMouseEnter,
  onMouseLeave,
  textColor,
  hoverTextColor,
  iconColor,
}) => {
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { getButtonLabel, getSuccessMessage, snackbarDuration } = useContent();

  // Use centralized configuration with fallbacks
  const buttonLabel = label || getButtonLabel("copy");
  const copiedLabel = getButtonLabel("copied");
  const successMessage = getSuccessMessage("linkCopied");

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
            color: iconColor || "",
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: copied ? "success.main" : textColor || "grey.500",
            fontSize: fontSize.typography.caption,
            userSelect: "none",
            ml: 0.5,
            transition: "color 0.2s ease-in-out",
            ...fontStyles.sfPro.condensed.regular,
          }}
        >
          {copied ? copiedLabel : buttonLabel}
        </Typography>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={snackbarDuration}
        onClose={handleSnackbarClose}
        message={successMessage}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default CopyButton;
