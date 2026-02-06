import { ReactNode } from "react";
import { Button } from "./button";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-muted/20 py-20 text-center animate-fade-in">
      {icon && (
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50">
          <div className="scale-125">
            {icon}
          </div>
        </div>
      )}

      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>

      <p className="mt-3 max-w-md text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button 
          variant="primary" 
          size="lg"
          className="mt-8" 
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}