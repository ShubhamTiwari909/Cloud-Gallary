/*
  <H3
    color={color} 
    size={size} 
    className={className}
  />
  - - - - - - - - - - - - -
  color -> white / black
  size -> xl / lg / md / sm / xs
  className -> css classes
  - - - - - - - - - - - - -
*/

export default function H3({
  className,
  children,
  ...props
}) {
  return (
    <h3
      className={className}
      {...props}
    >
      {children}
    </h3>
  );
}

H3.defaultProps = {
  className: "",
};
