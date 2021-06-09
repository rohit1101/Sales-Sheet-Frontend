import React, { useState } from "react";
import SalesTable from "./Components/DisplaySales/SalesTable";
import FilterByCardId from "./Components/FilterSales/FilterByCardId";
import FilterByDate from "./Components/FilterSales/FilterByDate";
import FilterByDateRange from "./Components/FilterSales/FilterByDateRange";
import { getSalesEntries, addSalesEntry, filterSales } from "./services/api";

function App() {
  const [salesEntries, setSalesEntries] = useState([]);
  const [cardId, setCardId] = useState();
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const [incomeOrExpense, setIncomeOrExpense] = useState({
    income: false,
    expense: false,
  });
  const [description, setDescription] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    startDate: "",
    endDate: "",
  });
  const salesRepId = 1;

  function getSalesEntriesHandler() {
    getSalesEntries(cardId, date)
      .then((res) => setSalesEntries(res))
      .catch((error) => console.log("From App.js METHOD = GET: ", error));

    setCardId("");
    setDate("");
    setIncomeOrExpense({
      income: false,
      expense: false,
    });
  }

  function addSalesEntryHandler() {
    addSalesEntry(
      cardId,
      salesRepId,
      incomeOrExpense.income ? amount : `-${amount}`,
      date,
      description ? description : "NIL"
    )
      .then((res) => {
        console.log(res);
        setSalesEntries([...salesEntries, res]);
      })
      .catch((error) => console.log("From App.js METHOD = POST", error));
    setCardId("");
    setDate("");
    setAmount("");
    setIncomeOrExpense({
      income: false,
      expense: false,
    });
    setDescription("");
  }

  function handleIncomeOrExpense(e) {
    setIncomeOrExpense({
      ...incomeOrExpense,
      [e.target.name]: e.target.checked,
    });
  }

  function handleFilterRequest(filterValue) {
    if (typeof filterValue === "object") {
      filterSales(filterValue)
        .then((res) => setFilterData(res))
        .catch((e) => console.log("Error e", e));
    } else {
      filterSales(filterValue)
        .then((res) => setFilterData(res))
        .catch((e) => console.log("Error e", e));
    }
  }

  function handleFilterChange(e) {
    if (e.target.value === "date" || e.target.value === "card_id") {
      setFilterBy(e.target.value);
      handleFilterRequest(e.target.value);
    } else if (e.target.value === "date_range") {
      setFilterBy(e.target.value);
    } else if (e.target.value === "Choose Filter") {
      setFilterBy(e.target.value);
    }
  }

  let condition = incomeOrExpense.income
    ? cardId && salesRepId && amount && incomeOrExpense.income
    : cardId && salesRepId && amount && incomeOrExpense.expense && description;

  return (
    <div className="h-full bg-blue-100">
      <div className="w-full max-w-screen-md mx-auto rounded-sm shadow-xl h-full">
        <h1 className="font-sans text-2xl font-medium text-gray-500 text-center">
          Sales Summary
        </h1>

        <label className="block">Card Id</label>
        <input
          type="text"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
        />
        <label className="block">Date</label>
        <input
          className="block mb-2"
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value.split("/").reverse().join("-"))
          }
        />
        <label className="px-2">
          <input
            type="checkbox"
            name="income"
            checked={incomeOrExpense.income}
            onChange={handleIncomeOrExpense}
          />{" "}
          Income
        </label>
        <label className="px-2">
          <input
            type="checkbox"
            name="expense"
            checked={incomeOrExpense.expense}
            onChange={handleIncomeOrExpense}
          />{" "}
          Expense
        </label>

        <label className="block">Amount</label>
        <input
          className="block mb-2"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {incomeOrExpense.expense ? (
          <>
            <label className="block">Description</label>
            <input
              className="block mb-2"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        ) : null}

        <button
          onClick={getSalesEntriesHandler}
          className="min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
        >
          {cardId || date ? "Get Sales Summary" : "Get All Sales Summary"}
        </button>

        <button
          onClick={addSalesEntryHandler}
          disabled={condition ? false : true}
          className={
            condition
              ? "block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
              : "cursor-not-allowed opacity-40 block my-2 min-w-full bg-purple-300 text-purple-600 font-normal rounded-md px-2 py-1 shadow-2xl"
          }
        >
          Add Sales Entry
        </button>
        <label className="block">
          <span className="block">Filter Sales</span>
          <select value={filterBy} onChange={handleFilterChange}>
            <option value="Choose Filter" name="Choose Filter">
              Choose Filter
            </option>
            <option value="date">Filter by day</option>
            <option value="card_id">Filter by card ID</option>
            <option value="date_range">Filter by date range</option>
          </select>
        </label>
        {filterBy === "date_range" ? (
          <>
            <label className="block">Start Date</label>
            <input
              className="block mb-2"
              type="date"
              value={dateFilter.startDate}
              name="startDate"
              onChange={(e) =>
                setDateFilter({
                  ...dateFilter,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="block">End Date</label>
            <input
              className="block mb-2"
              type="date"
              value={dateFilter.endDate}
              name="endDate"
              onChange={(e) =>
                setDateFilter({
                  ...dateFilter,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <button
              className="block p-2 bg-yellow-100 text-yellow-600  rounded-md px-2 py-1 shadow-2xl"
              onClick={() => {
                if (Object.values(dateFilter).length === 2) {
                  handleFilterRequest(dateFilter);
                  setDateFilter({
                    startDate: "",
                    endDate: "",
                  });
                }
              }}
            >
              Submit
            </button>
          </>
        ) : null}

        {filterBy === "date" ? <FilterByDate filterData={filterData} /> : null}
        {filterBy === "card_id" ? (
          <FilterByCardId filterData={filterData} />
        ) : null}
        {filterBy === "date_range" && Object.values(dateFilter).length === 2 ? (
          <FilterByDateRange filterData={filterData} />
        ) : null}
        <SalesTable
          sales={salesEntries}
          salesEntries={salesEntries}
          setSalesEntries={setSalesEntries}
        />
      </div>
    </div>
  );
}

export default App;
