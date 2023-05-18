import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
} from "../controller/reviewController.js";

const reviewRouter = Router();

reviewRouter.route("/").get(getAllReviews).post(createReview);
reviewRouter.route("/:id").delete(deleteReview);

export default reviewRouter;
