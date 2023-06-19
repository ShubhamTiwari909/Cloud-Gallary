import Link from "next/link";

const Button = (
    {
      href,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Link
        href={href}
        className={`border-none ${className}`}
        ref={ref}
        {...props}
      >
        <span className="btn__inner">{children}</span>
      </Link>
    );
  }

Button.defaultProps = {
  href: "#",
  className: "",
};

export default Button;
