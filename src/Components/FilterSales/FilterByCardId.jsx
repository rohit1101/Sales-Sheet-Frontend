import React from "react";

const FilterByCardId = ({ filterData }) => {
  return (
    <>
      <table className="table-auto w-full text-center bg-gray-100">
        <thead className="bg-gray-300">
          <tr>
            <th>Card Number</th>
            <th>Total Sales (in Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {Boolean(filterData.length)
            ? filterData.map((data) => (
                <tr>
                  <td>{data.card_id}</td>
                  <td>{data.sum}</td>
                </tr>
              ))
            : "loading.."}
        </tbody>
      </table>
    </>
  );
};

export default FilterByCardId;
