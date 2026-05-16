const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { addMedicine, getAllMedicines, updateMedicine, deleteMedicine } = require("../controllers/medicineController");

router.get("/", getAllMedicines);
router.post("/", auth, role("admin"), addMedicine);
router.put("/:id", auth, role("admin"), updateMedicine);
router.delete("/:id", auth, role("admin"), deleteMedicine);

module.exports = router;