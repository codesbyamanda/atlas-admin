import { Button } from "@/shared/components/button";

type Props = {
  open: boolean;
  customerName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteCustomerModal({
  open,
  customerName,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass w-full max-w-md rounded-2xl border border-border/50 p-6 shadow-xl animate-scale-in">
        {/* Título */}
        <h2 className="text-xl font-semibold text-foreground">
          Excluir cliente
        </h2>

        {/* Descrição */}
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Tem certeza que deseja excluir o cliente{" "}
          <span className="font-medium text-foreground">
            {customerName}
          </span>
          ?
          <br />
          <span className="text-destructive font-medium">
            Essa ação não poderá ser desfeita.
          </span>
        </p>

        {/* Ações */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>

          <Button
            onClick={onConfirm}
            className="bg-destructive hover:bg-destructive-hover text-destructive-foreground"
          >
            Excluir cliente
          </Button>
        </div>
      </div>
    </div>
  );
}
