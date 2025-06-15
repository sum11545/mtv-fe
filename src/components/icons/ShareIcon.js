const ShareIcon = (props) => (
  <img
    src="/assets/icons/share-icon.svg"
    alt="Share"
    style={{
      width: "17px",
      height: "11px",
      filter: props.style?.color
        ? `brightness(0) saturate(100%) invert(${
            props.style.color === "#fff" ? "100%" : "0%"
          })`
        : "none",
    }}
    {...props}
  />
);

export default ShareIcon;
