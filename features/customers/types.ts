export type CustomerStatus = "active" | "inactive";

export type Customer = {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  createdAt: string;
};
