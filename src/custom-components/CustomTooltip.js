import { Tooltip } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

const CustomTooltip = ({ children, text }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(
        contentRef.current.scrollWidth > contentRef.current.clientWidth
      );
    }
  }, [text]);

  return (
    <Tooltip title={isOverflowing ? text : ""} arrow>
      <div
        ref={contentRef}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
};

export default CustomTooltip;
