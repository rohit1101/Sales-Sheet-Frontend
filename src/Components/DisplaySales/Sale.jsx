import { useHistory } from "react-router-dom";
import { deleteSalesEntry } from "../../services/api";

const Sale = ({ sale, setIncomeEntries, incomeEntries }) => {
  const history = useHistory();

  function removeSalesEntryHandler(id) {
    // use the result from promise with snackbar component
    deleteSalesEntry(id).then((result) => console.log(result));
    const newState = [...incomeEntries].filter((item) => item.id !== id);
    setIncomeEntries(newState);
  }

  return (
    <>
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
        <td
          onClick={() => {
            history.push(`/income/${sale.id}`, [sale]);
          }}
          style={{ cursor: "pointer" }}
        >
          &#x270D;
        </td>
      </tr>
    </>
  );
};

export default Sale;
