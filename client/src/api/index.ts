import { AxiosResponse } from "axios";
import { Category, Expense, Sort } from "../types";
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
  getAllExpenses: (sort: Sort) => Promise<AxiosResponse<Expense[]>>;
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
  getCategoryById: (id: number) => Promise<AxiosResponse<Category>>;
  deleteCategory: (id: number) => Promise<AxiosResponse<{ success: boolean }>>;
}

export default {
  addExpense: (newExpense: Expense) =>
    api.post("/expenses/create_expense", {
      ...newExpense,
      createdAt: convertDayjsToTimestamp(newExpense.createdAt),
    }),
  updateExpense: (id: number, updatedExpense: Expense) =>
    api.put(`/expenses/update_expense/${id}`, {
      expense: {
        ...updatedExpense,
        createdAt: convertDayjsToTimestamp(updatedExpense.createdAt),
      },
    }),
  getAllExpenses: (sort: Sort) =>
    api.get(
      `/expenses?sortBy=${sort.sortBy}&sortDirection=${sort.sortDirection}`
    ),
  getExpensesById: (id: number) => api.get(`/expenses/${id}`),
  deleteExpense: (id: number) => api.delete(`/expenses/delete_expense/${id}`),
  addCategory: (newCategory: Category) =>
    api.post("/categories/create_category", {
      ...newCategory,
      createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
    }),
  updateCategory: (id: number, updatedCategory: Category) =>
    api.put(`/categories/update_category/${id}`, { updatedCategory }),
  getAllCategories: () => api.get("/categories"),
  getCategoryById: (id: number) => api.get(`/categories/${id}`),
  deleteCategory: (id: number) =>
    api.delete(`/categories/delete_category/${id}`),
} as ApiType;
