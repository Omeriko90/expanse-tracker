import { useMutation, useQueryClient } from "react-query";
import { Expense, State } from "src/types";
import api from "src/api";
import { useDispatch, useSelector } from "react-redux";
import { setNoMoreData, setPage } from "src/reducers/global";
import { AxiosError } from "axios";

interface Props {
  onError: (msg: string) => void;
}

function useGetNextPage({ onError }: Props) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { sortBy, sortDirection, q } = useSelector(
    (state: State) => state.global
  );

  return useMutation(
    "infiniteScroll",
    async (page: number) => {
      const response = await api.getExpenses({
        sortBy,
        sortDirection,
        page,
        q,
      });

      response.data.forEach((expense: Expense) =>
        queryClient.setQueryData(["expense", expense.id], expense)
      );

      queryClient.setQueryData(
        ["expenses", { sortBy, sortDirection, q }],
        (oldState: Expense[] | undefined) =>
          [...(oldState || []), ...response.data] as Expense[]
      );
      dispatch(setPage(page));

      const endOfExpenses = !response.data.length;

      if (endOfExpenses) {
        dispatch(setNoMoreData(true));
      }
      return response.data;
    },
    {
      onError: (error: AxiosError) => onError(error.message),
    }
  );
}

export default useGetNextPage;
