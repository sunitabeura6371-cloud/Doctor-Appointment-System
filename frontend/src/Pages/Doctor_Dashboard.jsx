import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
  const doctorId = localStorage.getItem("doctorId")

  if (!doctorId) {
    navigate("/doctor-login")
  }
}, [navigate])

  function handleLogout() {
  localStorage.removeItem("doctorId")
  navigate("/doctor-login")
  }

  async function fetchAppointments() {
    try {
      const doctorId = localStorage.getItem("doctorId")

      const response = await axios.get(
        `http://localhost:5000/api/appointments/doctor/${doctorId}`
      )

      console.log("Doctor appointments:", response.data)
      setAppointments(response.data)
    } catch (error) {
      console.log(error)
      alert("Failed to fetch appointments")
    }
  }

  async function updateAppointmentStatus(appointmentId, status) {
  try {
    const response = await axios.put(
      `http://localhost:5000/api/appointments/${appointmentId}/status`,
      {
        status
      }
    )

    alert(response.data.message)

    fetchAppointments()
  } catch (error) {
    console.log(error)
    alert("Failed to update appointment")
  }
}

  return (
    <div className="doctor-dashboard-container">
      <h1>Doctor Dashboard</h1>

      <h2>My Appointments</h2>

      <button onClick={fetchAppointments}>
        View Appointments
      </button>

      {appointments.map((appointment) => (
        <div className="doctor-appointment-card" key={appointment._id}>
          <h3>Patient: {appointment.patientId.name}</h3>

          <p>
            Email: {appointment.patientId.email}
          </p>

          <p>
            Date:{" "}
            {new Date(
              appointment.appointmentDate
            ).toLocaleString()}
          </p>

          <p>
            Status: {appointment.status}
          </p>
          {appointment.status === "Pending" && (
  <div className="appointment-actions">
  <button
      onClick={() =>
        updateAppointmentStatus(
          appointment._id,
          "Confirmed"
        )
      }
    >
      Confirm
    </button>

    <button
      onClick={() =>
        updateAppointmentStatus(
          appointment._id,
          "Cancelled"
        )
      }
    >
      Cancel
    </button>
  </div>
)}
        </div>
      ))}
      <div className="admin-logout-section">
  <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>
</div>
    </div>
  )
}

export default DoctorDashboard