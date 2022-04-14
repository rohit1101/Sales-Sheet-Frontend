import { format, formatISO } from "date-fns";
import { useHistory } from "react-router-dom";
import { deleteExpenseEntry, deleteIncomeEntry } from "../../services/api";
import Icons from "../Icons";

const Sale = ({
  sale,
  tabState,
  incomeEntries,
  setIncomeEntries,
  expenseEntries,
  setExpenseEntries,
}) => {
  const history = useHistory();

  function removeSalesEntryHandler(id) {
    // use the result from promise with snackbar component
    if (tabState.income) {
      deleteIncomeEntry(id).then((result) => console.log(result));
      const newState = [...incomeEntries].filter((item) => item.id !== id);
      setIncomeEntries(newState);
    }
    if (tabState.expense) {
      deleteExpenseEntry(id).then((result) => console.log(result));
      const newState = [...expenseEntries].filter((item) => item.id !== id);
      setExpenseEntries(newState);
    }
  }

  return (
    <>
      <tr>
        <td>
          {sale && sale.date
            ? format(new Date(sale.date), "dd/MM/yyyy")
            : new Date().toLocaleDateString()}
        </td>
        {tabState.income ? (
          <td>{sale && sale.card_id}</td>
        ) : (
          <td>{sale && sale.description}</td>
        )}

        <td>{sale && sale.amount_paid}</td>
        <td onClick={() => removeSalesEntryHandler(sale.id)}>
          <Icons type="delete" />
        </td>

        {tabState.income ? (
          <td
            onClick={() => {
              history.push(`/income/${sale.id}`);
            }}
          >
            <Icons type="edit" />
          </td>
        ) : (
          <td
            onClick={() => {
              history.push(`/expense/${sale.id}`);
            }}
          >
            <Icons type="edit" />
          </td>
        )}
      </tr>
    </>
  );
};

export default Sale;
