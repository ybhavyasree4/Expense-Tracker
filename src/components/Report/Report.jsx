import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Report.css";
import Logo1 from "../../uiComponents/ReportLogo/Logo3.png"; // Amount-wise image
import Logo2 from "../../uiComponents/ReportLogo/Logo4.png"; // Category-wise image

const Report = () => {
  const [view] = useState(""); // State for toggling between views (Amount-wise and Category-wise)
  const navigate = useNavigate();

  return (
    <div className="report-container">
      {/* Header */}
      <h2 className="section-title">View Expenses</h2>

      {/* Card view with images and buttons */}
      {!view && (
        <div className="card-view">
          <div className="card">
            <img src={Logo1} alt="Amount-wise" className="report-image" />
            <button className="btn" onClick={() => navigate("/amountwise")}>
              Amount-wise
            </button>
          </div>
          <div className="card">
            <img src={Logo2} alt="Category-wise" className="report-image" />
            <button className="btn" onClick={() => navigate("/categorywise")}>
              Category-wise
            </button>
          </div>
        </div>
      )}

      {/* Back to Dashboard button */}
      <button className="btn back-btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default Report;
