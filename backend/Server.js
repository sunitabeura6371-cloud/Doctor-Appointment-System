const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const PatientRoutes = require("./Routes/PatientRoutes")
const DoctorRoutes = require("./Routes/DoctorRoutes")
const AppointmentRoutes = require("./Routes/AppointmentRoutes")
const AdminRoutes = require("./Routes/AdminRoutes")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/patients", PatientRoutes)
app.use("/api/doctors", DoctorRoutes)
app.use("/api/appointments", AppointmentRoutes)
app.use("/api/admin", AdminRoutes)
mongoose.connect("mongodb://127.0.0.1:27017/doctorAppointment")
  .then(() => {
    console.log("MongoDB connected")
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error)
  })

app.get("/", (req, res) => {
  res.send("Doctor Appointment Backend is running")
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})