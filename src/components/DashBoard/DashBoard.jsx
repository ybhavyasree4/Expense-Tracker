import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || localStorage.getItem("username") || "Guest";

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>WealthVista</h2>
        <ul>
          <li onClick={() => navigate("/dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/addexpense")}>Add Expense</li>
          <li onClick={() => navigate("/manageexpense")}>Manage Expense</li>
          <li onClick={() => navigate("/report")}>Reports</li>
          <li onClick={() => navigate("/goals")}>Goals</li>
          <li onClick={() => navigate("/logout")}>Logout</li>
        </ul>
      </div>

      <div className="main">
        <div className="navbar">
          <span>Welcome, {username}!</span>
        </div>
        <div className="content">
          <h2>Welcome {username} to WealthVista!</h2>
          <p>Ready to take control of your finances?</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
