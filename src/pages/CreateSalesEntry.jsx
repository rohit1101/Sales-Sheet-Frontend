import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Form from "../Components/Forms/Form";
import Layout from "../Layout";
import NavBar from "../NavBar";
import { addSalesEntry } from "../services/api";

const CreateSalesEntry = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const watchAmount = watch("amount_paid");
  const [salesEntries, setSalesEntries] = useState([]);
  const salesRepId = 1;

  const onSubmit = (data, e) => {
    console.log(data);
    // const { card_id, amount_paid, description, date, sales } = data;
    // addSalesEntry(
    //   card_id,
    //   salesRepId,
    //   sales === "income" ? amount_paid : -amount_paid,
    //   date,
    //   description ? description : "NIL"
    // )
    //   .then((res) => {
    //     setSalesEntries([...salesEntries, res]);
    //   })
    //   .catch((error) => console.log("From App.js METHOD = POST", error));
    // reset();
    // history.push("/");
  };

  return (
    <Layout>
      <NavBar />
      <div className="text-center">
        <Form
          type={history.location.pathname === "/income" ? "income" : "expense"}
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
