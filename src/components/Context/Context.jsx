import React, { createContext, useContext, useState } from 'react';

// Create the context for expenses
const ExpensesContext = createContext();

// Create a provider component to wrap your application
export const ExpensesProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([
    // Example data
    { id: 1, date: '2025-04-01', category: 'Food', expenseAmount: 50 },
    { id: 2, date: '2025-04-02', category: 'Transport', expenseAmount: 20 },
    { id: 3, date: '2025-04-05', category: 'Entertainment', expenseAmount: 100 },
    { id: 4, date: '2025-04-01', category: 'Food', expenseAmount: 30 },
    { id: 5, date: '2025-04-02', category: 'Transport', expenseAmount: 25 },
    { id: 6, date: '2025-04-03', category: 'Bills', expenseAmount: 200 },
    { id: 7, date: '2025-04-01', category: 'Entertainment', expenseAmount: 75 },
  ]);

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses }}>
      {children}
    </ExpensesContext.Provider>
  );
};

// Custom hook to use the ExpensesContext
export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses must be used within an ExpensesProvider');
  }
  return context;
};
