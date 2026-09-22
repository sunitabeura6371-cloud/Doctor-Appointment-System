import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="home-container">
      <h1>Doctor Appointment Management System</h1>

      <p>Book your appointment with a doctor easily.</p>

      <div className="home-buttons">
  <Link to="/login">
  <button>Patient Login</button>
</Link>

<Link to="/doctor-login">
  <button>Doctor Login</button>
</Link>

<Link to="/admin-login">
  <button>Admin Login</button>
</Link>
</div>
    </div>
  )
}

export default Home