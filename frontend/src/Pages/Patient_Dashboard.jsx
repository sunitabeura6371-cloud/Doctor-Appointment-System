import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function PatientDashboard() {
  const [doctors, setDoctors] = useState([])
  const [appointmentDate, setAppointmentDate] = useState("")
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
  const patientId = localStorage.getItem("patientId")

  if (!patientId) {
    navigate("/login")
  }
}, [navigate])

  function handleLogout() {
  localStorage.removeItem("patientId")
  navigate("/login")
}

  async function fetchAppointments() {
  try {
    const patientId = localStorage.getItem("patientId")

    const response = await axios.get(
      `http://localhost:5000/api/appointments/patient/${patientId}`
    )
    console.log("Patient appointments:", response.data)
    setAppointments(response.data)
  } catch (error) {
    console.log(error)
    alert("Failed to fetch appointments")
  }
}
  async function fetchDoctors() {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/doctors"
    )

    setDoctors(response.data)
  } catch (error) {
    console.log(error)
    alert("Failed to fetch doctors")
  }
}
  async function bookAppointment(doctorId) {
  if (!appointmentDate) {
    alert("Please select appointment date and time")
    return
  }

  try {
    const response = await axios.post(
      "http://localhost:5000/api/appointments/book",
      {
        patientId: localStorage.getItem("patientId"),
        doctorId: doctorId,
        appointmentDate: appointmentDate
      }
    )

    alert(response.data.message)
    console.log(response.data)
  } catch (error) {
    console.log(error)
    alert("Appointment booking failed")
  }
}

  return (
    <div className="dashboard-container">
      <h1>Patient Dashboard</h1>

      <h2>Welcome, Patient</h2>

    <div className="dashboard-section">
          <h3>Find a Doctor</h3>
        <p>View available doctors and book an appointment.</p>
        <button onClick={fetchDoctors}>View Doctors</button>
        {doctors.map((doctor) => (
    <div className="doctor-card" key={doctor._id}>
    <h4>{doctor.name}</h4>
    <p>Email: {doctor.email}</p>
    <p>Specialization: {doctor.specialization}</p>
    
    <input
  type="datetime-local"
  value={appointmentDate}
  onChange={(event) => setAppointmentDate(event.target.value)}
    />

   <button onClick={() => bookAppointment(doctor._id)}>
  Book Appointment
    </button> 
  </div>
))}
      </div>

      <div className="dashboard-section">
        <h3>My Appointments</h3>
        <p>View your upcoming and previous appointments.</p>
        <button onClick={fetchAppointments}>View Appointments</button>
    {appointments.map((appointment) => (
    <div className="appointment-card" key={appointment._id}>
    <h4>
  Dr. {appointment.doctorId ? appointment.doctorId.name : "Doctor unavailable"}
</h4>

<p>
  Specialization:{" "}
  {appointment.doctorId
    ? appointment.doctorId.specialization
    : "Not available"}
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
      <div className="admin-logout-section">
  <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>
</div>
    </div>
  )
}

export default PatientDashboard