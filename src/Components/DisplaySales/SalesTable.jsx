// import React, { useState } from 'react'

import Sale from "./Sale";

const SalesTable = ({ sales, setSalesEntries, salesEntries }) => {
  return (
    <>
      {sales && (
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

export default SalesTable;
