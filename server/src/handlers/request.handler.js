// Import the 'validationResult' function from the 'express-validator' module
import { validationResult } from "express-validator";

/**
 * Middleware function to validate the request based on defined validation rules.
 * If validation fails, it sends a 400 Bad Request response with the first error message.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next function in the middleware chain.
 */



const validate = (req, res, next) => {
  // Retrieve validation errors from the request
  const errors = validationResult(req);

  // If there are validation errors, send a 400 Bad Request response with the first error message
  if (!errors.isEmpty()) return res.status(400).json({
    message: errors.array()[0].msg
  });

  // Call the next middleware or route handler in the chain if validation passes
  next();
};

// Export the validation middleware for use in other parts of the application
export default { validate };
