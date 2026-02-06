import { Order } from "../types";
import { OrderStatusBadge } from "./order-status-badge";

type Props = {
  data: Order[];
};

export function OrdersTable({ data }: Props) {
  return (
    <>
      {/* Tabela Desktop (hidden no mobile) */}
      <div className="hidden md:block glass rounded-2xl border border-border/50 overflow-hidden">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-card border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                Pedido
              </th>
              <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                Cliente
              </th>
              <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                Valor
              </th>
              <th className="px-6 py-4 text-left font-medium text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((order) => (
              <tr
                key={order.id}
                className="border-t border-border hover:bg-muted/20 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-foreground">
                  {order.id}
                </td>

                <td className="px-6 py-4 text-foreground">
                  {order.customer}
                </td>

                <td className="px-6 py-4 text-foreground">
                  R$ {order.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </td>

                <td className="px-6 py-4">
                  <OrderStatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards Mobile (visível apenas no mobile) */}
      <div className="md:hidden space-y-3">
        {data.map((order) => (
          <div
            key={order.id}
            className="glass rounded-xl border border-border/50 p-4 hover:bg-muted/20 transition-colors"
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Pedido */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Pedido</p>
                <p className="font-semibold text-foreground">{order.id}</p>
              </div>

              {/* Status */}
              <div className="flex justify-end items-start">
                <OrderStatusBadge status={order.status} />
              </div>

              {/* Cliente */}
              <div>
                <p className="text-xs text-muted-foreground mb-1">Cliente</p>
                <p className="font-medium text-foreground">{order.customer}</p>
              </div>

              {/* Valor */}
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-1">Valor</p>
                <p className="font-semibold text-foreground">
                  R$ {order.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}