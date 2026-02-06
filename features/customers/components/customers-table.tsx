import { Customer } from "../types";
import { Badge } from "@/shared/components/badge";
import { Button } from "@/shared/components/button";

type Props = {
  data: Customer[];
  onDelete: (id: string) => void;
};

export function CustomersTable({ data, onDelete }: Props) {
  return (
    <div className="glass overflow-hidden rounded-2xl border border-border/50">
      <table className="w-full text-sm">
        {/* Header */}
        <thead className="border-b border-border/50">
          <tr className="text-muted-foreground">
            <th className="px-6 py-4 text-left font-medium">Nome</th>
            <th className="px-6 py-4 text-left font-medium">Email</th>
            <th className="px-6 py-4 text-left font-medium">Status</th>
            <th className="px-6 py-4 text-right font-medium">Ações</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((customer) => (
            <tr
              key={customer.id}
              className="
                border-b border-border/30 last:border-b-0
                transition-colors
                hover:bg-muted/20
              "
            >
              <td className="px-6 py-4 font-medium">
                {customer.name}
              </td>

              <td className="px-6 py-4 text-muted-foreground">
                {customer.email}
              </td>

              <td className="px-6 py-4">
                <Badge variant={customer.status}>
                  {customer.status === "active" ? "Ativo" : "Inativo"}
                </Badge>
              </td>

              <td className="px-6 py-4 text-right">
                <Button
                  variant="ghost"
                  onClick={() => onDelete(customer.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
