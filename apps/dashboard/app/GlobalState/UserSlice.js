"use client";
import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    SignInData: {
      username: "ihtisham",
    },
  },
  reducers: {
    SignInUser: (state, action) => {
      state.SignInData = action.payload;
    },
    SignOutUser: (state) => {
      state.SignInData = {};
    },
  },
});

export const { SignInUser, SignOutUser } = UserSlice.actions;
export default UserSlice.reducer;
