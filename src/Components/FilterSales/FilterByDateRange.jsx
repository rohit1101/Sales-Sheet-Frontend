import React from "react";

const FilterByDateRange = ({ filterData }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Card Number</th>
            <th>Date</th>
            <th>Total Sales (in Rs.)</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {Boolean(filterData.length)
            ? filterData.map((data) => (
                <tr>
                  <td>{data.card_id}</td>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td>{data.amount_paid}</td>
                  <td>{data.description}</td>
                </tr>
              ))
            : "loading.."}
        </tbody>
      </table>
    </>
  );
};

export default FilterByDateRange;
