const mongoose = require("mongoose");
const { Schema } = mongoose;

const PublisherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    location: {
      type: String,
      trim: true,
      default: undefined,
    },
  },
  {
    timestamps: true,
    collection: "publishers",
  }
);

const Publisher = mongoose.model("Publisher", PublisherSchema);
module.exports = Publisher;
