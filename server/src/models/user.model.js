import mongoose from "mongoose";
import modelOptions from "./model.options.js";
import crypto from "crypto";

// Define a Mongoose schema for a user
const userSchema = new mongoose.Schema(
  {
    // Username is a required and unique string field
    username: {
      type: String,
      required: true,
      unique: true,
    },
    // Display name is a required string field
    displayName: {
      type: String,
      required: true,
    },
    // Password is a required string field, but not included in the document's output
    password: {
      type: String,
      required: true,
      select: false,
    },
    // Salt is a required string field, not included in the document's output
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  modelOptions
); // Applying the model options from model.options.js

// Method to set the password for a user, including generating a random salt
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

// Method to validate a password for a user
userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  // Compare the hashed password with the stored hash
  return this.password === hash;
};

// Create a Mongoose model for the User schema
const userModel = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default userModel;





/*
the crypto module is used in the provided code for secure handling of passwords:

Random Salt Generation:

crypto.randomBytes is used to create a unique and random value (salt) for each user.
The salt adds randomness to the password, making it more resistant to attacks.
Password Hashing:

crypto.pbkdf2Sync is used to hash the user's password using the PBKDF2 algorithm.
PBKDF2 makes password cracking computationally expensive, enhancing security.
In summary, crypto ensures secure generation of random salts and robust password hashing, essential for protecting user credentials in a way that withstands common cryptographic attacks.
*/
