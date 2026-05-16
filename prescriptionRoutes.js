const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const { addPrescription, getPatientPrescriptions, updatePrescription, deletePrescription } = require("../controllers/prescriptionController");

router.post("/", auth, role("doctor"), addPrescription);
router.get("/my", auth, role("patient"), getPatientPrescriptions);
router.put("/:id", auth, role("doctor"), updatePrescription);
router.delete("/:id", auth, role("doctor"), deletePrescription);

module.exports = router;