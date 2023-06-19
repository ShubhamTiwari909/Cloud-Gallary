import Link from "next/link";

const Button = (
  {
    href,
    className,
    children,
    ...props
  }
) => {
  return (
    <Link
      href={href}
      className={`border-none ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}

Button.defaultProps = {
  href: "#",
  className: "",
};

export default Button;
