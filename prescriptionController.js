const Prescription = require("../models/Prescription");

exports.addPrescription = async (req, res) => {
  try {
    const { patient, medicine, dosage, schedule } = req.body;
    const presc = await Prescription.create({
      doctor: req.user.id,
      patient,
      medicine,
      dosage,
      schedule
    });
    res.status(201).json({ message: "Prescription added", presc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPatientPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ patient: req.user.id })
      .populate("medicine", "name description price")
      .populate("doctor", "name");
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePrescription = async (req, res) => {
  try {
    const presc = await Prescription.findOneAndUpdate(
      { _id: req.params.id, doctor: req.user.id },
      req.body,
      { new: true }
    );
    if (!presc) return res.status(404).json({ message: "Prescription not found" });
    res.json({ message: "Updated", presc });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePrescription = async (req, res) => {
  try {
    const presc = await Prescription.findOneAndDelete({ _id: req.params.id, doctor: req.user.id });
    if (!presc) return res.status(404).json({ message: "Prescription not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};