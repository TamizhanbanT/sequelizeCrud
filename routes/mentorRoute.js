import express from "express";
import db from "../models/index.js"; // Import the database models

const router = express.Router();
const MentorList = db.MentorList; // Access the MentorList model
const StudentList = db.StudentList; 

// ✅ Get all mentors
router.get("/", async (req, res) => {
  try {
    const mentors = await MentorList.findAll();
    res.status(200).json(mentors);
  } catch (error) {
    console.error("Error retrieving mentors:", error);
    res.status(500).json({ message: "Failed to retrieve mentors" });
  }
});



// ✅ Create a new mentor
router.post("/", async (req, res) => {
  try {
    const { mentorName, mentorPhone, mentorClass, tutionFee } = req.body;
    if (!mentorName || !mentorPhone || !mentorClass || !tutionFee) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newMentor = await MentorList.create({ mentorName, mentorPhone, mentorClass, tutionFee });
    res.status(201).json({ message: "Mentor added successfully", mentor: newMentor });
  } catch (error) {
    console.error("Error adding mentor:", error);
    res.status(500).json({ message: "Failed to add mentor" ,"err":error});
  }
});

// ✅ Update a mentor by ID
router.put("/:id", async (req, res) => {
  try {
    const { mentorName, mentorPhone, mentorClass, tutionFee } = req.body;
    const mentor = await MentorList.findByPk(req.params.id);
    
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    
    await mentor.update({ mentorName, mentorPhone, mentorClass, tutionFee });
    res.status(200).json({ message: "Mentor updated successfully", mentor });
  } catch (error) {
    console.error("Error updating mentor:", error);
    res.status(500).json({ message: "Failed to update mentor" });
  }
});

// ✅ Delete a mentor by ID
router.delete("/:id", async (req, res) => {
  try {
    const mentor = await MentorList.findByPk(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    
    await mentor.destroy();
    res.status(200).json({ message: "Mentor deleted successfully" });
  } catch (error) {
    console.error("Error deleting mentor:", error);
    res.status(500).json({ message: "Failed to delete mentor" });
  }
});
// ✅ Get all mentors with their students
router.get("/all", async (req, res) => {
  try {
    const mentors = await MentorList.findAll({
      include: [{ model: StudentList, as: "students" }],
    });
    res.status(200).json(mentors);
  } catch (error) {
    console.error("Error retrieving mentors:", error);
    res.status(500).json({ message: "Failed to retrieve mentors" });
  }
});

// ✅ Get a mentor by ID with students
router.get("/all/:id", async (req, res) => {
  try {
    const mentor = await MentorList.findByPk(req.params.id, {
      include: [{ model: StudentList, as: "students" }],
    });
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.status(200).json(mentor);
  } catch (error) {
    console.error("Error retrieving mentor:", error);
    res.status(500).json({ message: "Failed to retrieve mentor" });
  }
});

// ✅ Get a mentor by ID
router.get("/:id", async (req, res) => {
  try {
    const mentor = await MentorList.findByPk(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    res.status(200).json(mentor);
  } catch (error) {
    console.error("Error retrieving mentor:", error);
    res.status(500).json({ message: "Failed to retrieve mentor" });
  }
});
export default router;

