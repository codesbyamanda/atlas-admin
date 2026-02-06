export type OrderStatus = "completed" | "processing" | "pending";

export type Order = {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
};
