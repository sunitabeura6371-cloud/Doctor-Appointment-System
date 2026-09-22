const express = require("express")
const bcrypt = require("bcryptjs")
const Patient = require("../models/Patient")

const router = express.Router()

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingPatient = await Patient.findOne({ email })

    if (existingPatient) {
      return res.status(400).json({
        message: "Patient already registered"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const patient = new Patient({
      name,
      email,
      password: hashedPassword
    })

    await patient.save()

    res.status(201).json({
      message: "Patient registered successfully"
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Registration failed"
    })
  }
})
 router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const patient = await Patient.findOne({ email })

    if (!patient) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      patient.password
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    res.status(200).json({
      message: "Login successful",
      patientId: patient._id
    })
  } catch (error) {
    res.status(500).json({
      message: "Login failed"
    })
  }
})

router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find().select("-password")

    res.status(200).json(patients)
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Failed to fetch patients"
    })
  }
})

module.exports = router