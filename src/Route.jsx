import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import CreateSalesEntry from "./pages/CreateSalesEntry";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>

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
      </Switch>
    </Router>
  );
};

export default Routes;
