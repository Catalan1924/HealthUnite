import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import PatientDashboard from './pages/dashboard/PatientDashboard';
import DoctorDashboard from './pages/dashboard/DoctorDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import Profile from './pages/Profile';
import GridDistortion from './Bits/GridDistortion';
import Image from './assets/TopDoc_Main.jpg';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
     
      {/* 👇 Fullscreen GridDistortion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridDistortion
          imageSrc={Image}
          grid={10}
          mouse={0.1}
          strength={0.15}
          relaxation={0.9}
          className="pointer-events-none" // prevents mouse interaction blocking
        />
      </div>

      {/* 👇 App Content Layer on top */}
      <div className="min-h-screen flex items-center justify-center ">
        <div className="relative z-10">
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/patient" element={<PatientDashboard />} />
              <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
      </div>
      

    </div>
  );
}

export default App;