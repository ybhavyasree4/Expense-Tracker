import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import Dashboard from "./components/DashBoard/DashBoard";
import AddExpense from "./components/AddExpense/AddExpense";
import ManageExpense from "./components/ManageExpense/ManageExpense";
import Report from "./components/Report/Report";
import AmountWise from "./components/AmountWise/AmountWise";
import CategoryWise from "./components/CategoryWise/CategoryWise";
import Goals from "./components/Goals/Goals";
import LogOut from "./components/LogOut/LogOut";
import { ExpensesProvider } from "./context/Context";


import "./App.css";

function App() {
  return (
    <ExpensesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addexpense" element={<AddExpense />} />
          <Route path="/manageexpense" element={<ManageExpense />} />
          <Route path="/report" element={<Report />} />
          <Route path="/amountwise" element={<AmountWise />} />
          <Route path="/categorywise" element={<CategoryWise />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/logout" element={<LogOut />} />
        </Routes>
      </Router>
    </ExpensesProvider>
  );
}

export default App;
