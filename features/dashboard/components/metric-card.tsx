import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "success" | "warning" | "destructive" | "accent";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: number;
  trend?: "up" | "down";
  variant?: Variant;
  chart?: number[];
}

const variantStyles: Record<Variant, {
  iconBg: string;
  iconColor: string;
  chartColor: string;
}> = {
  primary: {
    iconBg: "bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20",
    iconColor: "text-primary",
    chartColor: "hsl(var(--primary))",
  },
  secondary: {
    iconBg: "bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20",
    iconColor: "text-secondary",
    chartColor: "hsl(var(--secondary))",
  },
  success: {
    iconBg: "bg-gradient-to-br from-success/10 to-success/5 border border-success/20",
    iconColor: "text-success",
    chartColor: "hsl(var(--success))",
  },
  warning: {
    iconBg: "bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20",
    iconColor: "text-warning",
    chartColor: "hsl(var(--warning))",
  },
  destructive: {
    iconBg: "bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20",
    iconColor: "text-destructive",
    chartColor: "hsl(var(--destructive))",
  },
  accent: {
    iconBg: "bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20",
    iconColor: "text-accent",
    chartColor: "hsl(var(--accent))",
  },
};

export function MetricCard({
  title,
  value,
  icon,
  change,
  trend = "up",
  variant = "primary",
  chart = [],
}: MetricCardProps) {
  const isPositive = trend === "up";
  const changeColor = isPositive ? "text-success" : "text-destructive";
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  
  const styles = variantStyles[variant];

  // Normaliza os dados do chart para 0-100
  const normalizedChart = chart.length > 0 
    ? (() => {
        const min = Math.min(...chart);
        const max = Math.max(...chart);
        const range = max - min || 1;
        return chart.map((val) => ((val - min) / range) * 100);
      })()
    : [];

  return (
    <div className="metric-card group cursor-pointer">
      {/* Header com ícone */}
      <div className="flex items-start justify-between mb-5">
        <div className="space-y-2 flex-1">
          <p className="text-sm font-medium text-muted-foreground">
            {title}
          </p>
          <h3 className="text-3xl font-bold tracking-tight">
            {value}
          </h3>
        </div>
        
        <div className={cn(
          "p-3.5 rounded-xl transition-all duration-300 group-hover:scale-110",
          styles.iconBg
        )}>
          <div className={styles.iconColor}>
            {icon}
          </div>
        </div>
      </div>

      {/* Mini gráfico de linha */}
      {normalizedChart.length > 0 && (
        <div className="relative h-16 mb-4 overflow-hidden rounded-lg">
          {/* Gradiente de fundo */}
          <div 
            className="absolute inset-0 opacity-10 rounded-lg"
            style={{
              background: `linear-gradient(to top, ${styles.chartColor}, transparent)`
            }}
          />
          
          {/* SVG do gráfico */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            viewBox={`0 0 ${normalizedChart.length - 1} 100`}
          >
            {/* Área preenchida */}
            <defs>
              <linearGradient id={`gradient-${title}-${variant}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={styles.chartColor} stopOpacity="0.3" />
                <stop offset="100%" stopColor={styles.chartColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            
            <path
              d={`
                M 0 ${100 - normalizedChart[0]}
                ${normalizedChart.slice(1).map((val, i) => 
                  `L ${i + 1} ${100 - val}`
                ).join(' ')}
                L ${normalizedChart.length - 1} 100
                L 0 100
                Z
              `}
              fill={`url(#gradient-${title}-${variant})`}
              className="transition-all duration-500"
            />
            
            {/* Linha principal */}
            <path
              d={`
                M 0 ${100 - normalizedChart[0]}
                ${normalizedChart.slice(1).map((val, i) => 
                  `L ${i + 1} ${100 - val}`
                ).join(' ')}
              `}
              fill="none"
              stroke={styles.chartColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-500 drop-shadow-lg"
            />
            
            {/* Pontos */}
            {normalizedChart.map((val, i) => (
              <circle
                key={i}
                cx={i}
                cy={100 - val}
                r="0"
                fill={styles.chartColor}
                className="transition-all duration-300"
                style={{ 
                  transitionDelay: `${i * 50}ms`,
                  r: '0'
                }}
              >
                <animate
                  attributeName="r"
                  from="0"
                  to="2"
                  dur="0.3s"
                  begin={`${i * 0.05}s`}
                  fill="freeze"
                />
              </circle>
            ))}
          </svg>
        </div>
      )}

      {/* Footer com variação */}
      {change !== undefined && (
        <div className="flex items-center gap-2 pt-3 border-t border-border/40">
          <div className={cn(
            "flex items-center gap-1.5 text-xs font-semibold",
            changeColor
          )}>
            <TrendIcon className="h-3.5 w-3.5" />
            <span>{Math.abs(change).toFixed(1)}%</span>
          </div>
          <span className="text-xs text-muted-foreground">
            vs mês anterior
          </span>
        </div>
      )}

      {/* Shimmer effect no hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent animate-shimmer" />
      </div>
    </div>
  );
}