import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Layout from "../Layout";
import NavBar from "../NavBar";
import { addSalesEntry } from "../services/api";

const CreateSalesEntry = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const watchRadio = watch("sales");
  const [salesEntries, setSalesEntries] = useState([]);
  const salesRepId = 1;

  const onSubmit = (data, e) => {
    console.log(data);
    const { card_id, amount_paid, description, date, sales } = data;
    addSalesEntry(
      card_id,
      salesRepId,
      sales === "income" ? amount_paid : -amount_paid,
      date,
      description ? description : "NIL"
    )
      .then((res) => {
        setSalesEntries([...salesEntries, res]);
      })
      .catch((error) => console.log("From App.js METHOD = POST", error));
    setValue("sales", "");
    reset();
    history.push("/");
  };

  return (
    <Layout>
      <NavBar />
      <div className="text-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="inline-block text-left"
        >
          <label className="block">Card Number</label>
          <input
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
          <label className="block">Date</label>
          <input
            className="block mb-2"
            type="date"
            {...register("date", {
              value: new Date()
                .toLocaleDateString()
                .split("/")
                .reverse()
                .join("-"),
              // valueAsDate: true,
            })}
          />

          <label className="px-2">
            <input
              {...register("sales", {
                required: "Choose any one type",
              })}
              type="radio"
              id="income"
              value="income" // checked={incomeOrExpense.income}
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

              // checked={incomeOrExpense.expense}
              // onChange={handleIncomeOrExpense}
            />{" "}
            Expense
          </label>
          {errors.sales && (
            <p style={{ color: "red" }}>{errors.sales.message}</p>
          )}
          <label className="block">Amount</label>
          <input
            className="block mb-2"
            type="number"
            {...register("amount_paid", {
              required: "This field is required!",
              valueAsNumber: true,
            })}
            // onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount_paid && (
            <p style={{ color: "red" }}>{errors.amount_paid.message}</p>
          )}

          {watchRadio === "expense" ? (
            <>
              <label className="block">Description</label>
              <input
                className="block mb-2"
                {...register("description", {
                  required: "This field is required!",
                })}
                // onChange={(e) => setAmount(e.target.value)}
              />
              {errors.description && (
                <p style={{ color: "red" }}>{errors.description.message}</p>
              )}
            </>
          ) : null}

          <input
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
      </div>
    </Layout>
  );
};

export default CreateSalesEntry;
