import { Option } from "../types";

export const ONE_HOUR_IN_MS = 1000 * 60 * 60;

export const SORT_BY_OPTIONS: Option[] = [
  { id: "createdAt", label: "Created At" },
  { id: "category", label: "Category" },
  { id: "amount", label: "Amount" },
];
