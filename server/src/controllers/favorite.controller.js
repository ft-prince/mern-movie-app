// Import necessary modules and dependencies
import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";

/**
 * Controller function for adding a media item to favorites.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const addFavorite = async (req, res) => {
  try {
    // Check if the media item is already in the user's favorites
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    // Return the existing favorite if found
    if (isFavorite) return responseHandler.ok(res, isFavorite);

    // Create a new favorite instance and save it to the database
    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();

    // Send a successful response with the newly added favorite
    responseHandler.created(res, favorite);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for removing a media item from favorites.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    // Find the favorite by ID and user ID
    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    // Return a not found response if the favorite does not exist
    if (!favorite) return responseHandler.notfound(res);

    // Remove the favorite from the database
    await favorite.remove();

    // Send a successful response
    responseHandler.ok(res);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for retrieving favorites of a user.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getFavoritesOfUser = async (req, res) => {
  try {
    // Find favorites by user ID and sort them by creation date in descending order
    const favorites = await favoriteModel
      .find({ user: req.user.id })
      .sort("-createdAt");

    // Send a successful response with the user's favorites
    responseHandler.ok(res, favorites);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

// Export an object containing all the favorite-related controller functions
export default { addFavorite, removeFavorite, getFavoritesOfUser };
