import React from 'react';
import AppointmentForm from '../../components/AppointmentForm';
import AppointmentList from '../../components/AppointmentList';
import MedicalHistory from '../../components/MedicalHistory';
import { useAuth } from '../../contexts/AuthContext';
import AppointmentCalendar from "../../components/AppointmentCalendar";
const PatientDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, Patient</h1>
      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Book an Appointment</h2>
        <AppointmentForm userId={currentUser.uid} />
      </section>
      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Appointments</h2>
        <AppointmentList userId={currentUser.uid} />
      </section>
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Medical History</h2>
        <MedicalHistory patientId={currentUser.uid} />
      </section>
      <AppointmentCalendar userId={currentUser.uid} role="patient" />
    </div>
  );
};

export default PatientDashboard;