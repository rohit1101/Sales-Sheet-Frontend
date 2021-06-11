import { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteSalesEntry, updateSalesEntry } from "../../services/api";

const Sale = ({ sale, setSalesEntries, salesEntries }) => {
  const [editState, setEditState] = useState(false);
  // const [editDataState, setEditDataState] = useState({
  //   date: false,
  //   amount_paid: false,
  //   description: false,
  // });
  // const [editIncomeOrExpense, setEditIncomeOrExpense] = useState({
  //   income: parseFloat(sale.amount_paid) > 0 ? true : false,
  //   expense: parseFloat(sale.amount_paid) < 0 ? true : false,
  // });

  // const [editData, setEditData] = useState({
  //   date: new Date(sale.date)
  //     .toLocaleDateString()
  //     .split("/")
  //     .reverse()
  //     .join("-"),
  //   amount_paid: sale.amount_paid,
  //   description: sale.description,
  // });

  const {
    register,
    watch,
    reset,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm({
    defaultValues: {
      sales: parseFloat(sale.amount_paid) < 0 ? "expense" : "income",
      amount_paid: parseFloat(sale.amount_paid),
      description: parseFloat(sale.amount_paid) < 0 ? sale.description : "NIL",
      id: sale.id,
    },
  });
  const watchRadio = watch("sales");

  function updateSalesEntryHandler(id) {
    const editFormData = getValues();
    console.log(editFormData);
    const { date, amount_paid, description } = editFormData;

    const newState = [...salesEntries].map((item) => {
      if (
        item.id === id &&
        dirtyFields.date &&
        dirtyFields.amount_paid &&
        dirtyFields.description
      ) {
        item.date = date;
        item.amount_paid = amount_paid;
        item.description = description;
        updateSalesEntry(id, {
          date: date,
          amount_paid: amount_paid,
          description: description,
        }).then((result) => console.log(result));
        console.log("FE: inside both");
      } else if (
        item.id === id &&
        dirtyFields.date &&
        dirtyFields.amount_paid
      ) {
        item.date = date;
        item.amount_paid = amount_paid;
        if (parseFloat(amount_paid) > 0) {
          item.description = "NIL";
        } else {
          item.description = description;
        }
        updateSalesEntry(id, {
          date: date,
          amount_paid: amount_paid,
          description: item.description,
        }).then((result) => console.log(result));
        console.log("FE: inside both");
      } else if (
        item.id === id &&
        dirtyFields.amount_paid &&
        dirtyFields.description
      ) {
        item.amount_paid = amount_paid;
        if (parseFloat(amount_paid) > 0) {
          item.description = "NIL";
        } else {
          item.description = description;
        }
        updateSalesEntry(id, {
          amount_paid: amount_paid,
          description: item.description,
        }).then((result) => console.log(result));
        console.log("FE: inside both");
      } else if (
        item.id === id &&
        dirtyFields.date &&
        dirtyFields.description
      ) {
        item.date = date;
        item.description = description;
        updateSalesEntry(id, {
          date: date,
          description: description,
        }).then((result) => console.log(result));
        console.log("FE: inside both");
      } else if (item.id === id && dirtyFields.amount_paid) {
        item.amount_paid = amount_paid;
        if (parseFloat(amount_paid) > 0) {
          item.description = "NIL";
        } else {
          item.description = description;
        }
        updateSalesEntry(id, {
          amount_paid: amount_paid,
          description: item.description,
        }).then((result) => console.log(result));
        console.log("FE: inside amount");
      } else if (item.id === id && dirtyFields.date) {
        item.date = date;
        updateSalesEntry(id, { date: date }).then((result) =>
          console.log(result)
        );
        console.log("FE: inside date");
      } else if (item.id === id && dirtyFields.description) {
        item.description = description;
        updateSalesEntry(id, { description: description }).then((result) =>
          console.log(result)
        );
        console.log("FE: inside description");
      }
      return item;
    });
    console.log(newState);
    // setSalesEntries(newState);
    reset();
    setEditState(false);
  }

  function removeSalesEntryHandler(id) {
    // use the result from promise with snackbar component
    deleteSalesEntry(id).then((result) => console.log(result));
    const newState = [...salesEntries].filter((item) => item.id !== id);
    setSalesEntries(newState);
  }

  console.log(errors, dirtyFields);
  return (
    <>
      {editState ? (
        <>
          {/* <form onSubmit={handleSubmit}></form> */}
          <label className="block">Date</label>
          <input
            className="block mb-2"
            type="date"
            {...register("date", {
              value: new Date(sale.date)
                .toLocaleDateString()
                .split("/")
                .reverse()
                .join("-"),
            })}
          />

          <label className="px-2">
            <input
              {...register("sales", {
                required: "Choose any one type",
              })}
              type="radio"
              id="income"
              value="income" // checked={incomeOrExpense.income}
            />{" "}
            Income
          </label>

          <label className="px-2">
            <input
              {...register("sales", {
                required: "Choose any one type",
              })}
              type="radio"
              id="expense"
              value="expense"

              // checked={incomeOrExpense.expense}
              // onChange={handleIncomeOrExpense}
            />{" "}
            Expense
          </label>
          {errors.sales && <p>{errors.sales.message}</p>}
          <label className="block">Amount</label>
          <input
            className="block mb-2"
            type="number"
            {...register("amount_paid", {
              required: "This field is required!",
              valueAsNumber: true,
            })}
            // onChange={(e) => setAmount(e.target.value)}
          />
          {errors.amount_paid && <p>{errors.amount_paid.message}</p>}

          {watchRadio === "expense" ? (
            <>
              <label className="block">Description</label>
              <input
                className="block mb-2"
                {...register("description", {
                  required: "This field is required!",
                })}
                // onChange={(e) => setAmount(e.target.value)}
              />
              {errors.description && <p>{errors.description.message}</p>}
            </>
          ) : null}

          <button
            onClick={() => {
              reset();
              setEditState(false);
            }}
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              updateSalesEntryHandler(sale.id);
            }}
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          >
            Save Changes
          </button>
        </>
      ) : (
        <tr className="bg-yellow-200">
          <td className="border border-green-600">{sale.card_id}</td>
          <td className="border border-green-600">
            {sale.date
              ? new Date(sale.date).toLocaleString()
              : new Date().toLocaleString()}
          </td>
          <td className="border border-green-600">{sale.amount_paid}</td>
          <td
            onClick={() => removeSalesEntryHandler(sale.id)}
            style={{ cursor: "pointer" }}
          >
            &#x2715;
          </td>
          <td onClick={() => setEditState(true)} style={{ cursor: "pointer" }}>
            &#x270D;
          </td>
        </tr>
      )}
    </>
  );
};

export default Sale;
