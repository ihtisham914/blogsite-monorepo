import Mongoose from "mongoose";

const blogSchema = new Mongoose.Schema(
  {
    title: { type: String, required: [true, "blog must have a title"] },
    description: {
      type: String,
      required: [true, "blog must have a description"],
    },
    imageUrl: { type: String },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [
        {
          username: String,
          email: String,
          desc: String,
        },
      ],
    },
  },
  { timestamps: true }
);

export const BlogModel = Mongoose.model("Blogs", blogSchema);
