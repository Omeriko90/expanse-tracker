import { useMutation, useQueryClient } from "react-query";
import { Expense } from "src/types";
import api from "src/api";
import { AxiosError } from "axios";

interface Props {
  id: number;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

function useUpdateExpense({ id, onSuccess, onError }: Props) {
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

      return updatedExpense;
    },
    { onSuccess, onError: (error: AxiosError) => onError(error.message) }
  );
}

export default useUpdateExpense;
