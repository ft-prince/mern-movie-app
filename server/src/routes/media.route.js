// Import necessary modules and dependencies
import express from "express";
import mediaController from "../controllers/media.controller.js";

// Create an Express router with mergeParams option set to true
const router = express.Router({ mergeParams: true });

// Define route for searching media
router.get("/search", mediaController.search);

// Define route for getting media genres
router.get("/genres", mediaController.getGenres);

// Define route for getting detailed information about a specific media item
router.get("/detail/:mediaId", mediaController.getDetail);

// Define route for getting a list of media items based on media category
router.get("/:mediaCategory", mediaController.getList);

// Export the router for use in other parts of the application
export default router;
