export function OrdersTableSkeleton() {
  return (
    <div className="glass overflow-hidden rounded-2xl border border-border/50">
      {/* Header */}
      <div className="flex items-center gap-8 px-6 py-4 border-b border-border/50">
        <div className="h-4 w-24 animate-pulse rounded-md bg-muted/40" />
        <div className="h-4 w-32 animate-pulse rounded-md bg-muted/40" />
        <div className="ml-auto h-4 w-20 animate-pulse rounded-md bg-muted/40" />
        <div className="h-4 w-20 animate-pulse rounded-md bg-muted/40" />
      </div>

      {/* Rows */}
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-8 px-6 py-4 border-b border-border/30 last:border-b-0"
        >
          <div className="h-4 w-24 animate-pulse rounded-md bg-muted/30" />
          <div className="h-4 w-40 animate-pulse rounded-md bg-muted/30" />
          <div className="ml-auto h-4 w-20 animate-pulse rounded-md bg-muted/30" />
          <div className="h-5 w-20 animate-pulse rounded-full bg-muted/30" />
        </div>
      ))}
    </div>
  );
}
