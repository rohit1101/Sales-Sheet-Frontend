import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../Layout";
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
  const [sale, setSale] = useState({});

  useEffect(() => {
    if (type === "income") {
      getAllIncomeEntries()
        .then((res) => setIncomeEntries(res))
        .catch((error) => console.log("From App.js METHOD = GET: ", error));
      getIncomeById(id)
        .then((res) => setSale(res))
        .catch((error) =>
          console.log("Error while getting income by id", error)
        );
    }
    if (type === "expense") {
      getAllExpensesEntries()
        .then((res) => setExpenseEntries(res))
        .catch((error) => console.log("From App.js METHOD = GET: ", error));
      getExpenseById(id)
        .then((res) => setSale(res))
        .catch((error) =>
          console.log("Error while getting expense by id", error)
        );
    }
  }, []);

  const history = useHistory();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const salesRepId = 1;

  const onSubmit = (data) => {
    console.log(data);
    if (type === `/income/${id}`) {
      const initialValues = [...incomeEntries].filter((income) => {
        return income.id.toString() === id.toString();
      })[0];
      console.log(initialValues);
      initialValues.date = new Date(initialValues.date)
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
      console.log(initialValues);
      const name = ["amount_paid", "date", "card_id"];

      const identifier = name.filter((item) => {
        return initialValues[item].toString() !== data[item].toString() && item;
      });
      console.log(identifier);
      // const body = generateBody(identifier, data);
      const body = {};
      identifier.forEach((item) => {
        body[item] = data[item].toString();
      });
      console.log(body);
      if (Boolean(Object.keys(body).length)) {
        updateIncomeEntry(id, body)
          .then((res) => {
            history.push("/");
          })
          .catch((error) => console.log("From App.js METHOD = PUT", error));

        reset();
        // history.push("/");
      } else {
        alert("sale atleast one the fields");
      }
    }
    if (history.location.pathname === `/expense/${id}`) {
      const initialValues = [...expenseEntries].filter((expense) => {
        return expense.id.toString() === id.toString();
      })[0];
      initialValues.date = new Date(initialValues.date)
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");

      const name = ["amount_paid", "date", "description"];

      const identifier = name.filter((item) => {
        return initialValues[item].toString() !== data[item].toString() && item;
      });

      // const body = generateBody(identifier, data);
      const body = {};
      identifier.forEach((item) => {
        body[item] = data[item];
      });
      if (Boolean(Object.keys(body).length)) {
        updateExpenseEntry(id, body)
          .then((res) => {
            history.push("/");
          })
          .catch((error) => console.log("From App.js METHOD = PUT", error));

        reset();
        // history.push("/");
      } else {
        alert("Edit atleast one the fields");
      }
    }
  };
  return (
    <Layout>
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
                value: sale.card_id,
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
        <input
          className="block mb-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          type="date"
          defaultValue={new Date()
            .toLocaleDateString()
            .split("/")
            .reverse()
            .join("-")}
          {...register("date")}
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
    </Layout>
  );
};

export default EditSalesEntry;
