import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const ReviewSlice = createSlice({
  name: "Review",
  initialState: {
    reviews: [],
    pending: false,
    error: false,
  },
  reducers: {
    GetReviewsStart: (state) => {
      state.pending = true;
    },
    GetReviewsSuccess: (state, action) => {
      state.pending = false;
      state.reviews = action.payload;
    },
    GetReviewsError: (state, action) => {
      state.error = true;
      state.pending = false;
      toast.error(action.payload, {
        position: "top-center",
        style: { width: "auto", height: "auto" },
        duration: 3000,
      });
    },
  },
});

export const { GetReviewsStart, GetReviewsSuccess, GetReviewsError } =
  ReviewSlice.actions;
export default ReviewSlice.reducer;
