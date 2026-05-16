const Medicine = require("../models/Medicine");

exports.addMedicine = async (req, res) => {
  try {
    const { name, description, image, price } = req.body;
    const med = await Medicine.create({ name, description, image, price });
    res.status(201).json({ message: "Medicine added", med });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find();
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const med = await Medicine.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Updated", med });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMedicine = async (req, res) => {
  try {
    await Medicine.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};