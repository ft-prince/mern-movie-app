// Import necessary modules and dependencies
import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

/**
 * Controller function for retrieving details of a person from TMDB.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    // Fetch details of the person from TMDB API
    const person = await tmdbApi.personDetail({ personId });

    // Send a successful response with the person details
    responseHandler.ok(res, person);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for retrieving media credits of a person from TMDB.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    // Fetch media credits of the person from TMDB API
    const medias = await tmdbApi.personMedias({ personId });

    // Send a successful response with the person's media credits
    responseHandler.ok(res, medias);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

// Export an object containing all the person-related controller functions
export default { personDetail, personMedias };
