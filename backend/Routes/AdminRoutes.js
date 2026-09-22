const express = require("express")
const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")

const router = express.Router()

// Admin Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existingAdmin = await Admin.findOne({ email })

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already registered"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = new Admin({
      name,
      email,
      password: hashedPassword
    })

    await admin.save()

    res.status(201).json({
      message: "Admin registered successfully"
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Admin registration failed"
    })
  }
})

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password"
      })
    }

    res.status(200).json({
      message: "Admin login successful",
      adminId: admin._id
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: "Admin login failed"
    })
  }
})

module.exports = router