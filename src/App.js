import React, { useState } from "react";

function App() {
  const [salesEntries, setSalesEntries] = useState([]);
  const [btnState, setBtnState] = useState(false);
  const [cardID, setCardId] = useState();
  const [date, setDate] = useState();

  function getSalesEntries() {
    let url = ``;
    console.log("cardId", cardID, "date", date);
    if (cardID) {
      url = `http://127.0.0.1:3000/sales?cardId=${cardID}`;
    }
    if (date) {
      url = `http://127.0.0.1:3000/sales?date=${date}`;
    }
    fetch(
      cardID && date
        ? `http://127.0.0.1:3000/sales?cardId=${cardID}&date=${date}`
        : url
    )
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setSalesEntries(res);
        setBtnState(true);
      })
      .catch((e) => console.log("Error:", e));
    setCardId("");
    setDate("");
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
          value={cardID}
          onChange={(e) => setCardId(e.target.value)}
        />
        <label className="block">Date</label>
        <input
          className="block mb-2"
          value={date}
          type="text"
          onChange={(e) => setDate(e.target.value)}
        />

        <button
          onClick={getSalesEntries}
          className="min-w-max-content bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
        >
          Get Sales Summary
        </button>

        {salesEntries.length ? (
          <>
            <table className="w-full my-2 table-auto bg-green-200 border-collapse border-2 border-green-800">
              <thead>
                <tr>
                  <th className="border border-green-600">Card ID</th>
                  <th className="border border-green-600">Sales Rep ID</th>
                  <th className="border border-green-600">Date</th>
                  <th className="border border-green-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {salesEntries.map((sale) => (
                  <tr className="bg-yellow-200">
                    <td className="border border-green-600">{sale.cardid}</td>
                    <td className="border border-green-600">
                      {sale.salesrepid}
                    </td>
                    <td className="border border-green-600">
                      {new Date(sale.date).toLocaleString()}
                    </td>
                    <td className="border border-green-600">
                      {sale.amountpaid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              disabled={!btnState}
              onClick={() => setBtnState()}
              className="min-w-max-content bg-red-300 text-red-600 font-normal hover:bg-red-100 duration-100 hover:text-red-500 rounded-md px-2 py-1 shadow-2xl"
            >
              Hide
            </button>
          </>
        ) : (
          "No data found"
        )}
      </div>
    </div>
  );
}

export default App;
