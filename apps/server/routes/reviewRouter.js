import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAllReviews,
} from "../controller/reviewController.js";
import { verifyAdminToken } from "../middleware/verifyToken.js";

const reviewRouter = Router();

reviewRouter.route("/").get(verifyAdminToken, getAllReviews).post(createReview);
reviewRouter.route("/:id").delete(verifyAdminToken, deleteReview);

export default reviewRouter;
