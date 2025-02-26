import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducers/global";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
