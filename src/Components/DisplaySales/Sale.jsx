import { useContext } from "react";
import { useHistory } from "react-router-dom";
import SalesContext from "../../SalesContext";
import { deleteExpenseEntry, deleteSalesEntry } from "../../services/api";

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
      deleteSalesEntry(id).then((result) => console.log(result));
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
              ? new Date(sale.date).toLocaleString()
              : new Date().toLocaleString()}
          </td>
          <td className="border border-green-600">
            {sale && sale.amount_paid}
          </td>
          <td
            className="border border-green-600"
            onClick={() => removeSalesEntryHandler(sale.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer block h-6 w-6 mx-auto stroke-current text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </td>
          <td
            className="cursor-pointer border border-green-600"
            onClick={() => {
              history.push(`/income/${sale.id}`, [sale]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer block h-6 w-6 mx-auto stroke-current text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </td>
        </tr>
      ) : (
        <tr className="bg-yellow-200">
          <td className="border border-green-600">
            {sale && sale.date
              ? new Date(sale.date).toLocaleString()
              : new Date().toLocaleString()}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer block h-6 w-6 mx-auto stroke-current text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </td>
          <td
            className="cursor-pointer border border-green-600"
            onClick={() => {
              history.push(`/expense/${sale.id}`, [sale]);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer block h-6 w-6 mx-auto stroke-current text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </td>
        </tr>
      )}
    </>
  );
};

export default Sale;
