const StarIcon = (props) => (
    <img 
      src="/assets/icons/star-icon.svg" 
      alt="Moon Star" 
      style={{ 
        width: '24px', 
        height: '24px',
        filter: props.style?.color ? `brightness(0) saturate(100%) invert(${props.style.color === '#fff' ? '100%' : '0%'})` : 'none'
      }}
      {...props}
    />
  );
  
  export default StarIcon; 