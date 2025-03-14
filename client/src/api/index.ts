import { AxiosResponse } from "axios";
import { Category, Expense, Search } from "../types";
import api from "./api";
import { convertDayjsToTimestamp } from "../helpers";
import moment from "moment";

interface ApiType {
  addExpense: (
    newExpense: Expense
  ) => Promise<AxiosResponse<{ expense: Expense }>>;
  updateExpense: (
    id: number,
    newExpense: Expense
  ) => Promise<AxiosResponse<{ expense: Expense }>>;
  getMonthTotalExpense: (dateRange: {
    startMonthDate: string;
    endMonthDate: string;
  }) => Promise<AxiosResponse<{ totalAmount: number }>>;
  getExpenses: (sort: Search) => Promise<AxiosResponse<Expense[]>>;
  getExpensesById: (id: number) => Promise<AxiosResponse<Expense>>;
  deleteExpense: (id: number) => Promise<AxiosResponse<{ success: boolean }>>;
  addCategory: (
    newCategory: Category
  ) => Promise<AxiosResponse<{ category: Category }>>;
  updateCategory: (
    id: number,
    updatedCategory: Category
  ) => Promise<AxiosResponse<{ category: Category }>>;
  getAllCategories: () => Promise<AxiosResponse<Category[]>>;
  getCategoryById: (id: string) => Promise<AxiosResponse<Category>>;
  deleteCategory: (id: number) => Promise<AxiosResponse<{ success: boolean }>>;
}

export default {
  addExpense: (newExpense: Expense) =>
    api.post("/expenses/create_expense", {
      ...newExpense,
      amount: parseInt(newExpense.amount),
      created_at: convertDayjsToTimestamp(newExpense.created_at),
    }),
  updateExpense: (id: number, updatedExpense: Expense) =>
    api.put(`/expenses/update_expense/${id}`, {
      expense: {
        ...updatedExpense,
        created_at: convertDayjsToTimestamp(updatedExpense.created_at),
      },
    }),
  getExpenses: (search: Search) => api.post(`/expenses`, { ...search }),
  getExpensesById: (id: number) => api.get(`/expenses/${id}`),
  getMonthTotalExpense: (dateRange: {
    startMonthDate: string;
    endMonthDate: string;
  }) =>
    api.post(`/expenses/total`, {
      start: dateRange.startMonthDate,
      end: dateRange.endMonthDate,
    }),
  deleteExpense: (id: number) => api.delete(`/expenses/delete_expense/${id}`),
  addCategory: (newCategory: Category) =>
    api.post("/categories/create_category", {
      ...newCategory,
      created_at: moment().format("YYYY-MM-DD HH:mm:ss"),
    }),
  updateCategory: (id: number, updatedCategory: Category) =>
    api.put(`/categories/update_category/${id}`, { updatedCategory }),
  getAllCategories: () => api.get("/categories"),
  getCategoryById: (id: string) => api.get(`/categories/${id}`),
  deleteCategory: (id: number) =>
    api.delete(`/categories/delete_category/${id}`),
} as ApiType;
