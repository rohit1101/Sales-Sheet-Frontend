import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import AuthContext from "../AuthContext";
import Layout from "../Layout";

const Login = () => {
  const location = useLocation();
  const history = useHistory();
  // const { authLogin, loginData } = useContext(AuthContext);

  // if (authLogin) {
  //   const { from } = location.state || { from: { pathname: "/" } };
  //   history.replace(from);
  // }
  return (
    <Layout>
      <h1 className="text-lg my-8">Login</h1>
      <form className="inline-block text-left">
        <label className="block">Username</label>
        <input className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300" />
        <label className="block">Password</label>
        <input className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300" />
        <div></div>
        <input type="submit" value="Login" />
      </form>
    </Layout>
  );
};

export default Login;
