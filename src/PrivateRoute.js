import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const auth = false;
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
