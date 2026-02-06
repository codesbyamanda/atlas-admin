import { create } from "zustand";
import { Customer } from "./types";
import { fetchCustomers, deleteCustomer } from "./customers.api";

type CustomersState = {
  items: Customer[];
  loading: boolean;
  error: string | null;

  loadCustomers: () => Promise<void>;
  removeCustomer: (id: string) => Promise<void>;
};

export const useCustomersStore = create<CustomersState>((set) => ({
  items: [],
  loading: false,
  error: null,

  loadCustomers: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCustomers();
      set({ items: data, loading: false });
    } catch {
      set({ error: "Failed to load customers", loading: false });
    }
  },

  removeCustomer: async (id) => {
    await deleteCustomer(id);
    set((state) => ({
      items: state.items.filter((c) => c.id !== id),
    }));
  },
}));
