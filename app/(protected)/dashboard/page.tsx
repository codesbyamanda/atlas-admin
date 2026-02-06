"use client";

import { useEffect, useMemo } from "react";
import { useCustomersStore } from "@/features/customers/customers.store";
import { useOrdersStore } from "@/features/orders/orders.store";
import { MetricCard } from "@/features/dashboard/components/metric-card";
import { DashboardSkeleton } from "@/features/dashboard/components/dashboard-skeleton";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Clock,
  Package,
} from "lucide-react";

export default function DashboardPage() {
  const {
    items: customers,
    loadCustomers,
    loading: customersLoading,
  } = useCustomersStore();

  const {
    items: orders,
    loadOrders,
    loading: ordersLoading,
  } = useOrdersStore();

  useEffect(() => {
    loadCustomers();
    loadOrders();
  }, [loadCustomers, loadOrders]);

  const loading = customersLoading || ordersLoading;

  // 🔹 métricas 100% reais (derivadas dos stores)
  const metrics = useMemo(() => {
    const totalOrders = orders.length;
    const revenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const activeCustomers = customers.filter(
      (c) => c.status === "active"
    ).length;
    const pendingOrders = orders.filter(
      (o) => o.status === "pending"
    ).length;
    const completedOrders = orders.filter(
      (o) => o.status === "completed"
    ).length;

    const averageOrderValue =
      totalOrders > 0 ? revenue / totalOrders : 0;

    return {
      totalOrders,
      revenue,
      activeCustomers,
      pendingOrders,
      completedOrders,
      averageOrderValue,
    };
  }, [orders, customers]);

  return (
    <div className="space-y-6 md:space-y-8 animate-slide-up">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl md:rounded-3xl blur-2xl md:blur-3xl -z-10" />

        <div className="flex items-center gap-3 md:gap-4">
          <div className="h-10 md:h-14 w-1 md:w-1.5 bg-gradient-to-b from-primary via-secondary to-accent rounded-full" />
          <div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
              Painel de Controle
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-1.5">
              Visão geral baseada em dados reais do sistema
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="space-y-6 md:space-y-8">
          {/* Métricas principais */}
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Total de Pedidos"
              value={String(metrics.totalOrders)}
              icon={<ShoppingCart className="h-5 w-5" />}
              variant="primary"
            />
            <div className="metric-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pedidos Pendentes
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-1">
                    {metrics.pendingOrders}
                  </h3>
                </div>
                <div className="bg-warning/10 p-2.5 md:p-3 rounded-xl border border-warning/20">
                  <Clock className="h-4 md:h-5 w-4 md:w-5 text-warning" />
                </div>
              </div>
            </div>

            <div className="metric-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Pedidos Concluídos
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-1">
                    {metrics.completedOrders}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    de {metrics.totalOrders} pedidos
                  </p>
                </div>
                <div className="bg-primary/10 p-2.5 md:p-3 rounded-xl border border-primary/20">
                  <Package className="h-4 md:h-5 w-4 md:w-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Métricas operacionais */}
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Receita Total"
              value={`R$ ${metrics.revenue.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`}
              icon={<DollarSign className="h-5 w-5" />}
              variant="success"
            />

            <div className="metric-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Ticket Médio
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-1">
                    R${" "}
                    {metrics.averageOrderValue.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                    })}
                  </h3>
                </div>
                
                <div className="bg-accent/10 p-2.5 md:p-3 rounded-xl border border-accent/20">
                  <DollarSign className="h-4 md:h-5 w-4 md:w-5 text-accent" />
                </div>
              </div>
            </div>

            <MetricCard
              title="Clientes Ativos"
              value={String(metrics.activeCustomers)}
              icon={<Users className="h-5 w-5" />}
              variant="secondary"
            />
          </div>
        </div>
      )}
    </div>
  );
}