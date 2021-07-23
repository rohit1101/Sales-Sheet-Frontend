import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../Layout";
import NavBar from "../NavBar";

import {
  addExpenseEntry,
  addIncomeEntry,
  getAllExpensesEntries,
  getAllIncomeEntries,
  getExpenseById,
  getIncomeById,
  updateExpenseEntry,
  updateIncomeEntry,
} from "../services/api";

const CreateSalesEntry = () => {
  const [incomeEntries, setIncomeEntries] = useState([]);
  const [expenseEntries, setExpenseEntries] = useState([]);
  const [sale, setSale] = useState({});
  const [type, setType] = useState("");
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    history.location.pathname.includes("income")
      ? setType("income")
      : setType("expense");

    if (history.location.pathname === `/income/${id}`) {
      getIncomeById(id)
        .then((res) => setSale(res))
        .catch((error) =>
          console.log("error while getting income by id", error)
        );
      getAllIncomeEntries()
        .then((res) => setIncomeEntries(res))
        .catch((error) => console.log("From App.js METHOD = GET: ", error));
    }
    if (history.location.pathname === `/expense/${id}`) {
      getExpenseById(id)
        .then((res) => setSale(res))
        .catch((error) =>
          console.log("error while getting income by id", error)
        );
      getAllExpensesEntries()
        .then((res) => setExpenseEntries(res))
        .catch((error) => console.log("From METHOD = GET: ", error));
    }
    // return () => {
    //   setIncomeEntries([]);
    //   setExpenseEntries([]);
    //   setSale({});
    // };
  }, []);

  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const salesRepId = 1;

  const generateBody = (identifier, data) => {
    const body = {};
    identifier.forEach((item) => {
      body[item] = data[item];
    });
    return body;
  };

  const onSubmit = (data, e) => {
    console.log(data);
    if (history.location.pathname === `/income/${id}`) {
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

    if (history.location.pathname === "/expense") {
      const { amount_paid, date, description } = data;

      addExpenseEntry(salesRepId, amount_paid, date, description)
        .then((res) => {
          history.push("/");
        })
        .catch((error) => console.log("From App.js METHOD = POST", error));
      reset();
      // history.push("/");
    }
    if (history.location.pathname === "/income") {
      const { card_id, amount_paid, date } = data;

      addIncomeEntry(card_id, salesRepId, amount_paid, date)
        .then((res) => {
          history.push("/");
        })
        .catch((error) => console.log("From App.js METHOD = POST", error));
      reset();
      // history.push("/");
    }
  };
  console.log("re-render in createsales");
  return (
    <Layout>
      <NavBar />
      <div className="text-center">
        {/* <Form
          type={
            history.location.pathname.includes("income") ? "income" : "expense"
          }
          edit={Object.keys(sale).length > 0 ? true : false}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          sale={sale}
          setValue={setValue}
        /> */}
        <>
          {type === "income" ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="inline-block text-left"
            >
              <label className="block">Card Number</label>
              <input
                className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300"
                defaultValue={sale && sale.card_id}
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
                defaultValue={sale && sale.amount_paid}
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

              {sale ? (
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
              {sale ? (
                <input
                  className="block mb-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
                  type="date"
                  {...register("date", {
                    value:
                      sale &&
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
                defaultValue={sale && sale.amount_paid}
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
                defaultValue={sale && sale.description}
                {...register("description", {
                  validate: (value) => value.trim().length > 0,
                })}
              />
              {errors.description && (
                <p style={{ color: "red" }}>This field is required</p>
              )}

              <input
                // disabled={sale ? true : false}
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
      </div>
    </Layout>
  );
};

export default CreateSalesEntry;
