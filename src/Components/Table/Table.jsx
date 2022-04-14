import React from "react";
import styled from "styled-components";

const TableWrapper = styled.table`
  width: 100%;
  text-align: left;
  margin: 16px 0;
  border-spacing: 0;
  border: 1px solid #f0f0fa;
  border-radius: 10px;

  thead {
    background-color: #f9fafb;
  }
`;

function Table() {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <th scope="col">CARD ID</th>
          <th scope="col">DATE</th>
          <th scope="col">AMOUNT</th>
          <th scope="col">DELETE</th>
          <th scope="col">EDIT</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr>
          <th scope="row">1</th>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
        <tr>
          <th scope="row">1</th>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
          <td>Cell</td>
        </tr>
      </tbody>
      {/* <tfoot>
        <tr>
          <th scope="col">Total</th>
          <td>Total</td>
          <td>Total</td>
          <td>Total</td>
          <td>Total</td>
          <td>Total</td>
        </tr>
      </tfoot> */}
    </TableWrapper>
  );
}

export default Table;
