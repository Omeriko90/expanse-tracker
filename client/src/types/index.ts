import { Dayjs } from "dayjs";
import { State as globalState } from "../reducers/global";

export enum SortDirection {
  DESC = "desc",
  ASC = "asc",
}
export enum SnackbarType {
  DANGER = "danger",
  SUCESS = "success",
}
export enum Categories {
  HOUSING = "housing",
  TRANSPORTATION = "transportation",
  FOOD = "food",
  UTILITIES = "utilities",
  INSURANCE = "insurance",
  MEDICAL_HEALTHCARE = "medical_healthcare",
  SAVING_INVESTING_DEBT_PAYMENTS = "saving_investing_debt_payments",
  PERSONAL = "personal",
  ENTERTAINMENT = "entertainment",
  OTHER = "other",
}

export interface Option {
  id: string;
  label: string;
}

export interface Search {
  sortBy: string;
  sortDirection: SortDirection;
  q: string;
  page: number;
}

export interface Expense {
  id: number;
  created_at: Dayjs;
  description?: string;
  category_id: string;
  amount: string;
}

export interface State {
  global: globalState;
}

export interface Category {
  id: Categories;
  name: string;
  description: string;
  created_at?: string;
}
