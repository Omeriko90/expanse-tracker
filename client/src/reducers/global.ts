import { createSlice } from "@reduxjs/toolkit";
import { SnackbarType, SortDirection } from "../types";

export interface State {
  page: number;
  noMoreData: boolean;
  q: string;
  sortBy: string;
  sortDirection: SortDirection;
  editExpenseId: string;
  snackbarMsg: string;
  snackbarType: SnackbarType;
}

const globalSlice = createSlice({
  name: "global",
  initialState: {
    page: 0,
    noMoreData: false,
    q: null,
    editExpenseId: null,
    sortBy: "created_at",
    sortDirection: SortDirection.DESC,
    snackbarMsg: null,
    snackbarType: SnackbarType.SUCESS,
  },
  reducers: {
    reset(state) {
      state.noMoreData = false;
      state.page = 0;
    },
    setNoMoreData(state, action) {
      state.noMoreData = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSearch(state, action) {
      state.q = action.payload;
      globalSlice.caseReducers.reset(state);
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
      globalSlice.caseReducers.reset(state);
    },
    setSortDirection(state, action) {
      state.sortDirection = action.payload;
      globalSlice.caseReducers.reset(state);
    },
    setEditExpenseId(state, action) {
      state.editExpenseId = action.payload;
    },
    setSnackbarMsg(state, action) {
      state.snackbarMsg = action.payload;
    },
    setSnackbarType(state, action) {
      state.snackbarType = action.payload;
    },
  },
});

export const {
  setPage,
  setNoMoreData,
  setSearch,
  setSortDirection,
  setSortBy,
  setEditExpenseId,
  setSnackbarMsg,
  setSnackbarType,
} = globalSlice.actions;
export default globalSlice.reducer;
