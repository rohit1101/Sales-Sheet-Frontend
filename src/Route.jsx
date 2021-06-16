import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import CreateSalesEntry from "./pages/CreateSalesEntry";
import { SalesProvider } from "./SalesContext";
import { getIncomeEntries } from "./services/api";

const Routes = () => {
  const [incomeEntries, setIncomeEntries] = useState([]);
  // const [expenseEntries, setExpenseEntries] = useState([]);
  useEffect(() => {
    getIncomeEntries()
      .then((res) => setIncomeEntries(res))
      .catch((error) => console.log("From App.js METHOD = GET: ", error));
    // getExpenseEntries()
    // .then((res) => setExpenseEntries(res))
    // .catch((error) => console.log("From App.js METHOD = GET: ", error));
  }, []);

  return (
    <SalesProvider value={{ incomeEntries, setIncomeEntries }}>
      <Router>
        <Switch>
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
    </SalesProvider>
  );
};

export default Routes;
