import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SalesTable from "./components/DisplaySales/SalesTable";

import { getAllExpensesEntries, getAllIncomeEntries } from "./services/api";

function App() {
  const history = useHistory();
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [tabState, setTabState] = useState({
    income: true,
    expense: false,
  });

  useEffect(() => {
    getAllIncomeEntries()
      .then((res) => setIncomeEntries(res))
      .catch((error) => console.log("From App.js METHOD = GET: ", error));
    getAllExpensesEntries()
      .then((res) => setExpenseEntries(res))
      .catch((error) => console.log("From App.js METHOD = GET: ", error));
  }, []);

  console.log("re-render");
  return (
    <div>
      <h1 className="font-sans text-2xl font-medium text-gray-500 text-center">
        Sales Summary
      </h1>
      <button
        onClick={() => {
          history.push("/login");
          localStorage.removeItem("jwt");
        }}
        className="bg-red-200 text-red-600 font-semibold hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
      >
        Logout
      </button>
      <div className="text-center my-5">
        <button
          className="bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          onClick={() => history.push("/income")}
        >
          Add Income
        </button>
      </div>

      <div className="text-center my-5">
        <button
          className="bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          onClick={() => history.push("/expense")}
        >
          Add Expense
        </button>
      </div>

      <div className="flex justify-around bg-gray-100 p-3 rounded-lg">
        <div
          className={
            tabState.income
              ? "cursor-pointer text-purple-500 font-medium px-4 py-2  bg-purple-200 rounded-lg"
              : "cursor-pointer text-gray-400 font-medium px-4 py-2"
          }
          onClick={() => setTabState({ expense: false, income: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 stroke-current text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>{" "}
          Income Table
        </div>
        <div
          className={
            tabState.expense
              ? "cursor-pointer text-purple-500 font-medium px-4 py-2 bg-purple-200 rounded-lg"
              : "cursor-pointer text-gray-400 font-medium px-4 py-2"
          }
          onClick={() => setTabState({ income: false, expense: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 stroke-current text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
          Expense Table
        </div>
      </div>

      <SalesTable
        incomeEntries={incomeEntries}
        expenseEntries={expenseEntries}
        tabState={tabState}
        setExpenseEntries={setExpenseEntries}
        setIncomeEntries={setIncomeEntries}
      />
    </div>
  );
}

export default App;
