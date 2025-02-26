import { ONE_HOUR_IN_MS } from "../constants";
import api from "../api";
import { useQuery } from "react-query";

function useGetAllCategories() {
  return useQuery(
    "categories",
    async () => {
      const response = await api.getAllCategories();

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
