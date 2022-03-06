import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { addExpenseEntry, addIncomeEntry } from "../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Form, Input, Label, SubmitButton, Wrapper } from "./Login";
import "./AddSalesEntry.css";

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
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {type === "income" && (
          <>
            <Label>
              Card Number:
              <Input
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
            </Label>
          </>
        )}
        <Label className="block">
          Date
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
                // wrapperClassName="datepicker"
              />
            )}
          />
        </Label>

        <Label className="block">
          Amount
          <Input
            type="number"
            {...register("amount_paid", {
              required: "This field is required",
              valueAsNumber: true,
              validate: {
                positiveNumber: (value) => parseFloat(value) > 0,
              },
            })}
          />
          {errors.amount_paid &&
            errors.amount_paid.type === "positiveNumber" && (
              <p style={{ color: "red" }}>amount should be greater than 0</p>
            )}
          {errors.amount_paid && (
            <p style={{ color: "red" }}>{errors.amount_paid.message}</p>
          )}
        </Label>

        {type === "expense" && (
          <>
            <Label className="block">Description</Label>
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
        <SubmitButton type="submit">Add Income</SubmitButton>
        <SubmitButton type="button" onClick={() => history.push("/")}>
          Cancel
        </SubmitButton>
      </Form>
    </Wrapper>
  );
};

export default AddSalesEntry;
