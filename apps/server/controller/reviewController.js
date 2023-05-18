import { ReviewModel } from "../model/reviewModel.js";

// getting all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find();
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

// posting review
export const createReview = async (req, res) => {
  try {
    const { name, rating, text } = req.body;
    const newReview = await ReviewModel.create({ name, rating, text });
    res.status(200).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

// Deleting a review
export const deleteReview = async (req, res) => {
  try {
    await ReviewModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Review deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
