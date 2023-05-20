"use client";

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const BlogSlice = createSlice({
  name: "Blog",
  initialState: {
    blogs: [
      {
        id: 0,
        title: "Mobile Technology and Human",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam.",
        likes: 23,
        comments: [
          {
            username: "umair",
            email: "umair@gmail.com",
            desc: "very informative blog",
          },
        ],
        createdAt: "March 23, 2023",
      },
      {
        id: 1,
        title: "AI and Software Engineering",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam.",
        likes: 65,
        comments: [
          {
            username: "umair",
            email: "umair@gmail.com",
            desc: "very informative blog",
          },
        ],
        createdAt: "March 23, 2023",
      },
    ],
    testing: true,
    pending: false,
    error: false,
  },
  reducers: {
    GetBlogsStart: (state) => {
      state.pending = true;
      console.log(state.pending);
      console.log("End of the start reducer");
    },
    GetBlogsSuccess: (state, action) => {
      state.pending = false;
      state.blogs = action.payload;
    },
    GetBlogsError: (state, action) => {
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

export const { GetBlogsStart, GetBlogsSuccess, GetBlogsError } =
  BlogSlice.actions;
export default BlogSlice.reducer;
