import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Form from "../Components/Forms/Form";
import Layout from "../Layout";
import NavBar from "../NavBar";
import SalesContext from "../SalesContext";
import { addSalesEntry } from "../services/api";

const CreateSalesEntry = () => {
  const { incomeEntries, setIncomeEntries } = useContext(SalesContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const history = useHistory();

  const salesRepId = 1;

  const onSubmit = (data, e) => {
    console.log(data);
    const { card_id, amount_paid, date } = data;
    addSalesEntry(card_id, salesRepId, amount_paid, date)
      .then((res) => setIncomeEntries([...incomeEntries, res]))
      .catch((error) => console.log("From App.js METHOD = POST", error));
    reset();
    history.push("/");
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
        />
      </div>
    </Layout>
  );
};

export default CreateSalesEntry;
