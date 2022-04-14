import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SalesTable from "./components/DisplaySales/SalesTable";
import Table from "./components/Table/Table";

import { getAllExpensesEntries, getAllIncomeEntries } from "./services/api";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
`;

const SideBar = styled.nav`
  flex: 1;
  max-width: 350px;
  background-color: hsl(245, 58%, 51%);
  color: hsl(0, 0%, 100%);
  padding: 16px;

  a {
    font-size: 24px;
    display: inline-block;
    padding: 16px 0;
  }
`;
const UnorderedList = styled.ul`
  list-style: none;
  padding: 0px;

  li {
    padding: 8px 0;
  }
`;

const Content = styled.div`
  flex: 2;
  padding: 36px;

  h3 {
    text-transform: uppercase;
  }
`;

function App() {
  const history = useHistory();
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [tabState, setTabState] = useState({
    income: true,
    expense: false,
  });

  useEffect(() => {
    getAllIncomeEntries()
      .then((res) => setIncomeEntries(res))
      .catch((error) => console.log("From App.js METHOD = GET: ", error));
    getAllExpensesEntries()
      .then((res) => setExpenseEntries(res))
      .catch((error) => console.log("From App.js METHOD = GET: ", error));
  }, []);

  return (
    <Wrapper>
      <SideBar>
        <a href="/">LOGO</a>
        <UnorderedList>
          <li>Home</li>
          <li>Income</li>
          <li>Expense</li>
        </UnorderedList>
      </SideBar>
      <Content>
        <h3>Dashboard</h3>
        <h4>Transactions</h4>
        <Table />
      </Content>
    </Wrapper>
  );
}

export default App;
