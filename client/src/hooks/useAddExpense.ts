import { useMutation, useQueryClient } from "react-query";
import { Expense } from "../types";
import api from "../api";
import moment from "moment";
// import { AxiosError } from "axios";

function useAddExpense() {
  const queryClient = useQueryClient();

  return useMutation(
    "addExpense",
    async (expense: Expense) => {
      const response = await api.addExpense(expense);
      const newExpense = response.data.expense;

      queryClient.setQueryData(["expense", newExpense.id], newExpense);

      queryClient.setQueryData(
        "expenses",
        (oldState: Expense[] | undefined) =>
          [...(oldState || []), newExpense] as Expense[]
      );

      return expense;
    }
    // {
    //   onError: (error: AxiosError<{ code: string; message: string }>) => {
    //     if (error.response?.data.code === "RATE_LIMIT") {
    //       dispatch(setRateLimit(true));
    //     } else {
    //       alert(
    //         "There was a problem with fetching the issues. Please try again"
    //       );
    //     }
    //   },
    // }
  );
}

export default useAddExpense;
