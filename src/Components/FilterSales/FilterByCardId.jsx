import React from "react";

const FilterByCardId = ({ filterData }) => {
  return (
    <>
      <table>
        <thead>
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
