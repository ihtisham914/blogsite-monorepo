"use client";
import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import TabReducer from "./TabSlice";

export const store = configureStore({
  reducer: {
    User: UserReducer,
    Tab: TabReducer,
  },
});
