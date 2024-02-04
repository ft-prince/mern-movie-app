/**
 * Function to send an HTTP response with status code and data.
 *
 * @param {object} res - The response object.
 * @param {number} statusCode - The HTTP status code.
 * @param {object} data - The data to be included in the response.
 */
const responseWithData = (res, statusCode, data) => res.status(statusCode).json(data);

/**
 * Function to send a generic error response with a 500 status code.
 *
 * @param {object} res - The response object.
 */
const error = (res) => responseWithData(res, 500, {
  status: 500,
  message: "Oops! Something went wrong!"
});

/**
 * Function to send a bad request response with a 400 status code and a specified message.
 *
 * @param {object} res - The response object.
 * @param {string} message - The error message for the bad request.
 */
const badrequest = (res, message) => responseWithData(res, 400, {
  status: 400,
  message
});

/**
 * Function to send an OK response with a 200 status code and specified data.
 *
 * @param {object} res - The response object.
 * @param {object} data - The data to be included in the response.
 */
const ok = (res, data) => responseWithData(res, 200, data);

/**
 * Function to send a created response with a 201 status code and specified data.
 *
 * @param {object} res - The response object.
 * @param {object} data - The data to be included in the response.
 */
const created = (res, data) => responseWithData(res, 201, data);

/**
 * Function to send an unauthorized response with a 401 status code.
 *
 * @param {object} res - The response object.
 */
const unauthorize = (res) => responseWithData(res, 401, {
  status: 401,
  message: "Unauthorized"
});

/**
 * Function to send a not found response with a 404 status code.
 *
 * @param {object} res - The response object.
 */
const notfound = (res) => responseWithData(res, 404, {
  status: 404,
  message: "Resource not found"
});

// Export an object containing all the response functions for use in other parts of the application
export default {
  error,
  badrequest,
  ok,
  created,
  unauthorize,
  notfound
};
