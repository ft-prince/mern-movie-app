// Import necessary modules and dependencies
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";

/**
 * Function to decode and verify the JWT token from the request headers.
 *
 * @param {object} req - The request object.
 * @returns {object|boolean} - Decoded token payload or false if decoding fails.
 */
const tokenDecode = (req) => {
  try {
    // Extract the token from the "Authorization" header
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];

      // Verify and decode the token using the secret key
      return jsonwebtoken.verify(token, process.env.TOKEN_SECRET_KEY);
    }

    return false;
  } catch {
    return false;
  }
};

/**
 * Middleware function for user authentication.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next function in the middleware chain.
 */
const auth = async (req, res, next) => {
  // Decode the token from the request headers
  const tokenDecoded = tokenDecode(req);

  // If token decoding fails or no token is present, return unauthorized response
  if (!tokenDecoded) return responseHandler.unauthorize(res);

  // Retrieve the user from the database using the decoded user ID
  const user = await userModel.findById(tokenDecoded.data);

  // If no user is found, return unauthorized response
  if (!user) return responseHandler.unauthorize(res);

  // Attach the user object to the request for further use in the route handler
  req.user = user;

  // Call the next middleware or route handler in the chain
  next();
};

// Export the authentication middleware and token decoding function
export default { auth, tokenDecode };
