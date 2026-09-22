const express = require("express")
const bcrypt = require("bcryptjs")
const Doctor = require("../models/Doctor")

const router = express.Router()

router.post("/register", async (req, res) => {
  try {
    const { name, email, specialization, password } = req.body

    const existingDoctor = await Doctor.findOne({ email })

    if (existingDoctor) {
      return res.status(400).json({
        message: "Doctor already registered"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const doctor = new Doctor({
      name,
      email,
      specialization,
      password: hashedPassword
    })

    await doctor.save()

    res.status(201).json({
      message: "Doctor registered successfully"
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Doctor registration failed"
    })
  }
})

router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password")

    res.status(200).json(doctors)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Failed to fetch doctors"
    })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const doctor = await Doctor.findOne({ email })

    if (!doctor) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      doctor.password
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    res.status(200).json({
      message: "Doctor login successful",
      doctorId: doctor._id
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Doctor login failed"
    })
  }
})
module.exports = router