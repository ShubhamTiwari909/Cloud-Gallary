/*
  <p
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

export default function Para({
  className,
  children,
  ...props
}) {
  return (
    <p
      className={className}
      {...props}
    >
      {children}
    </p>
  );
}

Para.defaultProps = {
  className: "",
};
