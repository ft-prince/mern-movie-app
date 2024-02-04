// Import necessary modules and dependencies
import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import userModel from "../models/user.model.js";
import favoriteModel from "../models/favorite.model.js";
import reviewModel from "../models/review.model.js";
import tokenMiddleware from "../middlewares/token.middleware.js";

/**
 * Controller function for retrieving a list of media items.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;

    // Fetch a list of media items from TMDB API
    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    // Send a successful response with the fetched media items
    return responseHandler.ok(res, response);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for retrieving genres of a media type.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.params;

    // Fetch genres of the specified media type from TMDB API
    const response = await tmdbApi.mediaGenres({ mediaType });

    // Send a successful response with the fetched genres
    return responseHandler.ok(res, response);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for searching media items.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const search = async (req, res) => {
  try {
    const { mediaType } = req.params;
    const { query, page } = req.query;

    // Adjust media type for people search
    const adjustedMediaType = mediaType === "people" ? "person" : mediaType;

    // Search for media items using the specified query and page
    const response = await tmdbApi.mediaSearch({
      query,
      page,
      mediaType: adjustedMediaType,
    });

    // Send a successful response with the search results
    responseHandler.ok(res, response);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for retrieving details of a media item.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getDetail = async (req, res) => {
  try {
    const { mediaType, mediaId } = req.params;

    // Define parameters for fetching media details
    const params = { mediaType, mediaId };

    // Fetch media details from TMDB API
    const media = await tmdbApi.mediaDetail(params);

    // Fetch media credits, videos, recommendations, images, and user-related information
    media.credits = await tmdbApi.mediaCredits(params);
    const videos = await tmdbApi.mediaVideos(params);
    media.videos = videos;
    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;
    media.images = await tmdbApi.mediaImages(params);

    // Decode and verify the token from the request headers
    const tokenDecoded = tokenMiddleware.tokenDecode(req);

    // Check if the user is logged in and fetch user information
    if (tokenDecoded) {
      const user = await userModel.findById(tokenDecoded.data);

      if (user) {
        // Check if the media item is in the user's favorites
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          mediaId,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    // Fetch reviews for the media item and populate user details
    media.reviews = await reviewModel
      .find({ mediaId })
      .populate("user")
      .sort("-createdAt");

    // Send a successful response with the fetched media details
    responseHandler.ok(res, media);
  } catch (e) {
    console.log(e);
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

// Export an object containing all the media-related controller functions
export default { getList, getGenres, search, getDetail };
