import { useQuery, useQueryClient } from "react-query";
import api from "src/api";
import { Expense, State } from "src/types";
import { ONE_HOUR_IN_MS } from "src/constants";
import { useSelector } from "react-redux";

function useGetExpenses(page: number) {
  const queryClient = useQueryClient();
  const { sortBy, sortDirection, q } = useSelector(
    (state: State) => state.global
  );
  return useQuery(
    ["expenses", { sortBy, sortDirection, q }],
    async () => {
      const response = await api.getExpenses({
        sortBy,
        sortDirection,
        q,
        page,
      });
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

export default useGetExpenses;
