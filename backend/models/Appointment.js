const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
    default: "Pending"
  }
})

const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment