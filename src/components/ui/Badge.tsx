interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "dark" | "outline";
}

export default function Badge({
  children,
  className = "",
  variant = "dark",
}: BadgeProps) {
  const variants = {
    blue: "bg-blue-600/20 border border-blue-500/30 text-blue-300",
    dark: "bg-[rgb(14,18,46)] border border-[rgb(28,35,84)] text-[rgb(167,173,190)]",
    outline: "border border-[rgb(28,35,84)] text-[rgb(167,173,190)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-inter-tight ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
