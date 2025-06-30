// src/components/DoctorMedicalHistory.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";

const DoctorMedicalHistory = ({ doctorId }) => {
  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [medications, setMedications] = useState("");
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const filtered = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.role === "patient");
      setPatients(filtered);
    };
    fetchPatients();
  }, []);

  const fetchHistory = async () => {
    const q = query(collection(db, "medicalRecords"), where("patientId", "==", patientId));
    const snapshot = await getDocs(q);
    setRecords(snapshot.docs.map(doc => doc.data()));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "medicalRecords"), {
      doctorId,
      patientId,
      diagnosis,
      medications: medications.split(",").map((m) => m.trim()),
      date: new Date().toISOString(),
    });
    setDiagnosis("");
    setMedications("");
    fetchHistory();
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleAdd} className="space-y-3 bg-blue-50 p-4 rounded">
        <select className="w-full p-2 border rounded" value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.id} value={p.id}>{p.email}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Diagnosis"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Medications (comma separated)"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Record</button>
      </form>

      {records.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Previous Records</h3>
          <ul className="space-y-2">
            {records.map((record, i) => (
              <li key={i} className="bg-gray-100 p-2 rounded">
                <p><strong>Date:</strong> {new Date(record.date).toLocaleDateString()}</p>
                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                <p><strong>Medications:</strong> {record.medications.join(", ")}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DoctorMedicalHistory;