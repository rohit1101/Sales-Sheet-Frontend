// import React, { useState } from 'react'

import { useContext } from "react";
import SalesContext from "../../SalesContext";
import Sale from "./Sale";

const SalesTable = () => {
  const { incomeEntries, expenseEntries, tabState } = useContext(SalesContext);

  return (
    <>
      {tabState.income ? (
        <table className="w-full my-4 bg-green-200 border-collapse border-2 border-green-800">
          <thead>
            <tr>
              <th className="border border-green-600">Card ID</th>
              <th className="border border-green-600">Date</th>
              <th className="border border-green-600">Amount</th>
              <th className="border border-green-600">Delete</th>
              <th className="border border-green-600">Edit</th>
            </tr>
          </thead>
          <tbody>
            {incomeEntries.length ? (
              incomeEntries.map((sale) => <Sale sale={sale} key={sale.id} />)
            ) : (
              <tr>
                <td>No sales</td>
              </tr>
            )}
          </tbody>
        </table>
      ) : (
        <table className="w-full my-4 bg-green-200 border-collapse border-2 border-green-800">
          <thead>
            <tr>
              <th className="border border-green-600">Date</th>
              <th className="border border-green-600">Amount</th>
              <th className="border border-green-600">Description</th>
              <th className="border border-green-600">Delete</th>
              <th className="border border-green-600">Edit</th>
            </tr>
          </thead>
          <tbody>
            {expenseEntries.length ? (
              expenseEntries.map((sale) => <Sale key={sale.id} sale={sale} />)
            ) : (
              <tr>
                <td className="text-blue-200">No sales</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SalesTable;
