import { Dayjs } from "dayjs";
import { State as globalState } from "../reducers/global";

export enum SortDirection {
  DESC = "desc",
  ASC = "asc",
}

export interface Option {
  id: string;
  label: string;
}

export interface Sort {
  sortBy: string;
  sortDirection: SortDirection;
}

export interface Reporter {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface Expense {
  id: number;
  createdAt: Dayjs;
  description?: string;
  category: string;
  amount: number;
}

export interface State {
  global: globalState;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  createdAt?: string;
}
