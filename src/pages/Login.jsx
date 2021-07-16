import { useForm } from "react-hook-form";
import Layout from "../Layout";
import { login } from "../services/api";

const Login = () => {
  // const location = useLocation();
  // const history = useHistory();
  // const { authLogin, loginData } = useContext(AuthContext);

  // if (authLogin) {
  //   const { from } = location.state || { from: { pathname: "/" } };
  //   history.replace(from);
  // }

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const newData = {
      username: data.username.length && data.username.trim(),
      password: data.password.length && data.password.trim(),
    };

    login(newData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("jwt", JSON.stringify(res.token));
      })
      .catch((e) => console.log(e));
    reset();
  };

  return (
    <Layout>
      <h1 className="text-lg my-8">Login</h1>
      <form
        className="inline-block text-left"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block">Username</label>
        <input
          className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300"
          {...register("username", {
            required: "This field is required!",
          })}
        />
        {errors.username && (
          <p style={{ color: "red" }}>{errors.username.message}</p>
        )}
        <label className="block">Password</label>
        <input
          className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300"
          type="password"
          {...register("password", {
            required: "This field is required!",
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
        <div></div>
        <input type="submit" value="Login" />
      </form>
    </Layout>
  );
};

export default Login;
