import React from "react";

const FilterByDate = ({ filterData }) => {
  return (
    <>
      <table className="table-auto w-full text-center bg-gray-100">
        <thead className="bg-gray-300">
          <tr>
            <th>Date</th>
            <th>Total Sales</th>
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
