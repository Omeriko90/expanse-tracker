export interface Expense {
  id: number;
  created_at: string;
  description?: string;
  category_id: string;
  amount: number;
}
export interface Category {
  id: string;
  title: string;
  description: string;
  created_at: string;
}
