// Import necessary modules and dependencies
import express from "express";
import { body } from "express-validator";
import reviewController from "../controllers/review.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";
import requestHandler from "../handlers/request.handler.js";

// Create an Express router with mergeParams option set to true
const router = express.Router({ mergeParams: true });

// Define route for getting reviews associated with the authenticated user
router.get("/", tokenMiddleware.auth, reviewController.getReviewsOfUser);

// Define route for creating a new review
router.post(
  "/",
  tokenMiddleware.auth,
  // Validation checks using express-validator
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId cannot be empty"),
  body("content")
    .exists()
    .withMessage("content is required")
    .isLength({ min: 1 })
    .withMessage("content cannot be empty"),
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType is invalid"),
  body("mediaTitle").exists().withMessage("mediaTitle is required"),
  body("mediaPoster").exists().withMessage("mediaPoster is required"),
  requestHandler.validate, // Middleware for handling validation errors
  reviewController.create
);

// Define route for deleting a specific review
router.delete("/:reviewId", tokenMiddleware.auth, reviewController.remove);

// Export the router for use in other parts of the application
export default router;
