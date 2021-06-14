import { useState } from "react";
import { useForm } from "react-hook-form";
import { deleteSalesEntry, updateSalesEntry } from "../../services/api";

const Sale = ({ sale, setSalesEntries, salesEntries }) => {
  const [editState, setEditState] = useState(false);

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sales: parseFloat(sale.amount_paid) < 0 ? "expense" : "income",
      amount_paid: parseFloat(sale.amount_paid),
      description: parseFloat(sale.amount_paid) < 0 ? sale.description : "NIL",
      id: sale.id,
    },
  });
  const watchRadio = watch("sales");

  function updateSalesEntryHandler(data) {
    const { date, amount_paid, description, sales } = data;
    // const amt = sales === "income" ? amount_paid : -amount_paid;

    setEditState(false);
    console.log(data);
    // reset();
    // reset({
    //   date, amount_paid, description, sales
    // }, { keepDefaultValues: false, keepDirty: false });
  }

  function removeSalesEntryHandler(id) {
    // use the result from promise with snackbar component
    deleteSalesEntry(id).then((result) => console.log(result));
    const newState = [...salesEntries].filter((item) => item.id !== id);
    setSalesEntries(newState);
  }

  // const condition = Object.values(dirtyFields).length === 0 ? true : false;

  console.log(errors);
  return (
    <>
      {editState ? (
        <form onSubmit={handleSubmit(updateSalesEntryHandler)}>
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
              value="income"
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

          <input
            type="submit"
            // disabled={condition}
            value="Save Changes"
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
            // condition
            // ? "cursor-not-allowed opacity-40 block my-2 min-w-full bg-purple-300 text-purple-600 font-normal rounded-md px-2 py-1 shadow-2xl"
          />
        </form>
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
