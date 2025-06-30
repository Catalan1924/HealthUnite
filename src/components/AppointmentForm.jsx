import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const AppointmentForm = ({ userId }) => {
  const [doctorId, setDoctorId] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const doctorList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "doctor");
      setDoctors(doctorList);
    };
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "appointments"), {
      patientId: userId,
      doctorId,
      date,
      status: "pending"
    });
    setDoctorId("");
    setDate("");
    alert("Appointment booked!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <select className="w-full p-2 border rounded" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
        <option value="">Select Doctor</option>
        {doctors.map(doc => (
          <option key={doc.id} value={doc.id}>{doc.email}</option>
        ))}
      </select>
      <input type="datetime-local" className="w-full p-2 border rounded" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
