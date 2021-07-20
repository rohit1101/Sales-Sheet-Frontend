import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "./AuthContext";

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return JSON.parse(localStorage.getItem("jwt")) ? (
          children
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

export default PrivateRoute;
