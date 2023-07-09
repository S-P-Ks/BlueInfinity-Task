const mongoose = require("mongoose");

const schema = mongoose.Schema;

const AppointmentSchema = mongoose.Schema(
  {
    title: String,
    patient: {
      type: schema.Types.ObjectId,
      ref: "Patient",
    },
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      default: "NOT_DONE",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Appointment = new mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
