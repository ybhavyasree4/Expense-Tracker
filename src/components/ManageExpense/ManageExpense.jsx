import React, { useState, useEffect } from "react";
import { useExpenses } from "../../context/Context";
import Logo from "../../uiComponents/ExpenseLogo/Logo2.png";
import "./ManageExpense.css";
import Datewise from "../../uiComponents/ReportLogo/Logo5.png";
import Monthwise from "../../uiComponents/ReportLogo/Logo6.png";
import Yearwise from "../../uiComponents/ReportLogo/Logo7.png";

const API_URL = "http://127.0.0.1:8000/api/manageexpense/";

const ManageExpense = () => {
  const { expenses, setExpenses } = useExpenses(); // Access shared context
  const [view, setView] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setExpenses(data); // Update context with fetched data
        } else {
          console.error("Failed to fetch expenses");
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, [setExpenses]);

  const sendExpenseToServer = async (formState) => {
    const data = {
      action: "add", // Specify the action as "add"
      title: formState.title,
      category: formState.category,
      amount: formState.amount,
      date: formState.date,
    };

    console.log("Sending data to backend:", data);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Expense managed successfully:", result);
        alert("Expense managed successfully!");
      } else {
        const errorData = await response.json();
        console.error("Failed to manage expense:", errorData);
        alert(
          `Failed to manage expense: ${errorData.error || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Unable to connect to the server. Please check your internet connection."
      );
    }
  };

  const getFilteredExpenses = () => {
    const grouped = {};
    expenses.forEach((expense) => {
      const dateObj = new Date(expense.date);
      let key = "";

      if (isNaN(dateObj)) {
        console.warn("Invalid date:", expense.date);
        return;
      }

      if (filter === "date") {
        key = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
      } else if (filter === "month") {
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        key = `${dateObj.getFullYear()}-${month}`; // YYYY-MM
      } else if (filter === "year") {
        key = `${dateObj.getFullYear()}`; // YYYY
      }

      if (key) {
        if (!grouped[key]) {
          grouped[key] = [];
        }
        grouped[key].push(expense);
      }
    });

    return Object.entries(grouped).map(([key, expenses]) => ({
      key,
      expenses,
    }));
  };

  return (
    <div className="expense-container">
      <h1 className="expense-heading">
        View <span>Expenses</span>
      </h1>

      {view === "" && (
        <div className="landing-box">
          <div className="image-section">
            <img
              src={Logo}
              alt="Expense Illustration"
              className="expense-image"
            />
          </div>
          <div className="button-section">
            <button onClick={() => setView("all")}>View All Expenses</button>
            <button onClick={() => setView("filter")}>Filter Expenses</button>
          </div>
        </div>
      )}

      {view === "all" && (
        <div className="filter-box">
          <h2>All Expenses</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Expense Name</th>
                <th>Category</th>
                <th>Expense Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td>{expense.id}</td>
                    <td>{expense.title}</td>
                    <td>{expense.category}</td>
                    <td>{expense.amount}</td>
                    <td>{expense.date}</td>
                    <td>
                      <button
                        onClick={() => {
                          console.log(
                            "Update functionality for expense:",
                            expense
                          );
                        }}
                      >
                        Update Expense
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No expenses found</td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="back-button" onClick={() => setView("")}>
            ← Back
          </button>
        </div>
      )}

      {view === "filter" && (
        <div className="filter-box">
          <h2>Filter Expenses</h2>
          <div className="category-card-container">
            <div
              className="category-card"
              onClick={() => {
                setFilter("date");
                setView("filtered");
              }}
            >
              <img src={Datewise} alt="Date-wise" className="card-icon" />
              <button className="category-button">
                View Date-wise Reports
              </button>
            </div>
            <div
              className="category-card"
              onClick={() => {
                setFilter("month");
                setView("filtered");
              }}
            >
              <img src={Monthwise} alt="Month-wise" className="card-icon" />
              <button className="category-button">
                View Month-wise Reports
              </button>
            </div>
            <div
              className="category-card"
              onClick={() => {
                setFilter("year");
                setView("filtered");
              }}
            >
              <img src={Yearwise} alt="Year-wise" className="card-icon" />
              <button className="category-button">View Yearly Reports</button>
            </div>
          </div>
          <button className="back-button" onClick={() => setView("")}>
            ← Back
          </button>
        </div>
      )}

      {view === "filtered" && (
        <div className="filtered-expenses">
          <h3>Filtered by {filter}</h3>
          {getFilteredExpenses().map((group) => (
            <div key={group.key} className="expense-group">
              <h4>{group.key}</h4>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Expense Name</th>
                    <th>Category</th>
                    <th>Expense Amount</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {group.expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.id}</td>
                      <td>{expense.title}</td>
                      <td>{expense.category}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.date}</td>
                      <td>
                        <button onClick={() => sendExpenseToServer(expense)}>
                          Send to Server
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
          <button className="back-button" onClick={() => setView("")}>
            ← Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageExpense;
