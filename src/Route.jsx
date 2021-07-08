import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import CreateSalesEntry from "./pages/CreateSalesEntry";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SalesContext from "./SalesContext";
import { getAllExpensesEntries, getAllIncomeEntries } from "./services/api";

const Routes = () => {
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
    <SalesContext.Provider
      value={{
        incomeEntries,
        setIncomeEntries,
        expenseEntries,
        setExpenseEntries,
        tabState,
        setTabState,
      }}
    >
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <App />
          </Route>
          <Route exact path="/income">
            <CreateSalesEntry />
          </Route>
          <Route path="/income/:id" exact>
            <CreateSalesEntry />
          </Route>
          <Route path="/expense" exact>
            <CreateSalesEntry />
          </Route>
          <Route path="/expense/:id" exact>
            <CreateSalesEntry />
          </Route>
        </Switch>
      </Router>
    </SalesContext.Provider>
  );
};

export default Routes;
