import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AdminRegister() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  async function handleRegister(event) {
    event.preventDefault()

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        {
          name,
          email,
          password
        }
      )

      alert(response.data.message)

      navigate("/admin-login")
    } catch (error) {
      console.log(error)
      alert("Admin registration failed")
    }
  }

  return (
    <div>
      <h1>Admin Registration</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Name:</label>

          <input
            type="text"
            placeholder="Enter admin name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>

          <input
            type="email"
            placeholder="Enter admin email"
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
          Register Admin
        </button>
      </form>
    </div>
  )
}

export default AdminRegister