export interface Expense {
  id: number;
  createdAt: string;
  description?: string;
  category: string;
  amount: number;
}
export interface Category {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}
