type SkeletonProps = {
  className?: string;
  variant?: "default" | "text" | "circular" | "rectangular";
};

export function Skeleton({ 
  className = "", 
  variant = "default" 
}: SkeletonProps) {
  const variants = {
    default: "rounded-xl",
    text: "rounded-lg h-4",
    circular: "rounded-full",
    rectangular: "rounded-none",
  };

  return (
    <div
      className={`
        relative overflow-hidden
        bg-muted/30
        ${variants[variant]}
        ${className}
      `}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-muted/50 to-transparent" />
    </div>
  );
}

// Skeleton presets comuns
export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 border border-border/50 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-20 h-8" />
        </div>
        <Skeleton variant="circular" className="h-14 w-14" />
      </div>
      <Skeleton variant="rectangular" className="h-16 w-full" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="glass rounded-2xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="border-b border-border/50 p-4">
        <div className="flex gap-4">
          <Skeleton variant="text" className="w-32" />
          <Skeleton variant="text" className="w-48" />
          <Skeleton variant="text" className="w-24" />
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-border/50">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4">
            <div className="flex gap-4 items-center">
              <Skeleton variant="text" className="w-32" />
              <Skeleton variant="text" className="w-48" />
              <Skeleton variant="text" className="w-24" />
              <Skeleton variant="circular" className="h-6 w-16 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}