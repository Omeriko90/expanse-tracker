import { useMutation, useQueryClient } from "react-query";
import { Expense, SortDirection, State } from "src/types";
import api from "src/api";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { getIsBiggerBySortField } from "src/helpers";

interface Props {
  onSuccess: () => void;
  onError: (msg: string) => void;
}

function useAddExpense({ onSuccess, onError }: Props) {
  const queryClient = useQueryClient();
  const { sortBy, sortDirection } = useSelector((state: State) => state.global);

  return useMutation(
    "addExpense",
    async (expense: Expense) => {
      const response = await api.addExpense(expense);
      const newExpense = response.data.expense;

      queryClient.setQueryData(["expense", newExpense.id], newExpense);

      queryClient.setQueryData(
        ["expenses", { sortBy, sortDirection }],
        (oldState: Expense[] | undefined) => {
          const isAsceding = sortDirection === SortDirection.ASC;
          const insertIndex =
            oldState?.findIndex((data: Expense) => {
              const isBigger = getIsBiggerBySortField(sortBy, data, newExpense);
              if ((isAsceding && isBigger) || (!isAsceding && !isBigger)) {
                return true;
              }
            }) || 0;
          return [
            ...(oldState?.slice(0, insertIndex) || []),
            newExpense,
            ...(oldState?.slice(insertIndex) || []),
          ];
        }
      );

      return expense;
    },
    {
      onSuccess,
      onError: (error: AxiosError) => onError(error.message),
    }
  );
}

export default useAddExpense;
