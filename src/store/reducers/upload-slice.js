import { createSlice } from "@reduxjs/toolkit";

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    showUploader: false,
  },
  reducers: {
    toggleShowUploader(state) {
      state.showUploader = !state.showUploader;
    },
  },
});

export const uploadActions = uploadSlice.actions;

export default uploadSlice;
