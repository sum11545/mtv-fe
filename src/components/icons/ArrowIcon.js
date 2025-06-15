const ArrowIcon = (props) => (
  <img
    src="/assets/icons/arrow-icon.svg"
    alt="Right Arrow"
    style={{
      width: "15px",
      height: "7px",
      filter: props.style?.color
        ? `brightness(0) saturate(100%) invert(${
            props.style.color === "#  " ? "100%" : "0%"
          })`
        : "none",
    }}
    {...props}
  />
);

export default ArrowIcon;
