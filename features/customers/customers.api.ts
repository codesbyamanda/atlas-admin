import { Customer } from "./types";

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "inactive",
    createdAt: "2024-01-15",
  },
];

export async function fetchCustomers(): Promise<Customer[]> {
  await new Promise((r) => setTimeout(r, 800));
  return MOCK_CUSTOMERS;
}

export async function deleteCustomer(id: string) {
  await new Promise((r) => setTimeout(r, 500));
  return { success: true };
}
