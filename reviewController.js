const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const { medicine, text, rating } = req.body;
    const review = await Review.create({
      user: req.user.id,
      medicine,
      text,
      rating
    });
    res.status(201).json({ message: "Review added", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReviewsForMedicine = async (req, res) => {
  try {
    const reviews = await Review.find({ medicine: req.params.id }).populate("user", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Updated", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};