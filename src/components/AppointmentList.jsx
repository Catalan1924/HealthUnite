import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const AppointmentList = ({ userId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const q = query(collection(db, "appointments"), where("patientId", "==", userId));
      const snapshot = await getDocs(q);
      setAppointments(snapshot.docs.map(doc => doc.data()));
    };
    fetchAppointments();
  }, [userId]);

  return (
    <ul className="space-y-2">
      {appointments.map((appt, i) => (
        <li key={i} className="border p-2 rounded bg-gray-50">
          <strong>Date:</strong> {new Date(appt.date).toLocaleString()} <br />
          <strong>Status:</strong> <span className={`font-semibold ${appt.status === 'approved' ? 'text-green-600' : appt.status === 'declined' ? 'text-red-600' : 'text-yellow-600'}`}>{appt.status}</span>
        </li>
      ))}
    </ul>
  );
};

export default AppointmentList;
