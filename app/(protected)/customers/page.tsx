"use client";

import { useEffect, useState } from "react";
import { useCustomersStore } from "@/features/customers/customers.store";
import { CustomersTable } from "@/features/customers/components/customers-table";
import { DeleteCustomerModal } from "@/features/customers/components/delete-customer-modal";
import { CustomersTableSkeleton } from "@/features/customers/components/customers-table-skeleton";
import { EmptyState } from "@/shared/components/empty-state";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/components/select/select";

import {
  Users,
  Search,
  Filter,
  UserPlus,
  UserCheck,
  UserX,
  Download,
} from "lucide-react";

export default function CustomersPage() {
  const { items, loading, error, loadCustomers, removeCustomer } =
    useCustomersStore();

  // Modal
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  // UI state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const selectedCustomer = items.find(
    (c) => c.id === selectedCustomerId
  );

  // Lista filtrada
  const filteredCustomers = items.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Métricas
  const stats = {
    total: items.length,
    active: items.filter((c) => c.status === "active").length,
    inactive: items.filter((c) => c.status === "inactive").length,
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-primary/5 to-accent/5 rounded-3xl blur-3xl -z-10" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-1.5 bg-gradient-to-b from-secondary via-primary to-accent rounded-full" />
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Clientes
              </h1>
              <p className="text-muted-foreground mt-1.5">
                Gerencie seus clientes e seus status
              </p>
            </div>
          </div>

          {/* <button
            onClick={() => alert("Funcionalidade futura 🙂")}
            className="
              group flex items-center gap-2
              bg-gradient-to-r from-primary to-secondary
              text-white font-semibold
              px-5 py-3 rounded-xl
              shadow-lg shadow-primary/25
              hover:shadow-xl hover:shadow-primary/30
              hover:scale-105
              transition-all
            "
          >
            <UserPlus className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            Adicionar Cliente
          </button> */}
        </div>
      </div>

      {/* Cards */}
      {!loading && !error && items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-3">
          <Metric
            title="Total de Clientes"
            value={stats.total}
            icon={<Users />}
          />

          <Metric
            title="Clientes Ativos"
            value={stats.active}
            subtitle={`de ${stats.total}`}
            icon={<UserCheck />}
            color="success"
          />

          <Metric
            title="Clientes Inativos"
            value={stats.inactive}
            subtitle={`de ${stats.total}`}
            icon={<UserX />}
            color="muted"
          />
        </div>
      )}

      {/* Search + Filter */}
      {!loading && !error && items.length > 0 && (
        <div className="glass rounded-2xl p-6 border border-border/50">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                placeholder="Buscar por nome ou e-mail..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full rounded-xl border border-border bg-background/50
                  pl-12 pr-4 py-3 text-sm
                  focus:border-primary focus:ring-2 focus:ring-primary/20
                "
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Status Select */}
              <Select
              value={statusFilter}
              onValueChange={(v) =>
                setStatusFilter(v as "all" | "active" | "inactive")
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue>
                  {statusFilter === "all" && "Todos os status"}
                  {statusFilter === "active" && "Ativos"}
                  {statusFilter === "inactive" && "Inativos"}
                </SelectValue>
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
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>


              {/* <button
                onClick={() => alert("Exportar dados")}
                className="
                  flex items-center gap-2 px-4 py-3 rounded-xl
                  border border-border bg-background/50
                  text-sm hover:bg-muted/30 transition
                "
              >
                <Download className="h-4 w-4" />
                Exportar
              </button> */}
            </div>
          </div>
        </div>
      )}

      {/* States */}
      {loading && <CustomersTableSkeleton />}

      {error && (
        <EmptyState
          title="Erro ao carregar clientes"
          description={error}
        />
      )}

      {!loading && !error && items.length === 0 && (
        <EmptyState
          title="Nenhum cliente cadastrado"
          description="Você ainda não adicionou nenhum cliente."
          icon={<Users className="h-6 w-6 text-muted-foreground" />}
        />
      )}

      {!loading && !error && filteredCustomers.length === 0 && (
        <EmptyState
          title="Nenhum resultado encontrado"
          description="Tente ajustar sua busca ou filtro."
        />
      )}

      {!loading && !error && filteredCustomers.length > 0 && (
        <CustomersTable
          data={filteredCustomers}
          onDelete={(id) => setSelectedCustomerId(id)}
        />
      )}

      {/* Modal */}
      <DeleteCustomerModal
        open={!!selectedCustomerId}
        customerName={selectedCustomer?.name}
        onCancel={() => setSelectedCustomerId(null)}
        onConfirm={() => {
          if (selectedCustomerId) {
            removeCustomer(selectedCustomerId);
            setSelectedCustomerId(null);
          }
        }}
      />
    </div>
  );
}

/* ---------- Metric helper ---------- */

function Metric({
  title,
  value,
  subtitle,
  icon,
  color = "primary",
}: {
  title: string;
  value: number;
  subtitle?: string;
  icon: React.ReactNode;
  color?: "primary" | "success" | "muted";
}) {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className={`text-3xl font-bold text-${color}`}>
            {value}
          </h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
