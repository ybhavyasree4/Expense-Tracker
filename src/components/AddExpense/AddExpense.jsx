import React, { useState } from "react";
import { useExpenses } from "../../context/Context";
import "./AddExpense.css";

const API_URL = "http://127.0.0.1:8000/api/manageexpense/";

const AddExpense = () => {
  const { expenses, setExpenses } = useExpenses();
  const [formData, setFormData] = useState({
    category: "Food & Groceries",
    title: "", // changed from expenseName to title
    amount: "", // changed from expenseAmount to amount
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newExpense = {
      action: "add",
      title: formData.title,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExpense),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Successfully executed:", result);
        alert("Successfully executed!");
        setExpenses([...expenses, result]);
        setFormData({
          category: "Food & Groceries",
          title: "",
          amount: "",
          date: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to add expense:", errorData);
        alert(`Failed to add expense: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to connect to the server. Please check your internet connection.");
    }
  };

  return (
    <div className="expense-container">
      <header className="header">
        <h1>Add Expense</h1>
      </header>
      <main>
        <div id="box">
          <form id="expenseForm" onSubmit={handleSubmit}>
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Food & Groceries">Food & Groceries</option>
              <option value="Transportation">Transportation</option>
              <option value="Housing">Housing</option>
              <option value="Utilities">Utilities</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Personal Care">Personal Care</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Education">Education</option>
              <option value="Debt Payments">Debt Payments</option>
              <option value="Savings & Investments">Savings & Investments</option>
              <option value="Gifts & Donations">Gifts & Donations</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
            <br />
            <label htmlFor="title">Expense Name:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Expense Name"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="amount">Expense Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter Expense Amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <br />
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <br />
            <div id="bt">
              <input type="submit" className="submit" />
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AddExpense;
