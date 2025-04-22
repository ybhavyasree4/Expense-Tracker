import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogOut.css";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any stored login/session info
    localStorage.clear(); // Clear localStorage
    sessionStorage.clear(); // Clear sessionStorage if used

    // Navigate back to the main header page after 1.5 seconds
    setTimeout(() => {
      navigate("/"); // Redirect to the main header page
    }, 1500);
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2 className="logout-message">You have been logged out successfully.</h2>
    </div>
  );
};

export default Logout;
