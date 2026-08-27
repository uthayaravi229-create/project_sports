const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    registerNumber: {
      type: String,
      required: true,
      unique: true
    },

    department: {
      type: String,
      required: true
    },

    year: {
      type: String,
      required: true
    },

    gender: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    sport: {
      type: String,
      required: true
    },

    event: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Student", studentSchema);