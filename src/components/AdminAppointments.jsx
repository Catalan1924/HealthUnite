// src/components/AdminAppointments.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, "appointments"));
      setAppointments(snapshot.docs.map((doc) => doc.data()));
    };
    fetch();
  }, []);

  return (
    <ul className="space-y-2">
      {appointments.map((appt, i) => (
        <li key={i} className="border p-2 rounded bg-gray-50">
          <p><strong>Patient:</strong> {appt.patientId}</p>
          <p><strong>Doctor:</strong> {appt.doctorId}</p>
          <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
          <p><strong>Status:</strong> {appt.status}</p>
        </li>
      ))}
    </ul>
  );
};

export default AdminAppointments;
