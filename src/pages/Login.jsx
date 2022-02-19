import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { login } from "../services/api";

const Wrapper = styled.div``;
// w-full max-w-screen-md mx-auto rounded-sm h-full text-center
export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    const newData = {
      username: data.username.length && data.username.trim(),
      password: data.password.length && data.password.trim(),
    };

    login(newData)
      .then((res) => {
        localStorage.setItem("jwt", JSON.stringify(res.token));
        history.push("/");
      })
      .catch((e) => console.log(e));
    reset();
  };

  if (Boolean(JSON.parse(localStorage.getItem("jwt")) || "")) {
    history.push("/");
  }

  return (
    <Wrapper>
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
    </Wrapper>
  );
};
