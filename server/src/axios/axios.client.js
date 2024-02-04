// Import the Axios library for making HTTP requests
import axios from "axios";

/**
 * Asynchronous function to perform an HTTP GET request using Axios.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise} - A promise that resolves to the data received from the HTTP GET request.
 */
const get = async (url) => {
  // Make an HTTP GET request using Axios with specified headers
  const response = await axios.get(url, {
    headers: {
      Accept: "application/json",
      "Accept-Encoding": "identity"
    }
  });

  // Return the data received from the HTTP GET request
  return response.data;
};

// Export the 'get' function for use in other parts of the application
export default { get };
