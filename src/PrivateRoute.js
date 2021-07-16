import { useState } from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const [auth] = useState(JSON.parse(localStorage.getItem("jwt")) || "");

  return (
    <Route
      {...rest}
      render={() => {
        return auth ? children : <Redirect to="/login" />;
      }}
    />
  );
}

export default PrivateRoute;
