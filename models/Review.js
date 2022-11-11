const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewName: {
    type: String,
    require: true,
  },
  reviewStars: {
    type: String,
    require: true,
  },
  reviewMessage: {
    type: String,
    require: true,
  },
  reviewEmail: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
