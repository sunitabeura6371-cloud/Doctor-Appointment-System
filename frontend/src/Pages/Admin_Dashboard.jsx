import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function AdminDashboard() {
  const [patients, setPatients] = useState([])
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
  const adminId = localStorage.getItem("adminId")

  if (!adminId) {
    navigate("/admin-login")
  }
}, [navigate])

  async function fetchPatients() {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/patients"
      )

      console.log("Patients:", response.data)

      setPatients(response.data)
    } catch (error) {
      console.log(error)
      alert("Failed to fetch patients")
    }
  }

  async function fetchDoctors() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/doctors"
    )

    console.log("Doctors:", response.data)

    setDoctors(response.data)
  } catch (error) {
    console.log(error)
    alert("Failed to fetch doctors")
  }
}

async function fetchAppointments() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/appointments"
    )

    console.log("Appointments:", response.data)

    setAppointments(response.data)
  } catch (error) {
    console.log(error)
    alert("Failed to fetch appointments")
  }
}

function handleLogout() {
  localStorage.removeItem("adminId")
  navigate("/admin-login")
}
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>

      <h2>Welcome, Admin</h2>

      <div className="admin-section">
        <h3>Manage Patients</h3>
        <p>View and manage registered patients.</p>

        <button onClick={fetchPatients}>
          View Patients
        </button>

        {patients.map((patient) => (
          <div className="admin-card" key={patient._id}>
            <h4>{patient.name}</h4>
            <p>Email: {patient.email}</p>
          </div>
        ))}
      </div>

      <div className="admin-section">
        <h3>Manage Doctors</h3>
        <p>View and manage registered doctors.</p>
        <button onClick={fetchDoctors}>
         View Doctors
        </button>
        {doctors.map((doctor) => (
  <div className="admin-card" key={doctor._id}>
    <h4>{doctor.name}</h4>
    <p>Email: {doctor.email}</p>
    <p>Specialization: {doctor.specialization}</p>
  </div>
))}
      </div>

      <div className="admin-section">
        <h3>Manage Appointments</h3>
        <p>View and manage all appointments.</p>
        <button onClick={fetchAppointments}>
         View Appointments
        </button>

        {appointments.map((appointment) => (
          <div className="admin-card appointment-admin-card" key={appointment._id}>
        <h4> Patient: {appointment.patientId.name}
        </h4>

    <p>
      Patient Email: {appointment.patientId.email}
    </p>

    <p>
      Doctor: Dr. {appointment.doctorId.name}
    </p>

    <p>
      Specialization: {appointment.doctorId.specialization}
    </p>

    <p>
      Date: {new Date(appointment.appointmentDate).toLocaleString()}
    </p>

    <p>
      Status: {appointment.status}
    </p>
  </div>
))}
      </div>
      <button className="logout-button" onClick={handleLogout}>
      Logout
      </button>
    </div>
  )
}

export default AdminDashboard