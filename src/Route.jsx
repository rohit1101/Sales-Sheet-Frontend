import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import AuthContext from "./AuthContext";
import CreateSalesEntry from "./pages/CreateSalesEntry";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./PrivateRoute";
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
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
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
          <PrivateRoute exact path="/">
            <App />
          </PrivateRoute>
          <PrivateRoute exact path="/income">
            <CreateSalesEntry />
          </PrivateRoute>
          <PrivateRoute path="/income/:id" exact>
            <CreateSalesEntry />
          </PrivateRoute>
          <PrivateRoute path="/expense" exact>
            <CreateSalesEntry />
          </PrivateRoute>
          <PrivateRoute path="/expense/:id" exact>
            <CreateSalesEntry />
          </PrivateRoute>
        </SalesContext.Provider>
      </Switch>
    </Router>
  );
};

export default Routes;
