import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const MedicalHistory = ({ patientId }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const q = query(collection(db, "medicalRecords"), where("patientId", "==", patientId));
      const snapshot = await getDocs(q);
      setRecords(snapshot.docs.map(doc => doc.data()));
    };
    fetchRecords();
  }, [patientId]);

  return (
    <ul className="space-y-2">
      {records.map((record, i) => (
        <li key={i} className="border p-2 rounded bg-gray-50">
          <strong>Date:</strong> {new Date(record.date).toLocaleDateString()} <br />
          <strong>Diagnosis:</strong> {record.diagnosis} <br />
          <strong>Medications:</strong> {record.medications.join(", ")}
        </li>
      ))}
    </ul>
  );
};

export default MedicalHistory;