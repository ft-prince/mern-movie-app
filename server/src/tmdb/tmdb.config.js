// Retrieve TMDB base URL and API key from environment variables
const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

/**
 * Function to construct a full TMDB API URL with the specified endpoint and query parameters.
 *
 * @param {string} endpoint - The TMDB API endpoint.
 * @param {Object} params - Query parameters to be appended to the URL.
 * @returns {string} - The full TMDB API URL with the API key and query parameters.
 */
const getUrl = (endpoint, params) => {
  // Create a URLSearchParams object for handling query parameters
  const qs = new URLSearchParams(params);

  // Construct the full TMDB API URL with the endpoint, API key, and query parameters
  return `${baseUrl}${endpoint}?api_key=${key}&${qs}`;
};

// Export the 'getUrl' function for use in other parts of the application
export default { getUrl };
