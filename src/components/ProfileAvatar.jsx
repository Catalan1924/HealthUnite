// src/components/ProfileAvatar.jsx
import React, { useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

import { useAuth } from "../contexts/AuthContext";

const ProfileAvatar = ({ user }) => {
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState(user?.photoURL || "");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const storageRef = ref(storage, `${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "users", user.uid), {
      photoURL: downloadURL,
    });

    setImageURL(downloadURL);
    setUploading(true);
  };

  return (
    <div className="text-center space-y-3">
      <img
        src={imageURL || "https://via.placeholder.com/150"}
        alt="Profile" 
        className="w-32 h-32 object-cover rounded-full mx-auto border"
      />
      <div>
        <button
          onClick={() => fileInputRef.current.click()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Change Photo"}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          className="hidden"
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ProfileAvatar;