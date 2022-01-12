import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import MemoizedExpenseForm from "./components/NewExpense/ExpenseForm";
import Expenses from "./components/Expense/Expenses";
import { AuthProvider } from "./store/auth-context";
import Login from "./components/LoginForm/Login";

let send = true;
function App() {
  const [currExpenseData, updateCurrExpenseData] = useState({});
  const [expenseDataList, updateExpenseDataList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getDataFromForm = useCallback((expenseData) => {
    console.log(expenseData);
    updateCurrExpenseData(expenseData);
    updateExpenseDataList((prev) => [...prev, expenseData]);
  }, []);

  const login = (loginData) => {
    localStorage.setItem("isAuthorized", true);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("isAuthorized");
    setIsLoggedIn(false);
  };
  const fetchData = () => {
    setIsLoading(true);
    fetch(
      "https://expense-tracker-5b7af-default-rtdb.firebaseio.com/expenseData.json?print=pretty"
    )
      .then((response) => {
        if (!response.ok) throw new Error("Response Error");
        return response.json();
      })
      .then((data) => {
        if (!data) throw new Error("data not found");
        const newData = [];
        for (const key in data) {
          newData.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount,
            date: data[key].date,
          });
        }
        console.log(newData);
        updateExpenseDataList(newData);
      })
      .catch((err) => console.log(err))
      .finally(setIsLoading(false));
  };

  const sendData = (expenseData) => {
    fetch(
      "https://expense-tracker-5b7af-default-rtdb.firebaseio.com/expenseData.json",
      {
        method: "POST",
        body: JSON.stringify(expenseData),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("some thing bad happened");
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const isAuthorized = localStorage.getItem("isAuthorized");
    if (isAuthorized === "true") setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    console.log("fetching start..........");
    if (isLoggedIn) {
      fetchData();
      console.log("fetching end..........");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (send) {
      send = false;
      return;
    }
    console.log("send");
    sendData(currExpenseData);
  }, [currExpenseData]);

  return (
    <AuthProvider value={{login, logout,isLoggedIn}}>
      <div className="App">
        {!isLoggedIn && <Login />}
        {isLoggedIn && isLoading && <div className="loading">Loading.........</div>}
        {isLoggedIn && <MemoizedExpenseForm sendDataToApp={getDataFromForm} />}
        {isLoggedIn && !isLoading && expenseDataList.length > 0 && (
          <Expenses expenses={expenseDataList} />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
