import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./App";
import AddSalesEntry from "./pages/AddSalesEntry";
import EditSalesEntry from "./pages/EditSalesEntry";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("jwt"))) {
      console.log("logged in");
    }
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

        <PrivateRoute exact path="/">
          <App />
        </PrivateRoute>
        <PrivateRoute exact path="/income">
          <AddSalesEntry type="income" />
        </PrivateRoute>
        <PrivateRoute path="/income/:id" exact>
          <EditSalesEntry type="income" />
        </PrivateRoute>
        <PrivateRoute path="/expense" exact>
          <AddSalesEntry type="expense" />
        </PrivateRoute>
        <PrivateRoute path="/expense/:id" exact>
          <EditSalesEntry type="expense" />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
