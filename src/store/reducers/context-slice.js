import { createSlice } from "@reduxjs/toolkit";

const contextSlice = createSlice({
  name: "context",
  initialState: {
    sharepointSite: process.env.REACT_APP_TEAMS_SHAREPOINT_SITE
},
  reducers: {
  },
});

export const contextActions = contextSlice.actions;

export default contextSlice;
