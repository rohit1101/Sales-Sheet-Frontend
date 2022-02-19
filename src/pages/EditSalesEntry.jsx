import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import {
  getAllExpensesEntries,
  getAllIncomeEntries,
  getExpenseById,
  getIncomeById,
  updateExpenseEntry,
  updateIncomeEntry,
} from "../services/api";

const EditSalesEntry = ({ type }) => {
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const date = watch("date");

  useEffect(() => {
    if (type === "income") {
      getIncomeById(id)
        .then((res) => {
          reset({
            amount_paid: +res.amount_paid,
            card_id: +res.card_id,
            id: +res.id,
            date: new Date(res.date),
          });
        })
        .catch((error) =>
          console.log("Error while getting income by id", error)
        );
      getAllIncomeEntries()
        .then((res) => setIncomeEntries(res))
        .catch((error) =>
          console.log("From EditSalesEntry METHOD = GET: ", error)
        );
    }
    if (type === "expense") {
      getExpenseById(id)
        .then((res) => {
          reset({
            amount_paid: +res.amount_paid,
            description: res.description,
            id: +res.id,
            date: new Date(res.date),
          });
        })
        .catch((error) =>
          console.log("Error while getting expense by id", error)
        );
      getAllExpensesEntries()
        .then((res) => setExpenseEntries(res))
        .catch((error) =>
          console.log("From EditSalesEntry METHOD = GET: ", error)
        );
    }
  }, [reset]);

  const history = useHistory();
  const { id } = useParams();

  const onSubmit = (data) => {
    if (type === `income`) {
      const body = {
        ...data,
        date: format(data.date, "yyyy-MM-dd"),
      };

      if (Boolean(Object.keys(body).length)) {
        updateIncomeEntry(id, body)
          .then((res) => {
            history.push("/");
          })
          .catch((error) => console.log("From App.js METHOD = PUT", error));

        reset();
      } else {
        alert("edit atleast one of the fields");
      }
    }
    if (type === `expense`) {
      const body = {
        ...data,
        date: format(data.date, "yyyy-MM-dd"),
      };

      if (Boolean(Object.keys(body).length)) {
        updateExpenseEntry(id, body)
          .then((res) => {
            history.push("/");
          })
          .catch((error) => console.log("From App.js METHOD = PUT", error));

        reset();
      } else {
        alert("Edit atleast one the fields");
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="inline-block text-left"
      >
        {type === "income" && (
          <>
            <label className="block">Card Number</label>
            <input
              className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="number"
              {...register("card_id", {
                required: "This field is required!",
                valueAsNumber: true,
                validate: {
                  positiveNumber: (value) => parseFloat(value) > 0,
                },
              })}
            />
            {errors.card_id && errors.card_id.type === "positiveNumber" && (
              <p style={{ color: "red" }}>Card ID is invalid</p>
            )}

            {errors.card_id && (
              <p style={{ color: "red" }}>{errors.card_id.message}</p>
            )}
          </>
        )}
        <label className="block">Date</label>

        <Controller
          name="date"
          control={control}
          required
          //   defaultValue={new Date(date)}
          render={({ field }) => (
            <DatePicker
              placeholderText="Enter sale date"
              onChange={(e) => field.onChange(e)}
              selected={date ? date : field.value}
              dateFormat="dd/MM/yyyy"
            />
          )}
        />

        <label className="block">Amount</label>

        <input
          className="block mb-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          type="number"
          {...register("amount_paid", {
            required: "This field is required",
            valueAsNumber: true,
            validate: {
              positiveNumber: (value) => parseFloat(value) > 0,
            },
          })}
        />
        {errors.amount_paid && errors.amount_paid.type === "positiveNumber" && (
          <p style={{ color: "red" }}>amount should be greater than 0</p>
        )}

        {errors.amount_paid && (
          <p style={{ color: "red" }}>{errors.amount_paid.message}</p>
        )}

        {type === "expense" && (
          <>
            <label className="block">Description</label>
            <input
              className="block mb-2 shadow-xl"
              {...register("description", {
                validate: (value) => value.trim().length > 0,
              })}
            />
            {errors.description && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </>
        )}
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
  );
};

export default EditSalesEntry;
