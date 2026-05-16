const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
  text: { type: String },
  rating: { type: Number, min: 1, max: 5 }
});

module.exports = mongoose.model("Review", reviewSchema);