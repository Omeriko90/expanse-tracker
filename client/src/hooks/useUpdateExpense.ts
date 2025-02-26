import { useMutation, useQueryClient } from "react-query";
import { Expense } from "../types";
import api from "../api";
// import { AxiosError } from "axios";

function useUpdateExpense(id: number) {
  const queryClient = useQueryClient();

  return useMutation(
    "updateExpense",
    async (updatedExpense: Expense) => {
      const response = await api.updateExpense(id, updatedExpense);
      const newExpense = response.data.expense;

      queryClient.setQueryData(["expense", id], newExpense);

      queryClient.setQueryData("expenses", (oldState: Expense[] | undefined) =>
        (oldState || [])?.map((expense: Expense) => {
          if (expense.id === id) {
            return newExpense;
          }
          return expense;
        })
      );

      return newExpense;
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

export default useUpdateExpense;
