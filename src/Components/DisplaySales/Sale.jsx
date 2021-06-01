import { useState } from "react";
import { deleteSalesEntry, updateSalesEntry } from "../../services/api";

const Sale = ({ sale, setSalesEntries, salesEntries }) => {
  const [editSale, setEditSale] = useState(sale.card_id);
  const [editState, setEditState] = useState(false);

  function updateSalesEntryHandler(id) {
    updateSalesEntry(id, editSale).then((result) => console.log(result));
    const newState = [...salesEntries].map((item) => {
      if (item.id === id) {
        item.card_id = editSale;
      }
      return item;
    });
    console.log(newState);
    setSalesEntries(newState);
    setEditState(false);
  }

  function removeSalesEntryHandler(id) {
    // use the result from promise with snackbar component
    deleteSalesEntry(id).then((result) => console.log(result));
    const newState = [...salesEntries].filter((item) => item.id !== id);
    setSalesEntries(newState);
  }

  return (
    <>
      {editState ? (
        <>
          <label className="block">Card Id</label>
          <input
            type="text"
            value={editSale}
            onChange={(e) => {
              setEditSale(e.target.value);
            }}
          />
          <label className="block">date</label>
          <input type="date" value={sale.date} />
          <label className="block">Amount</label>
          <input type="text" value={sale.amount_paid} />
          <button
            onClick={() => {
              setEditState(false);
              setEditSale(sale.card_id);
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
          <td className="border border-green-600">{sale.sales_rep_id}</td>
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

{
  /* <tr className="bg-yellow-200">
      <td className="border border-green-600">{sale.card_id}</td>
      <td className="border border-green-600">{sale.sales_rep_id}</td>
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
      <td onClick={updateSalesEntryHandler} style={{ cursor: "pointer" }}>
        &#x270D;
      </td>
    </tr> */
}
