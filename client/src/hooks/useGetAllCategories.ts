import { ONE_HOUR_IN_MS } from "src/constants";
import api from "src/api";
import { useQuery, useQueryClient } from "react-query";
import { Category } from "src/types";

function useGetAllCategories() {
  const queryClient = useQueryClient();
  return useQuery(
    "categories",
    async () => {
      const response = await api.getAllCategories();
      response.data.forEach((category: Category) =>
        queryClient.setQueryData(["category", category.id], category)
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: ONE_HOUR_IN_MS,
    }
  );
}

export default useGetAllCategories;
