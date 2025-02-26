import { useMutation, useQueryClient } from "react-query";
import { State } from "../types";
import api from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setNoMoreData, setPage, setRateLimit } from "../reducers/global";
import { AxiosError } from "axios";

function useGetNextPage() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const rateLimit = useSelector((state: State) => state.global.rateLimit);

  return useMutation(
    "infiniteScroll",
    async (page: number) => {
      const newIssues = await api.searchIssues(page);

      queryClient.setQueryData(
        "issues",
        (oldState: Issue[] | undefined) =>
          [...(oldState || []), ...newIssues.data.issues] as Issue[]
      );

      dispatch(setPage(page));

      const endOfArticles = !newIssues.data.issues.length;

      if (endOfArticles) {
        dispatch(setNoMoreData(true));
      }
      if (rateLimit) {
        dispatch(setRateLimit(false));
      }
      return newIssues.data.issues;
    },
    {
      onError: (error: AxiosError<{ code: string; message: string }>) => {
        if (error.response?.data.code === "RATE_LIMIT") {
          dispatch(setRateLimit(true));
        } else {
          alert(
            "There was a problem with fetching the issues. Please try again"
          );
        }
      },
    }
  );
}

export default useGetNextPage;
