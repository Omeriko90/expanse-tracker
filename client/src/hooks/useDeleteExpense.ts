import { useMutation, useQueryClient } from "react-query";
import { Expense } from "../types";
import api from "../api";
// import { AxiosError } from "axios";

function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation(
    "deleteExpense",
    async (id: number) => {
      const response = await api.deleteExpense(id);

      if (response.data.success) {
        queryClient.removeQueries(["expense", id]);

        queryClient.setQueryData(
          "expenses",
          (oldState: Expense[] | undefined) =>
            (oldState || [])?.filter((expense: Expense) => expense.id !== id)
        );
      }
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

export default useDeleteExpense;
