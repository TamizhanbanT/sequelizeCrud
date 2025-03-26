import express from "express";
import db from "../models/index.js"; // Import the database models

const router = express.Router();
const MentorList = db.MentorList; // Access the MentorList model

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
    res.status(500).json({ message: "Failed to add mentor" });
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

export default router;
































// import express from "express";
// import db from "../models/index.js"; // Import the database models

// const router = express.Router();
// const MentorList = db.MentorList; // Access the MentorList model

// // ✅ Get all mentors
// router.get("/", async (req, res) => {
//   try {
//     const mentors = await MentorList.findAll();
//     res.status(200).json(mentors);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Get a mentor by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const mentor = await MentorList.findByPk(req.params.id);
//     if (!mentor) {
//       return res.status(404).json({ message: "Mentor not found" });
//     }
//     res.status(200).json(mentor);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Create a new mentor
// router.post("/", async (req, res) => {
//   try {
//     const { mentorName, mentorPhone, mentorClass, tutionFee } = req.body;
//     const newMentor = await MentorList.create({ mentorName, mentorPhone, mentorClass, tutionFee });
//     res.status(201).json(newMentor);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Update a mentor by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const { mentorName, mentorPhone, mentorClass, tutionFee } = req.body;
//     const mentor = await MentorList.findByPk(req.params.id);
    
//     if (!mentor) {
//       return res.status(404).json({ message: "Mentor not found" });
//     }

//     await mentor.update({ mentorName, mentorPhone, mentorClass, tutionFee });
//     res.status(200).json(mentor);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Delete a mentor by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const mentor = await MentorList.findByPk(req.params.id);
//     if (!mentor) {
//       return res.status(404).json({ message: "Mentor not found" });
//     }

//     await mentor.destroy();
//     res.status(200).json({ message: "Mentor deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;
