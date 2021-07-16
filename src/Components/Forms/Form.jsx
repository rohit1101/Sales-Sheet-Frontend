import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Form = ({
  type,
  handleSubmit,
  onSubmit,
  sale,
  register,
  errors,
  edit,
  setValue,
}) => {
  const history = useHistory();
  useEffect(() => {
    edit
      ? setValue(
          "date",
          new Date(sale.date)
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-")
        )
      : setValue(
          "date",
          new Date().toLocaleDateString().split("/").reverse().join("-")
        );
  }, []);

  return (
    <>
      {type === "income" ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="inline-block text-left"
        >
          <label className="block">Card Number</label>
          <input
            className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300"
            defaultValue={edit && sale.card_id}
            type="number"
            {...register("card_id", {
              required: "This field is required!",
              valueAsNumber: true,
            })}
          />
          {errors.card_id && (
            <p style={{ color: "red" }}>{errors.card_id.message}</p>
          )}

          <label className="block">Date</label>

          <input
            className="block mb-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
            type="date"
            {...register("date")}
          />

          <label className="block">Amount</label>
          <input
            className="block mb-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
            type="number"
            defaultValue={edit && sale.amount_paid}
            {...register("amount_paid", {
              required: "This field is required",
              min: 1,
              valueAsNumber: true,
              // validate: {
              //   lessThanZero: () => watchAmount > 0,
              // },
            })}
          />
          {errors.amount_paid && (
            <p style={{ color: "red" }}>{errors.amount_paid.message}</p>
          )}
          {/* {errors.amount_paid && errors.amount_paid.type === "lessThanZero" && (
            <p>Amount should be greater than zero</p>
          )} */}

          {edit ? (
            <input
              // disabled={Object.keys(dirtyFields).length > 0 ? false : true}
              type="submit"
              className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
            />
          ) : (
            <input
              type="submit"
              className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
            />
          )}

          <input
            type="button"
            value="Cancel"
            onClick={() => history.push("/")}
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          />
        </form>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="inline-block text-left"
        >
          <label className="block">Date</label>
          {edit ? (
            <input
              className="block mb-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="date"
              {...register("date", {
                value:
                  edit &&
                  new Date(sale.date)
                    .toLocaleDateString()
                    .split("/")
                    .reverse()
                    .join("-"),
              })}
            />
          ) : (
            <input type="date" {...register("date")} />
          )}

          <label className="block">Amount</label>
          <input
            className="block mb-2 shadow-xl"
            type="number"
            defaultValue={edit && sale.amount_paid}
            {...register("amount_paid", {
              required: "This field is required",
              min: 1,
              valueAsNumber: true,
              // validate: {
              //   lessThanZero: () => watchAmount > 0,
              // },
            })}
          />
          {errors.amount_paid && (
            <p style={{ color: "red" }}>{errors.amount_paid.message}</p>
          )}
          {/* {errors.amount_paid && errors.amount_paid.type === "lessThanZero" && (
            <p>Amount should be greater than zero</p>
          )} */}

          <label className="block">Description</label>
          <input
            className="block mb-2 shadow-xl"
            defaultValue={edit && sale.description}
            {...register("description", {
              validate: (value) => value.trim().length > 0,
            })}
          />
          {errors.description && (
            <p style={{ color: "red" }}>This field is required</p>
          )}

          <input
            // disabled={edit ? true : false}
            type="submit"
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          />
          <input
            type="button"
            value="Cancel"
            onClick={() => history.push("/")}
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          />
        </form>
      )}
    </>
  );
};

export default Form;
