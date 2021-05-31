// import React, { useState } from 'react'

const SalesTable = ({ sales }) => {
  return (
    <>
      {sales && (
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
            {sales.length ? (
              sales.map((sale) => (
                <tr className="bg-yellow-200">
                  <td className="border border-green-600">{sale.card_id}</td>
                  <td className="border border-green-600">
                    {sale.sales_rep_id}
                  </td>
                  <td className="border border-green-600">
                    {sale.date
                      ? new Date(sale.date).toLocaleString()
                      : new Date().toLocaleString()}
                  </td>
                  <td className="border border-green-600">
                    {sale.amount_paid}
                  </td>
                </tr>
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
