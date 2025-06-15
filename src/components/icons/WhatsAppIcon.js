const WhatsAppIcon = (props) => (
  <img
    src="/assets/icons/whats-app-icon.svg"
    alt="Whats App"
    style={{
      width: "15px",
      height: "15px",
      filter: props.style?.color
        ? `brightness(0) saturate(100%) invert(${
            props.style.color === "#fff" ? "100%" : "0%"
          })`
        : "none",
    }}
    {...props}
  />
);

export default WhatsAppIcon;
