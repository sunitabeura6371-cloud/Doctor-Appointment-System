import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav>
      <h2>Doctor Appointment</h2>

      <div>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  )
}

export default Navbar