import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { login } from "../services/api";

const FormHead = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  padding-bottom: 1rem;
`;

const Form = styled.form`
  /* width: max-content; */
  margin: auto;
  border: dotted 1px silver;
  border-radius: 2px;
  padding: 24px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 16px;
  font-size: 1.2rem;
`;

const Input = styled.input`
  display: block;
  border: 1px solid black;
  border-bottom-width: 2px;
  padding: 6px 8px;
  margin: 4px 0;

  &::placeholder {
    color: #a09e9e;
  }

  &:focus {
    outline: 2px solid blue;
    outline-offset: 2px;
    border-color: transparent;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  color: hsl(0, 0%, 100%);
  padding: 6px 8px;
  text-transform: uppercase;
  font-weight: 600;
  background-color: hsl(0, 100%, 0%);
  border: none;

  &:focus {
    outline: 2px solid hsl(130, 50%, 70%);
    outline-offset: 2px;
    border: none;
    background: hsl(
      129.62264150943398,
      46.49122807017543%,
      55.294117647058826%
    );
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHead>Log In</FormHead>
        <Label>
          Username:
          <Input
            placeholder="Enter Username"
            {...register("username", {
              required: "This field is required!",
            })}
          />
          {errors.username && (
            <p style={{ color: "red" }}>{errors.username.message}</p>
          )}
        </Label>

        <Label>
          Password:
          <Input
            placeholder="********"
            type="password"
            {...register("password", {
              required: "This field is required!",
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </Label>

        <SubmitButton type="submit">Log In</SubmitButton>
      </Form>
    </Wrapper>
  );
};
