type BadgeProps = {
  children: React.ReactNode;
  variant?: "active" | "inactive" | "pending" | "completed" | "processing";
};

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active: "bg-success/10 text-success ring-1 ring-success/20",
    inactive: "bg-muted/30 text-muted-foreground ring-1 ring-border",
    pending: "bg-warning/10 text-warning ring-1 ring-warning/20",
    completed: "bg-success/10 text-success ring-1 ring-success/20",
    processing: "bg-primary/10 text-primary ring-1 ring-primary/20",
  };

  // Traduções
  const translations: Record<string, string> = {
    active: "Ativo",
    inactive: "Inativo",
    pending: "Pendente",
    completed: "Concluído",
    processing: "Processando",
  };

  const displayText = typeof children === 'string' && children in translations 
    ? translations[children] 
    : children;

  return (
    <span
      className={`
        inline-flex items-center rounded-full px-2.5 py-1 
        text-xs font-semibold transition-all duration-200
        ${variants[variant]}
      `}
    >
      {displayText}
    </span>
  );
}