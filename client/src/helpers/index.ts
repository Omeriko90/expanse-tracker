import { Dayjs } from "dayjs";
import moment from "moment";
import { Expense } from "src/types";

export const convertDayjsToTimestamp = (date: Dayjs) =>
  moment(date.toISOString()).format("YYYY-MM-DD HH:mm:ss");

export const getIsBiggerBySortField = (
  sortBy: string,
  expenseA: Expense,
  expenseB: Expense
) => {
  switch (sortBy) {
    case "created_at":
      return expenseA.created_at > expenseB.created_at;
    case "amount":
      return expenseA.amount > expenseB.amount;
    case "category_id":
      return expenseA.category_id > expenseB.category_id;
  }
};

export const parseAmount = (amount: number) => {
  if (amount > 1000000) {
    return `${(amount / 1000000).toFixed(2)}M`;
  } else if (amount >= 1000) {
    return `${(amount / 1000).toFixed(2)}k`;
  } else {
    return amount;
  }
};
