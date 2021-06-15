import React from "react";

const Input = ({ register, errors, history, edit, title, name }) => {
  return (
    <>
      <label className="block">{title}</label>
      <input
        defaultValue={edit && history.location.state[0].card_id}
        type="number"
        {...register(`${name}`, {
          valueAsNumber: true,
          required: "This field is required!",
        })}
        placeholder={title}
      />
      {errors.card_id && (
        <p style={{ color: "red" }}>{errors.card_id.message}</p>
      )}
    </>
  );
};

export default Input;
