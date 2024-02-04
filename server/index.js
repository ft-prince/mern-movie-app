// Import necessary modules and dependencies
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

// Create an Express app
const app = express();

// Set up middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parse incoming URL-encoded requests
app.use(cookieParser()); // Parse cookies

// Use the defined routes for the "/api/v1" path
app.use("/api/v1", routes);

// Set the port for the server to listen on
const port = process.env.PORT || 5000;

// Create an HTTP server using Express app
const server = http.createServer(app);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");

  // Start the server and listen on the specified port
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  // Log an error if MongoDB connection fails and exit the process
  console.log({ err });
  process.exit(1);
});

// Additional test comment
