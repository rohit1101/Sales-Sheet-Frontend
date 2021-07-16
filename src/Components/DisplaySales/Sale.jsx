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
              history.push({
                pathname: `/income/${sale.id}`,
                state: JSON.stringify({
                  sale,
                  incomeEntries,
                  // setIncomeEntries: setExpenseEntries,
                  expenseEntries,
                  // setExpenseEntries: setExpenseEntries,
                }),
              });
            }}
          >
            <Icons type="edit" />
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
              history.push({
                pathname: `/expense/${sale.id}`,
                state: JSON.stringify({
                  sale,
                  incomeEntries,
                  // setIncomeEntries: setIncomeEntries,
                  expenseEntries,
                  // setExpenseEntries: setExpenseEntries,
                }),
              });
            }}
          >
            <Icons type="edit" />
          </td>
        </tr>
      )}
    </>
  );
};

export default Sale;
