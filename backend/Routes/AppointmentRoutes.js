const express = require("express")
const Appointment = require("../models/Appointment")

const router = express.Router()

router.post("/book", async (req, res) => {
  try {
    const { patientId, doctorId, appointmentDate } = req.body

    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate
    })

    await appointment.save()

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Appointment booking failed"
    })
  }
})

router.get("/patient/:patientId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientId: req.params.patientId
    })
      .populate("doctorId", "name specialization")
      .sort({ appointmentDate: 1 })

    res.status(200).json(appointments)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Failed to fetch appointments"
    })
  }
})

router.get("/doctor/:doctorId", async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.doctorId
    })
      .populate("patientId", "name email")
      .sort({ appointmentDate: 1 })

    res.status(200).json(appointments)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Failed to fetch doctor appointments"
    })
  }
})

router.put("/:appointmentId/status", async (req, res) => {
  try {
    const { status } = req.body

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      { status },
      { new: true }
    )

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      })
    }

    res.status(200).json({
      message: `Appointment ${status.toLowerCase()} successfully`,
      appointment
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Failed to update appointment"
    })
  }
})

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patientId", "name email")
      .populate("doctorId", "name specialization")
      .sort({ appointmentDate: 1 })

    res.status(200).json(appointments)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Failed to fetch all appointments"
    })
  }
})

module.exports = router