import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SalesTable from "./components/DisplaySales/SalesTable";

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
  padding: 8px 16px;
`;
const UnorderedList = styled.ul`
  list-style: none;
  padding: 0px;
`;

const Content = styled.div`
  flex: 2;
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
        <UnorderedList>
          <li>Home</li>
          <li>Income</li>
          <li>Expense</li>
        </UnorderedList>
      </SideBar>
      <Content>Main content</Content>
    </Wrapper>
  );
}

export default App;
