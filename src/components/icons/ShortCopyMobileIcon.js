import React from "react";

export const ShortCopyMobileIcon = (props) => {
  return (
    <img
      src="/assets/icons/short-copy-icon.svg"
      alt="Shorts Copy Mobile"
      style={{
        width: props.width ?? "35px",
        height: props.height ?? "35px",
        filter: props.style?.color
          ? `brightness(0) saturate(100%) invert(${
              props.style.color === "#  " ? "100%" : "0%"
            })`
          : "none",
      }}
      {...props}
    />
  );
};
