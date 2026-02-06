"use client";

import { useEffect, useState, useMemo } from "react";
import { useOrdersStore } from "@/features/orders/orders.store";
import { OrdersTable } from "@/features/orders/components/orders-table";
import { OrdersTableSkeleton } from "@/features/orders/components/orders-table-skeleton";
import { EmptyState } from "@/shared/components/empty-state";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/components/select/select";

import {
  ShoppingCart,
  Search,
  Download,
  DollarSign,
  Package,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function OrdersPage() {
  const { items, loading, error, loadOrders } = useOrdersStore();

  // UI state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "processing" | "pending"
  >("all");

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Lista filtrada
  const filteredOrders = items.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Métricas
  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter((o) => o.status === "completed").length;
    const processing = items.filter((o) => o.status === "processing").length;
    const pending = items.filter((o) => o.status === "pending").length;
    const revenue = items.reduce((sum, o) => sum + o.amount, 0);
    const averageOrderValue = total > 0 ? revenue / total : 0;

    return {
      total,
      completed,
      processing,
      pending,
      revenue,
      averageOrderValue,
    };
  }, [items]);

  const STATUS_LABELS = {
  all: "Todos os status",
  completed: "Concluído",
  processing: "Processando",
  pending: "Pendente",
} as const;


  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-success/5 to-warning/5 rounded-3xl blur-3xl -z-10" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-1.5 bg-gradient-to-b from-primary via-success to-warning rounded-full" />
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Pedidos</h1>
              <p className="text-muted-foreground mt-1.5">
                Gerencie e acompanhe pedidos de clientes
              </p>
            </div>
          </div>

          {/* <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-background/50 text-sm hover:bg-muted/30 transition">
              <Download className="h-4 w-4" />
              Exportar
            </button>

            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-105 transition">
              <ShoppingCart className="h-5 w-5" />
              Novo Pedido
            </button>
          </div> */}
        </div>
      </div>


      {/* Cards */}
      {!loading && !error && items.length > 0 && (
        <>
          {/* Linha 1 — Visão geral */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Metric
              title="Total de Pedidos"
              value={stats.total}
              icon={<ShoppingCart />}
            />

            <Metric
              title="Receita Total"
              value={`R$ ${stats.revenue.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`}
              icon={<DollarSign />}
              color="success"
            />

            <Metric
              title="Ticket Médio"
              value={`R$ ${stats.averageOrderValue.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`}
              icon={<TrendingUp />}
              color="success"
            />

            <Metric
              title="Em Processamento"
              value={stats.processing}
              subtitle="pedidos"
              icon={<Package />}
              color="primary"
            />
          </div>

          {/* Linha 2 — Status */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Metric
              title="Concluídos"
              value={stats.completed}
              subtitle={`${Math.round(
                (stats.completed / stats.total) * 100
              )}% do total`}
              icon={<CheckCircle2 />}
              color="success"
            />

            <Metric
              title="Pendentes"
              value={stats.pending}
              subtitle="requerem ação"
              icon={<Clock />}
              color="warning"
            />
          </div>
        </>
      )}


      {/* Search + Filter */}
      {!loading && !error && items.length > 0 && (
        <div className="glass rounded-2xl p-6 border border-border/50">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                placeholder="Buscar por ID ou cliente..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-background/50 pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Select */}
            <Select
              value={statusFilter}
              onValueChange={(v) =>
                setStatusFilter(v as typeof statusFilter)
              }
            >
              <SelectTrigger className="w-48">
                <span className="text-sm">
                  {STATUS_LABELS[statusFilter]}
                </span>
              </SelectTrigger>

              <SelectContent
                 position="popper"
                  sideOffset={8}
                  className="
                    z-50
                    min-w-[12rem]
                    rounded-xl
                    border border-border
                    bg-background
                    p-1
                    shadow-xl
                  "
              >
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="processing">Processando</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
              </SelectContent>
            </Select>

          </div>
        </div>
      )}

      {/* States */}
      {loading && <OrdersTableSkeleton />}

      {error && (
        <EmptyState
          title="Erro ao carregar pedidos"
          description={error}
        />
      )}

      {!loading && !error && filteredOrders.length === 0 && (
        <EmptyState
          title="Nenhum resultado encontrado"
          description="Tente ajustar sua busca ou filtro."
        />
      )}

      {!loading && !error && filteredOrders.length > 0 && (
        <OrdersTable data={filteredOrders} />
      )}
    </div>
  );
}

/* ---------- Helper ---------- */

function Metric({
  title,
  value,
  subtitle,
  footer,
  icon,
  color = "primary",
}: any) {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className={`text-3xl font-bold text-${color}`}>{value}</h3>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          {footer && <p className="text-xs text-success">{footer}</p>}
        </div>
        <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
