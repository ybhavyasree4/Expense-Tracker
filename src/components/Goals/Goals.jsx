import React, { useState } from "react";
import "./Goals.css";

const Goals = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [monthlySalary, setMonthlySalary] = useState("");
  const [monthlySavings, setMonthlySavings] = useState("");
  const [remainingAmount, setRemainingAmount] = useState(null);
  const [message, setMessage] = useState("");

  const calculateRemainingAmount = async () => {
    const remaining = monthlySalary - monthlySavings;
    setRemainingAmount(remaining);

    if (remaining >= 0) {
      setMessage("You can reach your savings goal with the current expenses.");
    } else {
      setMessage(
        "You cannot reach your savings goal with the current expenses."
      );
    }

    // Send data to the backend
    const data = {
      month: selectedMonth,
      year: selectedYear,
      salary: monthlySalary,
      savingsGoal: monthlySavings,
      remainingAmount: remaining,
    };

    console.log("Sending data to backend:", data);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/goals/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Data sent successfully:", result);
        alert("Savings data sent successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to send data:", errorData);
        alert(`Failed to send data: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Unable to connect to the server. Please check your internet connection."
      );
    }
  };

  return (
    <div className="goals-container">
      <h1>Expense and Savings Calculator</h1>
      <div className="form-container">
        <label htmlFor="month">Select Month:</label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          required
        >
          <option value="">--Select Month--</option>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <label htmlFor="year">Select Year:</label>
        <input
          type="number"
          id="year"
          min="1900"
          max="2099"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          required
        />

        <label htmlFor="salary">Monthly Salary:</label>
        <input
          type="number"
          id="salary"
          value={monthlySalary}
          onChange={(e) => setMonthlySalary(Number(e.target.value))}
          required
        />

        <label htmlFor="savings">Monthly Savings Goal:</label>
        <input
          type="number"
          id="savings"
          value={monthlySavings}
          onChange={(e) => setMonthlySavings(Number(e.target.value))}
          required
        />

        <button onClick={calculateRemainingAmount}>Calculate</button>
      </div>

      {remainingAmount !== null && (
        <div className="result">
          <h3>
            Remaining Amount for {selectedMonth}/{selectedYear}:
          </h3>
          <p>{remainingAmount}</p>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default Goals;
