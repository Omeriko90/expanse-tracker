import { createSlice } from "@reduxjs/toolkit";
import { SortDirection } from "../types";

export interface State {
  page: number;
  noMoreData: boolean;
  q: string;
  sortBy: string;
  sortDirection: SortDirection;
}

const globalSlice = createSlice({
  name: "global",
  initialState: {
    page: 1,
    noMoreData: false,
    q: null,
    sortBy: "createdAt",
    sortDirection: SortDirection.DESC,
  },
  reducers: {
    setNoMoreData(state, action) {
      state.noMoreData = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearch(state, action) {
      state.q = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSortDirection(state, action) {
      state.sortDirection = action.payload;
    },
  },
});

export const {
  setPage,
  setNoMoreData,
  setSearch,
  setSortDirection,
  setSortBy,
} = globalSlice.actions;
export default globalSlice.reducer;
