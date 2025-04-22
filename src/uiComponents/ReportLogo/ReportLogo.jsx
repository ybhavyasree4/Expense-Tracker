import React from "react";
import "./ReportLogo.css";
import reportLogo from "./ReportLogo.png"; // Ensure the file exists in the 'uiComponents/ReportLogo' folder

const ReportLogo = () => {
  return (
    <div className="expense-logo">
      <img src={reportLogo} alt="Report Logo" className="report-logo-image" />
    </div>
  );
};

export default ReportLogo;