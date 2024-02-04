// Import the Axios client instance and TMDB API endpoints
import axiosClient from "../axios/axios.client.js";
import tmdbEndpoints from "./tmdb.endpoints.js";

/**
 * Object containing asynchronous methods to interact with The Movie Database (TMDB) API.
 * Each method corresponds to a specific TMDB API endpoint.
 */
const tmdbApi = {
  // Retrieve a list of media items based on specified parameters
  mediaList: async ({ mediaType, mediaCategory, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })
    ),

  // Retrieve details for a specific media item based on its type and ID
  mediaDetail: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaDetail({ mediaType, mediaId })),

  // Retrieve genre information for a specific media type
  mediaGenres: async ({ mediaType }) =>
    await axiosClient.get(tmdbEndpoints.mediaGenres({ mediaType })),

  // Retrieve credits for a specific media item based on its type and ID
  mediaCredits: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),

  // Retrieve videos for a specific media item based on its type and ID
  mediaVideos: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),

  // Retrieve images for a specific media item based on its type and ID
  mediaImages: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaImages({ mediaType, mediaId })),

  // Retrieve recommended media for a specific item based on its type and ID
  mediaRecommend: async ({ mediaType, mediaId }) =>
    await axiosClient.get(tmdbEndpoints.mediaRecommend({ mediaType, mediaId })),

  // Search for media items based on a query, media type, and page
  mediaSearch: async ({ mediaType, query, page }) =>
    await axiosClient.get(
      tmdbEndpoints.mediaSearch({ mediaType, query, page })
    ),

  // Retrieve details for a specific person based on their ID
  personDetail: async ({ personId }) =>
    await axiosClient.get(tmdbEndpoints.personDetail({ personId })),

  // Retrieve media credits for a specific person based on their ID
  personMedias: async ({ personId }) =>
    await axiosClient.get(tmdbEndpoints.personMedias({ personId })),
};

// Export the TMDB API object for use in other parts of the application
export default tmdbApi;
