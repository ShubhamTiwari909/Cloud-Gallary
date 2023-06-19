/*
  <H4
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

export default function H4({  className, children, ...props }) {
  return (
    <h4 className={className} {...props}>
      {children}
    </h4>
  );
}

H4.defaultProps = {
  className: "",
};
