// src/pages/dashboard/AdminDashboard.jsx
import React from "react";
import UserList from "../../components/UserList";
import AdminAppointments from "../../components/AdminAppointments";
import AdminMedicalRecords from "../../components/AdminMedicalRecords";
import Navbar from "../../components/Navbar";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <Navbar />
      <h1 className="text-2xl font-bold mb-6"style={{marginTop: "80px", textAlign: "center", color: "#333"}}>Welcome, Admin</h1>

      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
        <UserList />
      </section>

      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">All Appointments</h2>
        <AdminAppointments />
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">All Medical Records</h2>
        <AdminMedicalRecords />
      </section>
    </div>
  );
};

export default AdminDashboard;