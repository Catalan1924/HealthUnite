import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole === "patient") navigate("/dashboard/patient");
    else if (userRole === "doctor") navigate("/dashboard/doctor");
    else if (userRole === "admin") navigate("/dashboard/admin");
  }, [userRole]);

  return <div>Redirecting to your dashboard...</div>;
};

export default Dashboard;