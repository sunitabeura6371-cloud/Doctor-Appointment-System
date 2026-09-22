import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleLogin(event) {
  event.preventDefault()

  try {
    const response = await axios.post(
      "http://localhost:5000/api/patients/login",
      {
        email,
        password
      }
    )
    
    localStorage.setItem("patientId", response.data.patientId)

    console.log(response.data)
    alert(response.data.message)
    navigate("/patient_dashboard")
  } catch (error) {
    console.log(error)
    alert("Login failed")
  }
}

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login