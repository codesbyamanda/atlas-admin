import { create } from "zustand";
import { Order } from "./types";

type OrdersState = {
  items: Order[];
  loading: boolean;
  error: string | null;
  loadOrders: () => void;
};

export const useOrdersStore = create<OrdersState>((set) => ({
  items: [],
  loading: false,
  error: null,

  loadOrders: () => {
    set({ loading: true, error: null });

    setTimeout(() => {
      set({
        items: [
          {
            id: "ORD-001",
            customer: "John Doe",
            amount: 125,
            status: "completed",
          },
          {
            id: "ORD-002",
            customer: "Jane Smith",
            amount: 89.5,
            status: "processing",
          },
          {
            id: "ORD-003",
            customer: "Mike Johnson",
            amount: 256,
            status: "pending",
          },
        ],
        loading: false,
      });
    }, 800);
  },
}));
