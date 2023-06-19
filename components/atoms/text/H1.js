/*
  <H1 
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

export default function H1({
  className,
  children,
  ...props
}) {
  return (
    <h1
      className={className}
      {...props}
    >
      {children}
    </h1>
  );
}

H1.defaultProps = {
  className: "",
};
