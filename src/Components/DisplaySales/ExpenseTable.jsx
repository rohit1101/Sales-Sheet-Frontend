// import React, { useState } from 'react'

import { useContext } from "react";
import SalesContext from "../../SalesContext";
import Sale from "./Sale";

const ExpenseTable = () => {
  const { expenseEntries, setExpenseEntries } = useContext(SalesContext);
  return (
    <>
      {expenseEntries && (
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
              expenseEntries.map((sale) => (
                <Sale
                  sale={sale}
                  key={sale.id}
                  expenseEntries={expenseEntries}
                  setExpenseEntries={setExpenseEntries}
                />
              ))
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

export default ExpenseTable;
