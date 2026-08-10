import { ButtonHTMLAttributes } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300 cursor-pointer font-inter-tight";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-[rgb(0,59,255)] text-white hover:bg-[rgb(25,78,255)] hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_20px_rgba(0,59,255,0.3)] hover:shadow-[0_0_30px_rgba(0,59,255,0.5)]",
    secondary:
      "bg-transparent border border-[rgb(28,35,84)] text-white hover:border-[rgb(0,59,255)] hover:bg-[rgba(0,59,255,0.1)] hover:scale-[1.03]",
    ghost:
      "bg-transparent text-[rgb(167,173,190)] hover:text-white hover:bg-[rgba(255,255,255,0.05)]",
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
