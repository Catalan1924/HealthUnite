// src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import ProfileAvatar from "../components/ProfileAvatar";

const Profile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const docSnap = await getDoc(doc(db, "users", currentUser.uid));
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };
    fetch();
  }, [currentUser.uid]);

  if (!userData) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Profile</h1>
        <ProfileAvatar user={{ ...currentUser, photoURL: userData.photoURL }} />

        <div className="mt-6 space-y-2">
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          {userData.assignedDoctor && <p><strong>Assigned Doctor:</strong> {userData.assignedDoctor}</p>}
        </div>
      </div>
    </div>
  );
};

export default Profile;