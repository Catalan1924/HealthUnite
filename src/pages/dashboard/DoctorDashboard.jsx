// src/pages/dashboard/DoctorDashboard.jsx
import React from "react";
import DoctorAppointments from "../../components/DoctorAppointments";
import DoctorMedicalHistory from "../../components/DoctorMedicalHistory";
import { useAuth } from "../../contexts/AuthContext";
import AppointmentCalendar from "../../components/AppointmentCalendar";

const DoctorDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, Doctor</h1>

      {/* View Appointments */}
      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Patient Appointments</h2>
        <DoctorAppointments doctorId={currentUser.uid} />
      </section>

      {/* View and Edit Medical Records */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Patient Medical Records</h2>
        <DoctorMedicalHistory doctorId={currentUser.uid} />
      </section>
    </div>
  );
};

export default DoctorDashboard;
