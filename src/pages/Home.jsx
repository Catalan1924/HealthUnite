import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

return (
  <>
   
    <div className="p-5 flex flex-col items-center justify-center  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
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
