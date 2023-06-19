/*
  <H2 
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

export default function H2({
  className,
  children,
  ...props
}) {
  return (
    <h2
      className={className}
      {...props}
    >
      {children}
    </h2>
  );
}

H2.defaultProps = {
  className: "",
};
