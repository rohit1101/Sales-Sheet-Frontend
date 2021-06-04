import { useState } from "react";
import { deleteSalesEntry, updateSalesEntry } from "../../services/api";

const Sale = ({ sale, setSalesEntries, salesEntries }) => {
  // const [editDate, setEditDate] = useState(
  //   new Date(sale.date).toLocaleDateString().split("/").reverse().join("-")
  // );
  const [editState, setEditState] = useState(false);
  const [editDataState, setEditDataState] = useState({
    date: false,
    amount_paid: false,
  });
  const [editData, setEditData] = useState({
    date: new Date(sale.date)
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-"),
    amount_paid: sale.amount_paid,
  });
  // const [saveBtn, setSaveBtn] = useState(true);

  function updateSalesEntryHandler(id) {
    const newState = [...salesEntries].map((item) => {
      if (item.id === id && editDataState.date && editDataState.amount_paid) {
        item.date = editData.date;
        item.amount_paid = editData.amount_paid;
        updateSalesEntry(id, {
          date: editData.date,
          amount_paid: editData.amount_paid,
        }).then((result) => console.log(result));
        console.log("FE: inside both");
      } else if (item.id === id && editDataState.amount_paid) {
        item.amount_paid = editData.amount_paid;
        updateSalesEntry(id, { amount_paid: editData.amount_paid }).then(
          (result) => console.log(result)
        );
        console.log("FE: inside amount");
      } else if (item.id === id && editDataState.date) {
        item.date = editData.date;
        updateSalesEntry(id, { date: editData.date }).then((result) =>
          console.log(result)
        );
        console.log("FE: inside date");
      }
      return item;
    });
    console.log(newState);
    setEditDataState({
      amount_paid: false,
      date: false,
    });
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
          <input type="text" value={sale.card_id} />
          <label className="block">date</label>
          <input
            type="date"
            value={editData.date}
            onChange={(e) => {
              // setSaveBtn(false);
              setEditDataState({
                ...editDataState,
                date: true,
              });
              const newDate = e.target.value.split("/").reverse().join("-");
              setEditData({
                ...editData,
                date: newDate,
              });
            }}
          />
          <label className="block">Amount</label>
          <input
            type="text"
            value={editData.amount_paid}
            onChange={(e) => {
              // setSaveBtn(false);
              setEditDataState({
                ...editDataState,
                amount_paid: true,
              });
              const newAmount = e.target.value;
              setEditData({
                ...editData,
                amount_paid: newAmount,
              });
            }}
          />
          <button
            onClick={() => {
              setEditState(false);
              setEditDataState({
                amount_paid: false,
                date: false,
              });
              // setEditAmount(sale.amount_paid);
              // setEditDate(sale.date);
            }}
            className="block my-2 min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          >
            Cancel
          </button>
          <button
            // disabled={saveBtn}
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
