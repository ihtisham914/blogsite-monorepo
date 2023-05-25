"use client";
import { createSlice } from "@reduxjs/toolkit";

const TabSlice = createSlice({
  name: "Tab",
  initialState: {
    index: 0,
    loading: false,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.index = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setActiveTab, setLoading } = TabSlice.actions;
export default TabSlice.reducer;
