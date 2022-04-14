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
      <form onSubmit={handleSubmit(onSubmit)}>
        {type === "income" && (
          <>
            <label>Card Number</label>
            <input
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
        <label>Date</label>

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

        <label>Amount</label>

        <input
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
            <label>Description</label>
            <input
              {...register("description", {
                validate: (value) => value.trim().length > 0,
              })}
            />
            {errors.description && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </>
        )}
        <input type="submit" />
        <input type="button" value="Cancel" onClick={() => history.push("/")} />
      </form>
    </div>
  );
};

export default EditSalesEntry;
