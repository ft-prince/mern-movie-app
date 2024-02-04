// Define options for a MongoDB model
const modelOptions = {
    // toJSON and toObject options to include virtuals and transform the output
    toJSON: {
      virtuals: true,
      transform: (_, obj) => {
        // Remove the '_id' field from the output
        delete obj._id;
        return obj;
      }
    },
    toObject: {
      virtuals: true,
      transform: (_, obj) => {
        // Remove the '_id' field from the output
        delete obj._id;
        return obj;
      }
    },
    // Disable the versionKey field in the MongoDB document
    versionKey: false,
    // Enable automatic timestamps for 'createdAt' and 'updatedAt'
    timestamps: true
  };
  
  // Export the model options for reuse
  export default modelOptions;
  