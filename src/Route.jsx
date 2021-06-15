import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import CreateSalesEntry from "./pages/CreateSalesEntry";

const Routes = () => {
  return (
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
  );
};

export default Routes;
