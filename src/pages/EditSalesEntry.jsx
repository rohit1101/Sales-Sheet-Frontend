import React from "react";

const EditSalesEntry = ({ type }) => {
  //   const onSubmit = (data) => {
  //     console.log(data);
  //     if (type === `/income/${id}`) {
  //       const initialValues = [...incomeEntries].filter((income) => {
  //         return income.id.toString() === id.toString();
  //       })[0];
  //       console.log(initialValues);
  //       initialValues.date = new Date(initialValues.date)
  //         .toLocaleDateString()
  //         .split("/")
  //         .reverse()
  //         .join("-");
  //       console.log(initialValues);
  //       const name = ["amount_paid", "date", "card_id"];

  //       const identifier = name.filter((item) => {
  //         return initialValues[item].toString() !== data[item].toString() && item;
  //       });
  //       console.log(identifier);
  //       // const body = generateBody(identifier, data);
  //       const body = {};
  //       identifier.forEach((item) => {
  //         body[item] = data[item].toString();
  //       });
  //       console.log(body);
  //       if (Boolean(Object.keys(body).length)) {
  //         updateIncomeEntry(id, body)
  //           .then((res) => {
  //             history.push("/");
  //           })
  //           .catch((error) => console.log("From App.js METHOD = PUT", error));

  //         reset();
  //         // history.push("/");
  //       } else {
  //         alert("sale atleast one the fields");
  //       }
  //     }
  //     if (history.location.pathname === `/expense/${id}`) {
  //       const initialValues = [...expenseEntries].filter((expense) => {
  //         return expense.id.toString() === id.toString();
  //       })[0];
  //       initialValues.date = new Date(initialValues.date)
  //         .toLocaleDateString()
  //         .split("/")
  //         .reverse()
  //         .join("-");

  //       const name = ["amount_paid", "date", "description"];

  //       const identifier = name.filter((item) => {
  //         return initialValues[item].toString() !== data[item].toString() && item;
  //       });

  //       // const body = generateBody(identifier, data);
  //       const body = {};
  //       identifier.forEach((item) => {
  //         body[item] = data[item];
  //       });
  //       if (Boolean(Object.keys(body).length)) {
  //         updateExpenseEntry(id, body)
  //           .then((res) => {
  //             history.push("/");
  //           })
  //           .catch((error) => console.log("From App.js METHOD = PUT", error));

  //         reset();
  //         // history.push("/");
  //       } else {
  //         alert("Edit atleast one the fields");
  //       }
  //     }
  //   };
  return <div>From edit {type} form</div>;
};

export default EditSalesEntry;
