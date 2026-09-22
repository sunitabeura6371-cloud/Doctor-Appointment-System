import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Navbar from "./Components/Navbar"
import PatientDashboard from "./Pages/Patient_Dashboard"
import DoctorDashboard from "./Pages/Doctor_Dashboard"
import AdminDashboard from "./Pages/Admin_Dashboard"
import DoctorRegister from "./Pages/DoctorRegister"
import DoctorLogin from "./Pages/DoctorLogin"
import AdminLogin from "./Pages/AdminLogin"
import AdminRegister from "./Pages/AdminRegister"
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}
         />
         <Route path="/doctor-login" element={<DoctorLogin />} />
         <Route path="/admin-login" element={<AdminLogin />} />
         <Route path="/admin-register" element={<AdminRegister />} />
         <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/patient_dashboard" element={<PatientDashboard />} />
        <Route path="/doctor_dashboard"
        element={<DoctorDashboard />}/>
        <Route path="/admin_dashboard" element={<AdminDashboard/>} />
        
      </Routes>

    </BrowserRouter>
  )
}

export default App