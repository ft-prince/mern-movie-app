// Import necessary modules and dependencies
import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";

/**
 * Controller function for creating a new review.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const create = async (req, res) => {
  try {
    const { movieId } = req.params;

    // Create a new review instance with user ID, movie ID, and request body
    const review = new reviewModel({
      user: req.user.id,
      movieId,
      ...req.body,
    });

    // Save the new review to the database
    await review.save();

    // Send a successful response with the review details and user information
    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for removing a review.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const remove = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Find the review by ID and user ID
    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    // Return a not found response if the review does not exist
    if (!review) return responseHandler.notfound(res);

    // Remove the review from the database
    await review.remove();

    // Send a successful response
    responseHandler.ok(res);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for retrieving reviews of a user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getReviewsOfUser = async (req, res) => {
  try {
    // Find reviews by user ID and sort them by creation date in descending order
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");

    // Send a successful response with the user's reviews
    responseHandler.ok(res, reviews);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

// Export an object containing all the review-related controller functions
export default { create, remove, getReviewsOfUser };
