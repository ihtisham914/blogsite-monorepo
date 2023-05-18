import Mongoose from "mongoose";

const ReviewSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "reviewer must provide his/her name"],
    },
    rating: {
      type: Number,
      required: [true, "review must have a rating"],
    },
    text: { type: String },
  },
  { timestamps: true }
);

export const ReviewModel = Mongoose.model("reviews", ReviewSchema);
