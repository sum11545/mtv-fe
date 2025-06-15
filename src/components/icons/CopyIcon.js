const CopyIcon = (props) => (
  <img
    src="/assets/icons/copy-icon.svg"
    alt="Copy"
    style={{
      width: "12px",
      height: "16px",
      filter: props.style?.color
        ? `brightness(0) saturate(100%) invert(${
            props.style.color === "#fff" ? "100%" : "0%"
          })`
        : "none",
    }}
    {...props}
  />
);

export default CopyIcon;
