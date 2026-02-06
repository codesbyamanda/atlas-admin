import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = `
    inline-flex items-center justify-center rounded-xl
    font-semibold transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-primary/20
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-primary to-secondary
      text-white shadow-lg shadow-primary/25
      hover:shadow-xl hover:shadow-primary/30 hover:scale-105
      active:scale-95
    `,
    secondary: `
      bg-secondary text-white
      hover:bg-secondary/90
      shadow-md hover:shadow-lg
    `,
    ghost: `
      text-foreground
      hover:bg-muted/50
      active:bg-muted
    `,
    destructive: `
      bg-destructive text-white
      hover:bg-destructive/90
      shadow-md shadow-destructive/20
      hover:shadow-lg hover:shadow-destructive/30
    `,
    outline: `
      border border-border bg-background
      text-foreground
      hover:bg-muted/30 hover:border-border-strong
    `,
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}