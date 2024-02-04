// Import TMDB configuration module to get base URL and API key
import tmdbConfig from "./tmdb.config.js";

/**
 * Object containing functions to construct TMDB API endpoints with specified parameters.
 * Each function corresponds to a specific TMDB API endpoint.
 */
const tmdbEndpoints = {
  // Construct the endpoint for retrieving a list of media items
  mediaList: ({ mediaType, mediaCategory, page }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaCategory}`, { page }),

  // Construct the endpoint for retrieving details of a specific media item
  mediaDetail: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}`),

  // Construct the endpoint for retrieving genre information for a specific media type
  mediaGenres: ({ mediaType }) =>
    tmdbConfig.getUrl(`genre/${mediaType}/list`),

  // Construct the endpoint for retrieving credits for a specific media item
  mediaCredits: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/credits`),

  // Construct the endpoint for retrieving videos for a specific media item
  mediaVideos: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/videos`),

  // Construct the endpoint for retrieving recommended media for a specific item
  mediaRecommend: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),

  // Construct the endpoint for retrieving images for a specific media item
  mediaImages: ({ mediaType, mediaId }) =>
    tmdbConfig.getUrl(`${mediaType}/${mediaId}/images`),

  // Construct the endpoint for searching media items based on a query
  mediaSearch: ({ mediaType, query, page }) =>
    tmdbConfig.getUrl(`search/${mediaType}`, { query, page }),

  // Construct the endpoint for retrieving details of a specific person
  personDetail: ({ personId }) =>
    tmdbConfig.getUrl(`person/${personId}`),

  // Construct the endpoint for retrieving media credits for a specific person
  personMedias: ({ personId }) =>
    tmdbConfig.getUrl(`person/${personId}/combined_credits`),
};

// Export the TMDB endpoints object for use in other parts of the application
export default tmdbEndpoints;
