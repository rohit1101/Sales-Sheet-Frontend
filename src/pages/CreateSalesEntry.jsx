import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Form from "../Components/Forms/Form";
import Layout from "../Layout";
import NavBar from "../NavBar";

import {
  addExpenseEntry,
  addIncomeEntry,
  updateExpenseEntry,
  updateIncomeEntry,
} from "../services/api";

const CreateSalesEntry = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });
  const history = useHistory();

  const { incomeEntries, expenseEntries, sale } =
    history.location && JSON.parse(history.location.state);
  const { id } = useParams();

  const salesRepId = 1;

  const generateBody = (identifier, data) => {
    const body = {};
    identifier.forEach((item) => {
      body[item] = data[item].toString();
    });
    return body;
  };

  const onSubmit = (data, e) => {
    if (history.location.pathname === `/income/${id}`) {
      const initialValues = [...incomeEntries].filter((income) => {
        return income.id.toString() === id.toString();
      })[0];

      initialValues.date = new Date(initialValues.date)
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");

      console.log("initial", initialValues, "edit form data", data);
      const name = ["amount_paid", "date", "card_id"];

      const identifier = name.filter((item) => {
        return initialValues[item].toString() !== data[item].toString() && item;
      });
      console.log(identifier);

      const body = generateBody(identifier, data);
      // identifier.forEach((item) => {
      //   body[item] = data[item].toString();
      // });
      console.log(body);

      if (Boolean(Object.keys(body).length)) {
        const newState = [...incomeEntries].map((income) => {
          if (income.id.toString() === id.toString()) {
            console.log({
              ...income,
              ...body,
            });
            return {
              ...income,
              ...body,
            };
          }
          return income;
        });
        console.log(newState);
        // setIncomeEntries(newState);
        updateIncomeEntry(id, body)
          .then((res) => {
            console.log(res);
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
      if (Boolean(Object.keys(body).length)) {
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
        // setExpenseEntries(newState);
        updateExpenseEntry(id, body)
          .then((res) => {
            console.log(res);
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
          // setExpenseEntries([...expenseEntries, res])
          console.log(res);
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
          // setIncomeEntries([...incomeEntries, res])
          console.log(res);
          history.push("/");
        })
        .catch((error) => console.log("From App.js METHOD = POST", error));
      reset();
      // history.push("/");
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
          edit={sale !== undefined ? true : false}
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
