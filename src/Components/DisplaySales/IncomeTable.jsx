// import React, { useState } from 'react'

import Sale from "./Sale";

const IncomeTable = ({ setIncomeEntries, incomeEntries }) => {
  return (
    <>
      {incomeEntries && (
        <div className="w-full my-2 bg-green-200 border-collapse border-2 border-green-800">
          <div>
            <div>
              <th className="border border-green-600">Card ID</th>
              <th className="border border-green-600">Date</th>
              <th className="border border-green-600">Amount</th>
              <th className="border border-green-600">Delete</th>
              <th className="border border-green-600">Edit</th>
            </div>
          </div>
          <div>
            {incomeEntries.length ? (
              incomeEntries.map((sale) => (
                <Sale
                  sale={sale}
                  key={sale.id}
                  setIncomeEntries={setIncomeEntries}
                  incomeEntries={incomeEntries}
                />
              ))
            ) : (
              <div>
                <p className="text-center">No sales</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default IncomeTable;
