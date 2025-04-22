import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExpenses } from "../../context/Context";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Datewise from "../../uiComponents/ReportLogo/Logo5.png";
import Monthwise from "../../uiComponents/ReportLogo/Logo6.png";
import Yearwise from "../../uiComponents/ReportLogo/Logo7.png";
import "./AmountWise.css";

const AmountWise = () => {
  const [filter, setFilter] = useState(""); // Filter state
  const { expenses } = useExpenses(); // Fetch expenses from context
  const navigate = useNavigate();

  // Function to group and filter data
  const getFilteredData = () => {
    const grouped = {};
    expenses.forEach((e) => {
      const date = new Date(e.date);
      let key = "";

      if (filter === "date")
        key = date.toLocaleDateString(); // Date-wise filter
      else if (filter === "month")
        key = `${date.toLocaleString("default", {
          month: "long",
        })} ${date.getFullYear()}`;
      // Month-wise filter
      else if (filter === "year") key = `${date.getFullYear()}`; // Year-wise filter

      if (key) {
        grouped[key] = (grouped[key] || 0) + parseFloat(e.amount); // Use `amount` from context
      }
    });

    return Object.entries(grouped).map(([name, amount]) => ({ name, amount }));
  };

  return (
    <div className="report-container">
      <h2 className="section-title">View Expenses by Amount</h2>

      {/* Display filter options if no filter is selected */}
      {!filter && (
        <div className="card-view">
          <div className="card">
            <img src={Datewise} alt="Date-wise" className="report-image" />
            <button className="btn" onClick={() => setFilter("date")}>
              View Date-wise Reports
            </button>
          </div>
          <div className="card">
            <img src={Monthwise} alt="Month-wise" className="report-image" />
            <button className="btn" onClick={() => setFilter("month")}>
              View Month-wise Reports
            </button>
          </div>
          <div className="card">
            <img src={Yearwise} alt="Year-wise" className="report-image" />
            <button className="btn" onClick={() => setFilter("year")}>
              View Yearly Reports
            </button>
          </div>
        </div>
      )}

      {/* Display bar chart if filter is selected */}
      {filter && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getFilteredData()}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <button className="btn back-btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default AmountWise;
