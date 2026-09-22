import { useState } from "react"
import axios from "axios"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(event) {
  event.preventDefault()

  try {
    const response = await axios.post(
      "http://localhost:5000/api/patients/register",
      {
        name,
        email,
        password
      }
    )

    console.log(response.data)
    alert(response.data.message)
  } catch (error) {
    console.log(error)
    alert("Registration failed")
  }
}

  return (
    <div className="register-container">
      <h1>Patient Registration</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

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
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register