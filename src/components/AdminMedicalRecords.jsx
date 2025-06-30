// src/components/AdminMedicalRecords.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const AdminMedicalRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, "medicalRecords"));
      setRecords(snapshot.docs.map((doc) => doc.data()));
    };
    fetch();
  }, []);

  return (
    <ul className="space-y-2">
      {records.map((record, i) => (
        <li key={i} className="border p-2 rounded bg-gray-50">
          <p><strong>Patient:</strong> {record.patientId}</p>
          <p><strong>Doctor:</strong> {record.doctorId}</p>
          <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
          <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
          <p><strong>Medications:</strong> {record.medications.join(", ")}</p>
        </li>
      ))}
    </ul>
  );
};

export default AdminMedicalRecords;
