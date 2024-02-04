// Import necessary modules and dependencies
import express from "express";
import personController from "../controllers/person.controller.js";

// Create an Express router with mergeParams option set to true
const router = express.Router({ mergeParams: true });

// Define route for getting media associated with a specific person
router.get("/:personId/medias", personController.personMedias);

// Define route for getting detailed information about a specific person
router.get("/:personId", personController.personDetail);

// Export the router for use in other parts of the application
export default router;
