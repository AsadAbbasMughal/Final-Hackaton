import express from "express";
import Report from "../models/Report.js";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Get all reports for a patient
router.get("/patient/:id", async (req, res) => {
  try {
    const reports = await Report.find({ patient: req.params.id });
    res.json({ reports });
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
});

// Upload image to Cloudinary
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await cloudinary.v2.uploader.upload_stream(
      { folder: "patient-reports" },
      (error, result) => {
        if (error) return res.status(500).json({ message: "Cloudinary upload failed", error });
        res.json({ url: result.secure_url });
      }
    ).end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ message: "Upload failed", error: err });
  }
});

// Add new report
router.post("/", async (req, res) => {
  try {
    const report = new Report(req.body);
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ message: "Error creating report" });
  }
});

// Delete report
router.delete("/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting report" });
  }
});

export default router;
