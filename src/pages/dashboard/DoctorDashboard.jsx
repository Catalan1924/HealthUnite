// src/pages/dashboard/DoctorDashboard.jsx
import React from "react";
import DoctorAppointments from "../../components/DoctorAppointments";
import DoctorMedicalHistory from "../../components/DoctorMedicalHistory";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar";

const DoctorDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-150 p-12 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
      <Navbar />
                                             
      <h1 className="text-2xl font-bold mb-4"style={{marginTop: "80px", textAlign: "center", color: "#333"}}>Welcome, Doctor</h1>


      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Patient Appointments</h2>
        <DoctorAppointments doctorId={currentUser.uid} />
      </section>
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Patient Medical Records</h2>
        <DoctorMedicalHistory doctorId={currentUser.uid} />
      </section>
    </div>
  );
}

export default DoctorDashboard;
