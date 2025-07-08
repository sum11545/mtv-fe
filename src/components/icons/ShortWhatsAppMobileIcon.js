import React from "react";

const ShortWhatsAppMobileIcon = (props) => {
  return (
    <img
      src="/assets/icons/short-whatsapp-icon.svg"
      alt="Shorts WhatsApp Mobile"
      style={{
        width: "35px",
        height: "35px",
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

export default ShortWhatsAppMobileIcon;
