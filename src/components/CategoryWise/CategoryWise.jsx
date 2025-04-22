import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useExpenses } from "../../context/Context";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import Datewise from "../../uiComponents/ReportLogo/Logo5.png";
import Monthwise from "../../uiComponents/ReportLogo/Logo6.png";
import Yearwise from "../../uiComponents/ReportLogo/Logo7.png";
import "./CategoryWise.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

const CategoryWise = () => {
  const [filter, setFilter] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { expenses } = useExpenses();
  const navigate = useNavigate();

  const getFilteredData = React.useCallback(() => {
    const grouped = {};

    expenses.forEach((e) => {
      const date = new Date(e.date);
      let key = "";

      if (filter === "date") {
        key = date.toLocaleDateString();
      } else if (filter === "month" && month.trim() && year.trim()) {
        const expenseMonth = date.toLocaleString("default", { month: "long" });
        const expenseYear = date.getFullYear();
        if (
          expenseMonth.toLowerCase() === month.trim().toLowerCase() &&
          expenseYear === parseInt(year.trim())
        ) {
          key = `${expenseMonth} ${expenseYear}`;
        }
      } else if (filter === "year" && year.trim()) {
        const expenseYear = date.getFullYear();
        if (expenseYear === parseInt(year.trim())) {
          key = `${expenseYear}`;
        }
      }

      if (key) {
        grouped[key] = (grouped[key] || 0) + parseFloat(e.amount);
      }
    });

    const result = Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));

    console.log("Filtered Data:", result);
    return result;
  }, [filter, month, year, expenses]);

  const chartData = useMemo(() => getFilteredData(), [getFilteredData]);

  return (
    <div className="report-container">
      <h2 className="section-title">View Expenses by Category</h2>

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

      {filter === "month" && (
        <div className="input-container">
          <img src={Monthwise} alt="Month-wise" className="filter-image" />
          <input
            type="text"
            placeholder="Enter Month (e.g., April)"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter Year (e.g., 2025)"
            value={year} // Ensure this is a string
            onChange={(e) => setYear(e.target.value)} // Update the state as a string
            className="input-field"
          />
        </div>
      )}

      {filter === "year" && (
        <div className="input-container">
          <img src={Yearwise} alt="Year-wise" className="filter-image" />
          <input
            type="number"
            placeholder="Enter Year (e.g., 2025)"
            value={year} // Ensure this is a string
            onChange={(e) => setYear(e.target.value)} // Update the state as a string
            className="input-field"
          />
        </div>
      )}

      {filter && (
        <div className="chart-container">
          {chartData.length === 0 ? (
            <p className="no-data-text">No data found for selected filter.</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      <button className="btn back-btn" onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default CategoryWise;
