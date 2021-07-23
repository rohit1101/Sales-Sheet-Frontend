import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Form from "../Components/Forms/Form";
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
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
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
  }, [history.location.pathname, id]);

  const {
    register,
    handleSubmit,
    setValue,
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
        body[item] = data[item];
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
        alert("Edit atleast one the fields");
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
        <Form
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
        />
      </div>
    </Layout>
  );
};

export default CreateSalesEntry;
