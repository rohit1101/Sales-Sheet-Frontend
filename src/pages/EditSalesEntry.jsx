import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Layout from "../Layout";
import NavBar from "../NavBar";

const EditSalesEntry = () => {
  const history = useHistory();
  const { id, date, description, amount_paid } = history.location.state[0];
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sales: parseFloat(amount_paid) < 0 ? "expense" : "income",
      amount_paid: parseFloat(amount_paid),
      description: parseFloat(amount_paid) < 0 ? description : "NIL",
      id: id,
      date: new Date(date).toLocaleDateString().split("/").reverse().join("-"),
    },
  });
  const watchRadio = watch("sales");
  const initialValues = getValues();
  function updateSalesEntryHandler(data) {
    // const { date, amount_paid, description, sales } = data;
    // const amt = sales === "income" ? amount_paid : -amount_paid;
    const name = ["amount_paid", "date", "id", "description", "sales"];
    console.log(initialValues, data);
    const initialArr = [initialValues];
    const finalArr = [data];
    const identifier = name.filter((item, index) => {
      return (
        initialArr[0][item].toString() !== finalArr[0][item].toString() && item
      );
    });
    console.log(identifier);
    const body = {};
    identifier.forEach((item) => {
      body[item] = finalArr[0][item].toString();
    });
    console.log(body);
    history.push("/");
  }

  console.log(history);
  // console.log(setEditState, sale, updateSalesEntryHandler);
  return (
    <>
      <Layout>
        <NavBar />
        <form onSubmit={handleSubmit(updateSalesEntryHandler)}>
          <label className="block">Date</label>
          <input
            className="block mb-2"
            type="date"
            {...register("date", {
              value: new Date(date)
                .toLocaleDateString()
                .split("/")
                .reverse()
                .join("-"),
            })}
          />

          <label className="px-2">
            <input
              {...register("sales", {
                required: "Choose any one type",
              })}
              type="radio"
              id="income"
              value="income"
            />{" "}
            Income
          </label>

          <label className="px-2">
            <input
              {...register("sales", {
                required: "Choose any one type",
              })}
              type="radio"
              id="expense"
              value="expense"
            />{" "}
            Expense
          </label>
          {errors.sales && <p>{errors.sales.message}</p>}
          <label className="block">Amount</label>
          <input
            className="block mb-2"
            type="number"
            {...register("amount_paid", {
              required: "This field is required!",
              valueAsNumber: true,
            })}
          />
          {errors.amount_paid && <p>{errors.amount_paid.message}</p>}

          {watchRadio === "expense" ? (
            <>
              <label className="block">Description</label>
              <input
                className="block mb-2"
                {...register("description", {
                  required: "This field is required!",
                })}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </>
          ) : null}

          <input
            type="submit"
            // disabled={condition}
            value="Save Changes"
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
            // condition
            // ? "cursor-not-allowed opacity-40 block my-2 min-w-full bg-purple-300 text-purple-600 font-normal rounded-md px-2 py-1 shadow-2xl"
          />
          <button
            onClick={() => {
              reset();
              history.push("/");
            }}
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          >
            Cancel
          </button>
        </form>
      </Layout>
    </>
  );
};

export default EditSalesEntry;
