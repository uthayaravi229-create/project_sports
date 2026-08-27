const express = require("express");
const dns = require("dns");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const Student = require("./models/Student");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });


// =============================
// REGISTER STUDENT
// =============================

app.post("/api/students", async (req, res) => {
  try {
    const {
      name,
      registerNumber,
      department,
      year,
      gender,
      email,
      phone,
      sport,
      event
    } = req.body;

    // Check if student already registered
    const existingStudent = await Student.findOne({
      registerNumber
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student is already registered."
      });
    }

    const student = new Student({
      name,
      registerNumber,
      department,
      year,
      gender,
      email,
      phone,
      sport,
      event
    });

    await student.save();

    res.status(201).json({
      message: "Registration successful!",
      student
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Registration failed."
    });
  }
});


// =============================
// GET ALL STUDENTS
// =============================

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find().sort({
      createdAt: -1
    });

    res.json(students);

  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch students."
    });
  }
});


// =============================
// DELETE STUDENT
// =============================

app.delete("/api/students/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.json({
      message: "Registration deleted successfully."
    });

  } catch (error) {
    res.status(500).json({
      message: "Unable to delete registration."
    });
  }
});