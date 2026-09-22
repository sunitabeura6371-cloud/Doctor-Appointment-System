import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function DoctorLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleLogin(event) {
    event.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctors/login",
        {
          email,
          password
        }
      )

      localStorage.setItem("doctorId", response.data.doctorId)

      alert(response.data.message)

      navigate("/doctor_dashboard")
    } catch (error) {
      console.log(error)
      alert("Doctor login failed")
    }
  }

  return (
    <div>
      <h1>Doctor Login</h1>

      <form onSubmit={handleLogin}>

        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter doctor email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  )
}

export default DoctorLogin