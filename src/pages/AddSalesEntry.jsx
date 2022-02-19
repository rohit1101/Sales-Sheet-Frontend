import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { addExpenseEntry, addIncomeEntry } from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const AddSalesEntry = ({ type }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const salesRepId = 1;

  const history = useHistory();
  const saleDate = watch("saleDate");
  const onSubmit = (data) => {
    const formattedDate = format(data.saleDate, "yyyy-MM-dd");
    const formData = {
      ...data,
      date: formattedDate,
    };

    if (history.location.pathname === "/expense") {
      const { amount_paid, date, description } = formData;

      addExpenseEntry(salesRepId, amount_paid, date, description)
        .then((res) => history.push("/"))
        .catch((error) => console.log("From App.js METHOD = POST", error));

      reset();
    }
    if (history.location.pathname === "/income") {
      const { card_id, amount_paid, date } = formData;

      addIncomeEntry(card_id, salesRepId, amount_paid, date)
        .then((res) => history.push("/"))
        .catch((error) => console.log("From App.js METHOD = POST", error));

      reset();
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="inline-block text-left"
      >
        {type === "income" && (
          <>
            <label className="block">Card Number</label>
            <input
              className="shadow-xl  focus:outline-none focus:ring-2 focus:ring-purple-300"
              type="number"
              {...register("card_id", {
                required: "This field is required!",
                valueAsNumber: true,
                validate: {
                  positiveNumber: (value) => parseFloat(value) > 0,
                },
              })}
            />
            {errors.card_id && errors.card_id.type === "positiveNumber" && (
              <p style={{ color: "red" }}>Card ID is invalid</p>
            )}

            {errors.card_id && (
              <p style={{ color: "red" }}>{errors.card_id.message}</p>
            )}
          </>
        )}
        <label className="block">Date</label>
        <Controller
          name="saleDate"
          control={control}
          required
          defaultValue={new Date()}
          render={({ field }) => (
            <DatePicker
              placeholderText="Enter sale date"
              onChange={(e) => field.onChange(e)}
              selected={
                saleDate?.value ? new Date(saleDate.value) : field.value
              }
              dateFormat="dd/MM/yyyy"
            />
          )}
        />
        <label className="block">Amount</label>
        <input
          className="block mb-2 shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
          type="number"
          {...register("amount_paid", {
            required: "This field is required",
            valueAsNumber: true,
            validate: {
              positiveNumber: (value) => parseFloat(value) > 0,
            },
          })}
        />
        {errors.amount_paid && errors.amount_paid.type === "positiveNumber" && (
          <p style={{ color: "red" }}>amount should be greater than 0</p>
        )}

        {errors.amount_paid && (
          <p style={{ color: "red" }}>{errors.amount_paid.message}</p>
        )}

        {type === "expense" && (
          <>
            <label className="block">Description</label>
            <input
              className="block mb-2 shadow-xl"
              {...register("description", {
                validate: (value) => value.trim().length > 0,
              })}
            />
            {errors.description && (
              <p style={{ color: "red" }}>This field is required</p>
            )}
          </>
        )}
        <input
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
    </div>
  );
};

export default AddSalesEntry;
