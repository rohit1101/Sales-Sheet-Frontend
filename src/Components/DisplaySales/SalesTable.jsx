import Sale from "./Sale";

const SalesTable = ({
  incomeEntries,
  expenseEntries,
  tabState,
  setIncomeEntries,
  setExpenseEntries,
}) => {
  return (
    <>
      <table className="w-full my-4 bg-green-200 border-collapse border-2 border-green-800">
        <thead>
          {tabState.income ? (
            <tr>
              <th className="border border-green-600">Date</th>
              <th className="border border-green-600">Card ID</th>
              <th className="border border-green-600">Amount</th>
              <th className="border border-green-600">Delete</th>
              <th className="border border-green-600">Edit</th>
            </tr>
          ) : (
            <tr>
              <th className="border border-green-600">Date</th>
              <th className="border border-green-600">Description</th>
              <th className="border border-green-600">Amount</th>
              <th className="border border-green-600">Delete</th>
              <th className="border border-green-600">Edit</th>
            </tr>
          )}
        </thead>
        <tbody>
          {tabState.income ? (
            incomeEntries.length ? (
              incomeEntries.map((sale) => (
                <Sale
                  sale={sale}
                  key={sale.id}
                  tabState={tabState}
                  incomeEntries={incomeEntries}
                  setIncomeEntries={setIncomeEntries}
                  expenseEntries={expenseEntries}
                  setExpenseEntries={setExpenseEntries}
                />
              ))
            ) : (
              <tr>
                <td>No sales</td>
              </tr>
            )
          ) : expenseEntries.length ? (
            expenseEntries.map((sale) => (
              <Sale
                sale={sale}
                key={sale.id}
                tabState={tabState}
                incomeEntries={incomeEntries}
                setIncomeEntries={setIncomeEntries}
                expenseEntries={expenseEntries}
                setExpenseEntries={setExpenseEntries}
              />
            ))
          ) : (
            <tr>
              <td>No sales</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default SalesTable;
