import React, { useState } from "react";
import SalesTable from "./Components/DisplaySales/SalesTable";
import { getSalesEntries, addSalesEntry } from "./services/api";

function App() {
  const [salesEntries, setSalesEntries] = useState([]);
  const [cardId, setCardId] = useState();
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const salesRepId = 1;

  function getSalesEntriesHandler() {
    getSalesEntries(cardId, date)
      .then((res) => setSalesEntries(res))
      .catch((error) => console.log("From App.js METHOD = GET: ", error));

    setCardId("");
    setDate("");
  }

  function addSalesEntryHandler() {
    addSalesEntry(cardId, salesRepId, amount, date)
      .then((res) => {
        console.log(res);
        setSalesEntries([...salesEntries, res]);
      })
      .catch((error) => console.log("From App.js METHOD = POST", error));
    setCardId("");
    setDate("");
    setAmount("");
  }

  return (
    <div className="h-screen bg-blue-100">
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
        <label className="block">Amount</label>
        <input
          className="block mb-2"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={getSalesEntriesHandler}
          className="min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
        >
          {cardId || date ? "Get Sales Summary" : "Get All Sales Summary"}
        </button>
        {cardId && salesRepId && amount ? (
          <button
            onClick={addSalesEntryHandler}
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          >
            Add Sales Entry
          </button>
        ) : (
          <button
            disabled={true}
            style={{ cursor: "not-allowed" }}
            className="opacity-40 block my-2 min-w-full bg-purple-300 text-purple-600 font-normal rounded-md px-2 py-1 shadow-2xl"
          >
            Add Sales Entry
          </button>
        )}
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
