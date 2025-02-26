import { useQuery, useQueryClient } from "react-query";
import api from "../api";
import { Expense, State } from "../types";
import { ONE_HOUR_IN_MS } from "../constants";
import { useSelector } from "react-redux";

function useGetAllExpenses() {
  const queryClient = useQueryClient();
  const { sortBy, sortDirection } = useSelector((state: State) => state.global);
  return useQuery(
    ["expenses", { sortBy, sortDirection }],
    async () => {
      const response = await api.getAllExpenses({ sortBy, sortDirection });
      const expenses = response.data;

      expenses.forEach((expense: Expense) =>
        queryClient.setQueryData(["expense", expense.id], expense)
      );

      return expenses;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: ONE_HOUR_IN_MS,
    }
  );
}

export default useGetAllExpenses;
