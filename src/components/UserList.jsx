// src/components/UserList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const UserList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleAssign = async (patientId, doctorId) => {
    await updateDoc(doc(db, "users", patientId), {
      assignedDoctor: doctorId,
    });
    alert("Patient assigned successfully!");
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    await deleteDoc(doc(db, "users", userId));
    alert("User deleted");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const doctors = users.filter((u) => u.role === "doctor");
  const patients = users.filter((u) => u.role === "patient");

  return (
    <div className="space-y-4">
      <h3 className="font-bold">All Users</h3>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 border rounded bg-gray-50">
            <p>
              <strong>{user.email}</strong> ({user.role})
            </p>
            {user.role === "patient" && (
              <div className="mt-2 flex items-center gap-2">
                <label>Assign Doctor:</label>
                <select
                  value={user.assignedDoctor || ""}
                  onChange={(e) => handleAssign(user.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">Select</option>
                  {doctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.email}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              onClick={() => handleDelete(user.id)}
              className="mt-2 text-red-600 text-sm"
            >
              Remove User
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;