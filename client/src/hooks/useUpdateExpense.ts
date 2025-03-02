import { useMutation, useQueryClient } from "react-query";
import { Expense, State } from "src/types";
import api from "src/api";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";

interface Props {
  id: number;
  onSuccess: () => void;
  onError: (msg: string) => void;
}

function useUpdateExpense({ id, onSuccess, onError }: Props) {
  const queryClient = useQueryClient();
  const { sortBy, sortDirection, q } = useSelector(
    (state: State) => state.global
  );
  return useMutation(
    "updateExpense",
    async (updatedExpense: Expense) => {
      const response = await api.updateExpense(id, updatedExpense);
      const newExpense = response.data.expense;

      queryClient.setQueryData(["expense", id], newExpense);

      queryClient.setQueryData(
        ["expenses", { sortBy, sortDirection, q }],
        (oldState: Expense[] | undefined) =>
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
