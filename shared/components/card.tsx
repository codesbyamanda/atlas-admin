import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "bordered";
}

export function Card({ children, className = '', variant = "default" }: CardProps) {
  const variants = {
    default: `
      rounded-2xl border border-border bg-card p-6
      shadow-sm
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl
    `,
    glass: `
      rounded-2xl border border-border/50 
      bg-card/80 backdrop-blur-xl p-6
      shadow-lg
      transition-all duration-300
      hover:-translate-y-1 hover:shadow-2xl
    `,
    bordered: `
      rounded-2xl border-2 border-border bg-card p-6
      transition-all duration-300
      hover:border-primary/50
    `,
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3 className={`text-xl font-bold tracking-tight ${className}`}>
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`text-sm text-muted-foreground mt-1.5 ${className}`}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-6 pt-6 border-t border-border/50 ${className}`}>
      {children}
    </div>
  );
}