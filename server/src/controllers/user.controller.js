// Import necessary modules and dependencies
import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

/**
 * Controller function for user signup.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const signup = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;

    // Check if the username is already in use
    const checkUser = await userModel.findOne({ username });

    if (checkUser)
      return responseHandler.badrequest(res, "Username already in use");

    // Create a new user instance and set the user details
    const user = new userModel();
    user.displayName = displayName;
    user.username = username;
    user.setPassword(password);

    // Save the new user to the database
    await user.save();

    // Generate a JWT token for the new user
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Send a successful response with the token and user details
    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
    // Inside the catch block of each controller function

  }
};

/**
 * Controller function for user signin.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username and select relevant fields
    const user = await userModel
      .findOne({ username })
      .select("username password salt id displayName");

    // Return an error response if the user does not exist
    if (!user) return responseHandler.badrequest(res, "User not found");

    // Return an error response if the password is incorrect
    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Incorrect password");

    // Generate a JWT token for the authenticated user
    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Remove sensitive information from the user object before sending the response
    user.password = undefined;
    user.salt = undefined;

    // Send a successful response with the token and user details
    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for updating user password.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    // Find the user by ID and select relevant fields
    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    // Return an unauthorized response if the user does not exist
    if (!user) return responseHandler.unauthorize(res);

    // Return an error response if the provided password is incorrect
    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Incorrect password");

    // Set the new password for the user and save the changes
    user.setPassword(newPassword);
    await user.save();

    // Send a successful response
    responseHandler.ok(res);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

/**
 * Controller function for retrieving user information.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
const getInfo = async (req, res) => {
  try {
    // Find the user by ID
    const user = await userModel.findById(req.user.id);

    // Return a not found response if the user does not exist
    if (!user) return responseHandler.notfound(res);

    // Send a successful response with the user details
    responseHandler.ok(res, user);
  } catch {
    // Handle unexpected errors with a generic error response
    responseHandler.error(res);
  }
};

// Export an object containing all the user-related controller functions
export default {
  signup,
  signin,
  getInfo,
  updatePassword,
};
