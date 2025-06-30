// src/components/DoctorAppointments.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

const DoctorAppointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const q = query(collection(db, "appointments"), where("doctorId", "==", doctorId));
    const snapshot = await getDocs(q);
    setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    fetchAppointments();
  }, [doctorId]);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "appointments", id), { status });
    fetchAppointments();
  };

  return (
    <ul className="space-y-3">
      {appointments.map((appt) => (
        <li key={appt.id} className="p-3 border rounded bg-gray-50">
          <p><strong>Date:</strong> {new Date(appt.date).toLocaleString()}</p>
          <p><strong>Status:</strong> 
            <span className={`ml-2 font-semibold ${appt.status === 'approved' ? 'text-green-600' : appt.status === 'declined' ? 'text-red-600' : 'text-yellow-600'}`}>
              {appt.status}
            </span>
          </p>

          {appt.status === "pending" && (
            <div className="mt-2 flex gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={() => updateStatus(appt.id, "approved")}>
                Accept
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded" onClick={() => updateStatus(appt.id, "declined")}>
                Decline
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DoctorAppointments;