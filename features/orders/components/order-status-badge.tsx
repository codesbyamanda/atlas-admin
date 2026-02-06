import { OrderStatus } from "../types";

const STATUS_LABELS: Record<OrderStatus, string> = {
  completed: "Concluído",
  processing: "Processando",
  pending: "Pendente",
};

const STATUS_STYLES: Record<OrderStatus, string> = {
  completed: "badge badge-success",
  processing: "badge badge-primary",
  pending: "badge bg-warning/10 text-warning ring-1 ring-warning/20",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={STATUS_STYLES[status]}>
      {STATUS_LABELS[status]}
    </span>
  );
}
