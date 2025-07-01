import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

return (
  <>
   
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800 p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to HealthUnite</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Your trusted healthcare appointment and medical partner.
      </p>

      <button
        onClick={handleGetStarted}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Get Started
      </button>
    </div>
  </>
);
};

export default Home;
