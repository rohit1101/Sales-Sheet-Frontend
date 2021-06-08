// import React, { useState } from 'react'

import Sale from "./Sale";

const SalesTable = ({ sales, setSalesEntries, salesEntries }) => {
  return (
    <>
      {sales && (
        <table className="w-full my-2 table-auto bg-green-200 border-collapse border-2 border-green-800">
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
            {sales.length ? (
              sales.map((sale) => (
                <Sale
                  sale={sale}
                  key={sale.id}
                  setSalesEntries={setSalesEntries}
                  salesEntries={salesEntries}
                />
              ))
            ) : (
              <tr>
                <td className="text-center">No sales</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SalesTable;
