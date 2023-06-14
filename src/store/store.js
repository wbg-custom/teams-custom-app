import { configureStore } from "@reduxjs/toolkit";
import contextSlice from "./reducers/context-slice";
import uploadSlice from "./reducers/upload-slice";

export const store = configureStore({
  reducer: {
    context: contextSlice.reducer,
    upload: uploadSlice.reducer,
  },
});
