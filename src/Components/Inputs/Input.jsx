import React from "react";

const Input = ({}) => {
  return (
    <>
      <label className="block">Card Number</label>
      <input
        defaultValue={edit && history.location.state[0].card_id}
        type="number"
        {...register("card_id", {
          valueAsNumber: true,
          required: "This field is required!",
        })}
        placeholder="Card Number"
      />
      {errors.card_id && (
        <p style={{ color: "red" }}>{errors.card_id.message}</p>
      )}
    </>
  );
};

export default Input;
