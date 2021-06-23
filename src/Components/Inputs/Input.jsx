import React from "react";

const Input = ({
  register,
  errors,
  history,
  edit,
  title,
  name,
  type,
  valueAsNumber,
}) => {
  return (
    <>
      {type === "date" ? (
        <>
          <label className="block">{title}</label>
          <input
            className="block mb-2"
            type={type}
            // defaultValue={edit && history.location.state[0].date}
            {...register(name, {
              value: edit
                ? new Date(history.location.state[0].date)
                    .toLocaleDateString()
                    .split("/")
                    .reverse()
                    .join("-")
                : new Date()
                    .toLocaleDateString()
                    .split("/")
                    .reverse()
                    .join("-"),
              // valueAsDate: true,
            })}
          />
        </>
      ) : (
        <>
          <label className="block">{title}</label>
          <input
            defaultValue={edit && history.location.state[0].name}
            type={type}
            {...register(name, {
              required: "This field is required!",
              valueAsNumber: valueAsNumber,
            })}
            placeholder={title}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </>
      )}
    </>
  );
};

export default Input;
