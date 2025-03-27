import express from "express";
import db from "../models/index.js"; // Import the database models

const router = express.Router();
const StudentList = db.StudentList; // Access the StudentList model

// ✅ Get all students
router.get("/", async (req, res) => {
  try {
    const students = await StudentList.findAll();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({ message: "Failed to retrieve students" ,
      "err":error
    });
  }
});

// ✅ Get a student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await StudentList.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    console.error("Error retrieving student:", error);
    res.status(500).json({ message: "Failed to retrieve student" });
  }
});

// ✅ Create a new student
router.post("/", async (req, res) => {
  try {
    const { studentName, studentClass, parentPhone } = req.body;
    if (!studentName || !studentClass || !parentPhone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newStudent = await StudentList.create({ studentName, studentClass, parentPhone });
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Failed to add student" });
  }
});


// ✅ Bulk Insert Students
router.post("/bulk-insert", async (req, res) => {
    try {
      const students = req.body; // Expecting an array of student objects
  
      if (!Array.isArray(students) || students.length === 0) {
        return res.status(400).json({ message: "Invalid input: Provide an array of students" });
      }
  
      const newStudents = await StudentList.bulkCreate(students);
  
      res.status(201).json({
        message: "Students added successfully",
        students: newStudents,
      });
    } catch (error) {
      console.error("Error adding students:", error);
      res.status(500).json({ message: "Failed to add students" });
    }
  });

// ✅ Update a student by ID
router.put("/:id", async (req, res) => {
  try {
    const { studentName, studentClass, parentPhone } = req.body;
    const student = await StudentList.findByPk(req.params.id);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    await student.update({ studentName, studentClass, parentPhone });
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Failed to update student" });
  }
});

// ✅ Delete a student by ID
router.delete("/:id", async (req, res) => {
  try {
    const student = await StudentList.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    await student.destroy();
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Failed to delete student" });
  }
});

// ✅ Create a new student and assign to a mentor
router.post("/", async (req, res) => {
  try {
    const { studentName, studentClass, parentPhone, mentorId } = req.body;
    if (!studentName || !studentClass || !parentPhone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the mentor exists before assigning
    if (mentorId) {
      const mentor = await db.MentorList.findByPk(mentorId);
      if (!mentor) {
        return res.status(400).json({ message: "Invalid mentor ID" });
      }
    }

    const newStudent = await StudentList.create({
      studentName,
      studentClass,
      parentPhone,
      mentorId, // Assign mentor ID if provided
    });

    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Failed to add student" });
  }
});

// ✅ Get students with their assigned mentor
router.get("/", async (req, res) => {
  try {
    const students = await StudentList.findAll({
      include: [{ model: db.MentorList, as: "mentor" }],
    });
    res.status(200).json(students);
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({ message: "Failed to retrieve students" });
  }
});


export default router;
