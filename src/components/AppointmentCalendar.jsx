import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";


const AppointmentCalendar = ({ userId, role }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      let q = collection(db, "appointments");

      if (role === "patient") {
        q = query(q, where("patientId", "==", userId));
      } else if (role === "doctor") {
        q = query(q, where("doctorId", "==", userId));
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => {
        const appt = doc.data();
        return {
          title: `Appointment (${appt.status})`,
          start: new Date(appt.date),
          end: new Date(new Date(appt.date).getTime() + 30 * 60000), // 30 min appt
        };
      });
      setEvents(data);
    };

    fetchAppointments();
  }, [userId, role]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Calendar View</h2>

    </div>
  );
};

export default AppointmentCalendar;