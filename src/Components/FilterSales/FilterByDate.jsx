import React from "react";

const FilterByDate = ({ filterData }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Sales (in Rs.)</th>
          </tr>
        </thead>
        <tbody>
          {Boolean(filterData.length)
            ? filterData.map((data) => (
                <tr>
                  <td>{new Date(data.date).toLocaleDateString()}</td>
                  <td>$ {data.sum}</td>
                </tr>
              ))
            : "loading.."}
        </tbody>
      </table>
    </>
  );
};

export default FilterByDate;
