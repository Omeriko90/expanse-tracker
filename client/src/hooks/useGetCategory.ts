import { ONE_HOUR_IN_MS } from "src/constants";
import api from "src/api";
import { useQuery } from "react-query";

function useGetCategory(id: string) {
  return useQuery(
    ["category", id],
    async () => {
      const response = await api.getCategoryById(id);
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: ONE_HOUR_IN_MS,
    }
  );
}

export default useGetCategory;
