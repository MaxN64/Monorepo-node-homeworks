const mongoose = require("mongoose");

const { Schema } = mongoose;

const MagazineSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    issueNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Publisher",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    collection: "magazines",
  }
);

const Magazine = mongoose.model("Magazine", MagazineSchema);

module.exports = Magazine;
