const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { getAllPatients, getProfile } = require("../controllers/userController");

router.get("/patients", auth, role("doctor","admin"), getAllPatients);
router.get("/profile", auth, getProfile);

module.exports = router;