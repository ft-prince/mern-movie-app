// Import necessary modules and dependencies
import express from "express";
import userRoute from "./user.route.js";
import mediaRoute from "./media.route.js";
import personRoute from "./person.route.js";
import reviewRoute from "./review.route.js";

// Create an Express router
const router = express.Router();

// Use the userRoute for paths starting with "/user"
router.use("/user", userRoute);

// Use the personRoute for paths starting with "/person"
router.use("/person", personRoute);

// Use the reviewRoute for paths starting with "/reviews"
router.use("/reviews", reviewRoute);

// Use the mediaRoute for paths starting with "/:mediaType"
router.use("/:mediaType", mediaRoute);

// Export the router for use in other parts of the application
export default router;
