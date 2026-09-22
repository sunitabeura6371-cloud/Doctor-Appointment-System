import { useState } from "react"
import axios from "axios"

function DoctorRegister() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [password, setPassword] = useState("")

  async function handleRegister(event) {
    event.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctors/register",
        {
          name,
          email,
          specialization,
          password
        }
      )

      console.log(response.data)
      alert(response.data.message)
    } catch (error) {
      console.log(error)
      alert("Doctor registration failed")
    }
  }

  return (
    <div>
      <h1>Doctor Registration</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter doctor name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

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
          <label>Specialization:</label>
          <input
            type="text"
            placeholder="Enter specialization"
            value={specialization}
            onChange={(event) => setSpecialization(event.target.value)}
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

        <button type="submit">Register Doctor</button>
      </form>
    </div>
  )
}

export default DoctorRegister