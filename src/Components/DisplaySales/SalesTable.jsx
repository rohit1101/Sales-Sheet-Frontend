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
      <table>
        <thead>
          {tabState.income ? (
            <tr>
              <th>Date</th>
              <th>Card ID</th>
              <th>Amount</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          ) : (
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Delete</th>
              <th>Edit</th>
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
