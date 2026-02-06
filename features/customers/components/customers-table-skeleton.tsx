import { Skeleton } from "@/shared/components/skeleton";

export function CustomersTableSkeleton() {
  return (
    <div className="glass overflow-hidden rounded-2xl border border-border/50">
      {/* Header */}
      <div className="grid grid-cols-4 items-center gap-4 px-6 py-4 border-b border-border/50">
        <Skeleton className="h-4 w-24 bg-muted/40" />
        <Skeleton className="h-4 w-32 bg-muted/40" />
        <Skeleton className="h-4 w-16 bg-muted/40" />
        <Skeleton className="h-4 w-16 justify-self-end bg-muted/40" />
      </div>

      {/* Rows */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-4 items-center gap-4 px-6 py-4 border-b border-border/30 last:border-b-0"
        >
          <Skeleton className="h-4 w-32 bg-muted/30" />
          <Skeleton className="h-4 w-48 bg-muted/30" />
          <Skeleton className="h-5 w-16 rounded-full bg-muted/30" />
          <Skeleton className="h-4 w-12 justify-self-end bg-muted/30" />
        </div>
      ))}
    </div>
  );
}
