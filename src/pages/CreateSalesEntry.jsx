import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Form from "../Components/Forms/Form";
import Layout from "../Layout";
import NavBar from "../NavBar";
import SalesContext from "../SalesContext";
import {
  addExpenseEntry,
  addIncomeEntry,
  updateSalesEntry,
} from "../services/api";

const CreateSalesEntry = () => {
  const { incomeEntries, setIncomeEntries, expenseEntries, setExpenseEntries } =
    useContext(SalesContext);
  const {
    register,
    handleSubmit,
    // getValues,
    reset,
    formState: { errors },
  } = useForm();

  const history = useHistory();
  const { id } = useParams();

  const salesRepId = 1;
  // const initialValues = getValues(); // Values are undefined..
  const onSubmit = (data, e) => {
    // const { date, amount_paid, description, sales } = data;

    if (history.location.pathname === `/income/${id}`) {
      const initialValues = incomeEntries.filter((income) => {
        return income.id.toString() === id.toString();
      })[0];
      initialValues.date = new Date(initialValues.date)
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
      console.log(initialValues, data);
      const name = ["amount_paid", "date", "card_id"];

      const identifier = name.filter((item) => {
        return initialValues[item].toString() !== data[item].toString() && item;
      });
      console.log(identifier);
      const body = {};
      identifier.forEach((item) => {
        body[item] = data[item].toString();
      });
      console.log(body);
      const newState = [...incomeEntries].map((income) => {
        if (income.id.toString() === id.toString()) {
          return {
            ...income,
            ...body,
          };
        }
        return income;
      });
      console.log(newState);
      setIncomeEntries(newState);
      // updateSalesEntry(id, body)
      //   .then((res) => console.log(res))
      //   .catch((error) => console.log("From App.js METHOD = PUT", error));

      // reset();
      // history.push("/");
    }
    if (history.location.pathname === `/expense/${id}`) {
      const initialValues = expenseEntries.filter((expense) => {
        return expense.id.toString() === id.toString();
      })[0];
      initialValues.date = new Date(initialValues.date)
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
      console.log(initialValues, data);
      const name = ["amount_paid", "date", "description"];

      const identifier = name.filter((item) => {
        return initialValues[item].toString() !== data[item].toString() && item;
      });
      console.log(identifier);
      const body = {};
      identifier.forEach((item) => {
        body[item] = data[item].toString();
      });
      console.log(body);
      const newState = [...expenseEntries].map((expense) => {
        if (expense.id.toString() === id.toString()) {
          return {
            ...expense,
            ...body,
          };
        }
        return expense;
      });
      console.log(newState);
      setExpenseEntries(newState);
      // updateSalesEntry(id, body)
      //   .then((res) => console.log(res))
      //   .catch((error) => console.log("From App.js METHOD = PUT", error));

      // reset();
      // history.push("/");
    }

    if (history.location.pathname === "/expense") {
      const { amount_paid, date, description } = data;
      addExpenseEntry(salesRepId, amount_paid, date, description)
        .then((res) => setExpenseEntries([...expenseEntries, res]))
        .catch((error) => console.log("From App.js METHOD = POST", error));
      reset();
      history.push("/");
    }
    if (history.location.pathname === "/income") {
      const { card_id, amount_paid, date } = data;
      addIncomeEntry(card_id, salesRepId, amount_paid, date)
        .then((res) => setIncomeEntries([...incomeEntries, res]))
        .catch((error) => console.log("From App.js METHOD = POST", error));
      reset();
      history.push("/");
    }
  };

  return (
    <Layout>
      <NavBar />
      <div className="text-center">
        <Form
          type={
            history.location.pathname.includes("income") ? "income" : "expense"
          }
          edit={history.location.state !== undefined ? true : false}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          history={history}
          // dirtyFields={dirtyFields}
        />
      </div>
    </Layout>
  );
};

export default CreateSalesEntry;
