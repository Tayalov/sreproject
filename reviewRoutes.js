const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { addReview, getReviewsForMedicine, updateReview, deleteReview } = require("../controllers/reviewController");

router.post("/", auth, addReview);
router.get("/:id", getReviewsForMedicine);
router.put("/:id", auth, updateReview);
router.delete("/:id", auth, deleteReview);

module.exports = router;