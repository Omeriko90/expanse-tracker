import { useQuery } from "react-query";
import api from "../api";
import { ONE_HOUR_IN_MS } from "../constants";

function useGetExpense(id: number) {
  return useQuery(
    ["expense", id],
    async () => {
      const response = await api.getExpensesById(id);

      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: ONE_HOUR_IN_MS,
    }
  );
}

export default useGetExpense;
