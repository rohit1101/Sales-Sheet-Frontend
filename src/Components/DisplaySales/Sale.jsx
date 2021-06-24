import { useContext } from "react";
import { useHistory } from "react-router-dom";
import SalesContext from "../../SalesContext";
import { deleteExpenseEntry, deleteIncomeEntry } from "../../services/api";
import Icons from "../Icons";

const Sale = ({ sale }) => {
  const history = useHistory();
  const {
    tabState,
    incomeEntries,
    setIncomeEntries,
    expenseEntries,
    setExpenseEntries,
  } = useContext(SalesContext);

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
      {tabState.income ? (
        <tr className="bg-yellow-200">
          <td className="border border-green-600">{sale && sale.card_id}</td>
          <td className="border border-green-600">
            {sale && sale.date
              ? new Date(sale.date).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </td>
          <td className="border border-green-600">
            {sale && sale.amount_paid}
          </td>
          <td
            className="border border-green-600"
            onClick={() => removeSalesEntryHandler(sale.id)}
          >
            <Icons type="delete" />
          </td>
          <td
            className="cursor-pointer border border-green-600"
            onClick={() => {
              history.push(`/income/${sale.id}`, [sale]);
            }}
          >
            <Icons />
          </td>
        </tr>
      ) : (
        <tr className="bg-yellow-200">
          <td className="border border-green-600">
            {sale && sale.date
              ? new Date(sale.date).toLocaleDateString()
              : new Date().toLocaleDateString()}
          </td>
          <td className="border border-green-600">
            {sale && sale.amount_paid}
          </td>
          <td className="border border-green-600">
            {sale && sale.description}
          </td>
          <td
            className="border border-green-600"
            onClick={() => removeSalesEntryHandler(sale.id)}
          >
            <Icons type="delete" />
          </td>
          <td
            className="cursor-pointer border border-green-600"
            onClick={() => {
              history.push(`/expense/${sale.id}`, [sale]);
            }}
          >
            <Icons />
          </td>
        </tr>
      )}
    </>
  );
};

export default Sale;
