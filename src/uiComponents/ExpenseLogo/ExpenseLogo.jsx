import React from "react";
import "./ExpenseLogo.css";
import expenseLogo from "./ExpenseLogo.png"; // Replace with the actual image file path

const ExpenseLogo = () => {
  return (
    <div className="expense-logo">
      <img src={expenseLogo} alt="Expense Logo" className="expense-logo-image" />
    </div>
  );
};

export default ExpenseLogo;