import { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteSalesEntry, updateSalesEntry } from "../../services/api";

const Sale = ({ sale, setSalesEntries, salesEntries }) => {
  const [editState, setEditState] = useState(false);
  const [editDataState, setEditDataState] = useState({
    date: false,
    amount_paid: false,
    description: false,
  });
  const [editIncomeOrExpense, setEditIncomeOrExpense] = useState({
    income: parseFloat(sale.amount_paid) > 0 ? true : false,
    expense: parseFloat(sale.amount_paid) < 0 ? true : false,
  });

  const [editData, setEditData] = useState({
    date: new Date(sale.date)
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-"),
    amount_paid: sale.amount_paid,
    description: sale.description,
  });

  const {
    register,
    watch,
    formState: { errors },
  } = useForm();
  const watchRadio = watch("sales");

  function updateSalesEntryHandler(id) {
    const { date, amount_paid, description } = editDataState;
    const newState = [...salesEntries].map((item) => {
      if (item.id === id && date && amount_paid && description) {
        item.date = editData.date;
        item.amount_paid = editData.amount_paid;
        item.description = editData.description;
        updateSalesEntry(id, {
          date: editData.date,
          amount_paid: editData.amount_paid,
          description: editData.description,
        }).then((result) => console.log(result));
        console.log("FE: inside both");
      } else if (item.id === id && date && amount_paid) {
        item.date = editData.date;
        item.amount_paid = editData.amount_paid;
        if (parseFloat(editData.amount_paid) > 0) {
          item.description = "NIL";
        } else {
          item.description = editData.description;
        }
        updateSalesEntry(id, {
          date: editData.date,
          amount_paid: editData.amount_paid,
          description: item.description,
        }).then((result) => console.log(result));
        console.log("FE: inside both");
      } else if (item.id === id && amount_paid && description) {
        item.amount_paid = editData.amount_paid;
        if (parseFloat(editData.amount_paid) > 0) {
          item.description = "NIL";
        } else {
          item.description = editData.description;
        }
        updateSalesEntry(id, {
          amount_paid: editData.amount_paid,
          description: item.description,
        }).then((result) => console.log(result));
        console.log("FE: inside both");
      } else if (item.id === id && date && description) {
        item.date = editData.date;
        item.description = editData.description;
        updateSalesEntry(id, {
          date: editData.date,
          description: editData.description,
        }).then((result) => console.log(result));
        console.log("FE: inside both");
      } else if (item.id === id && amount_paid) {
        item.amount_paid = editData.amount_paid;
        if (parseFloat(editData.amount_paid) > 0) {
          item.description = "NIL";
        } else {
          item.description = editData.description;
        }
        updateSalesEntry(id, {
          amount_paid: editData.amount_paid,
          description: item.description,
        }).then((result) => console.log(result));
        console.log("FE: inside amount");
      } else if (item.id === id && date) {
        item.date = editData.date;
        updateSalesEntry(id, { date: editData.date }).then((result) =>
          console.log(result)
        );
        console.log("FE: inside date");
      } else if (item.id === id && description) {
        item.description = editData.description;
        updateSalesEntry(id, { description: editData.description }).then(
          (result) => console.log(result)
        );
        console.log("FE: inside description");
      }
      return item;
    });
    console.log(newState);
    setEditDataState({
      amount_paid: false,
      date: false,
      description: false,
    });
    // setEditIncomeOrExpense({
    //   income: false,
    //   expense: false,
    // });
    setSalesEntries(newState);
    setEditState(false);
  }

  function removeSalesEntryHandler(id) {
    // use the result from promise with snackbar component
    deleteSalesEntry(id).then((result) => console.log(result));
    const newState = [...salesEntries].filter((item) => item.id !== id);
    setSalesEntries(newState);
  }

  function handleEditIncomeOrExpense(e) {
    setEditIncomeOrExpense({
      ...editIncomeOrExpense,
      [e.target.name]: e.target.checked,
    });
  }

  return (
    <>
      {editState ? (
        <>
          <label className="block">Date</label>
          <input
            className="block mb-2"
            type="date"
            {...register("date", {
              value: new Date()
                .toLocaleDateString()
                .split("/")
                .reverse()
                .join("-"),
              // valueAsDate: true,
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
              setEditState(false);
              setEditDataState({
                amount_paid: false,
                date: false,
                description: false,
              });
              setEditIncomeOrExpense({
                income: false,
                expense: false,
              });
            }}
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              updateSalesEntryHandler(sale.id);
            }}
            className={
              editDataState.date ||
              editDataState.amount_paid ||
              editDataState.description
                ? "block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
                : "opacity-40 block my-2 min-w-full bg-purple-300 text-purple-600 font-normal rounded-md px-2 py-1 shadow-2xl"
            }
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
