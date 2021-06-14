import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import CreateSalesEntry from "./pages/CreateSalesEntry";
import EditSalesEntry from "./pages/EditSalesEntry";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/createsales">
          <CreateSalesEntry />
        </Route>
        <Route path="/editsales/:id" exact>
          <EditSalesEntry />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
