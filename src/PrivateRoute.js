import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "./AuthContext";

function PrivateRoute({ children, ...rest }) {
  const auth = useContext(AuthContext);
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
