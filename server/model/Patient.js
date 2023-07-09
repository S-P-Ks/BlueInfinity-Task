const mongoose = require("mongoose");

const schema = mongoose.Schema;

const PatientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Patient = new mongoose.model("Patient", PatientSchema);

module.exports = Patient;
