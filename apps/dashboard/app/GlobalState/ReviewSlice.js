import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const ReviewSlice = createSlice({
  name: "Review",
  initialState: {
    reviews: [
      {
        name: "Talha wajid",
        rating: 4,
        text: "informative",
        createdAt: "2023-05-18T03:22:52.657Z",
      },
      {
        name: "hikmat",
        rating: 3,
        text: "very helpfull",
        createdAt: "2023-05-18T03:41:20.979Z",
      },
      {
        name: "masab",
        rating: 5,
        text: "testing review testing review",
        createdAt: "2023-05-18T03:53:40.561Z",
      },
      {
        name: "ihtisham",
        rating: 4,
        text: "testing review testing review",
        createdAt: "2023-05-18T09:22:17.750Z",
      },
      {
        name: "ihtisham",
        rating: 4,
        text: "testing review testing review",
        createdAt: "2023-05-18T09:22:58.832Z",
      },
    ],
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
