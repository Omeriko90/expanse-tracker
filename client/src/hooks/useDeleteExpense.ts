import { useMutation, useQueryClient } from "react-query";
import { Expense } from "src/types";
import api from "src/api";
import { AxiosError } from "axios";

interface Props {
  onSuccess: () => void;
  onError: (msg: string) => void;
}

function useDeleteExpense({ onSuccess, onError }: Props) {
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
    },
    {
      onSuccess,
      onError: (error: AxiosError) => onError(error.message),
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
