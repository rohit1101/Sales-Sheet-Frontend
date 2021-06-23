import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import SalesTable from "./Components/DisplaySales/SalesTable";
// import FilterByCardId from "./Components/FilterSales/FilterByCardId";
// import FilterByDate from "./Components/FilterSales/FilterByDate";
// import FilterByDateRange from "./Components/FilterSales/FilterByDateRange";
import Layout from "./Layout";
import SalesContext from "./SalesContext";
// import { filterSales } from "./services/api";

function App() {
  const history = useHistory();
  const { tabState, setTabState } = useContext(SalesContext);
  // const [filterBy, setFilterBy] = useState("");
  // const [filterData, setFilterData] = useState([]);
  // const [dateFilter, setDateFilter] = useState({
  //   startDate: "",
  //   endDate: "",
  // });
  // const salesRepId = 1;

  // function handleFilterRequest(filterValue) {
  //   if (typeof filterValue === "object") {
  //     filterSales(filterValue)
  //       .then((res) => setFilterData(res))
  //       .catch((e) => console.log("Error e", e));
  //   } else {
  //     filterSales(filterValue)
  //       .then((res) => setFilterData(res))
  //       .catch((e) => console.log("Error e", e));
  //   }
  // }

  // function handleFilterChange(e) {
  //   if (e.target.value === "date" || e.target.value === "card_id") {
  //     setFilterBy(e.target.value);
  //     handleFilterRequest(e.target.value);
  //   } else if (e.target.value === "date_range") {
  //     setFilterBy(e.target.value);
  //   } else if (e.target.value === "Choose Filter") {
  //     setFilterBy(e.target.value);
  //   }
  // }

  return (
    <Layout>
      <h1 className="font-sans text-2xl font-medium text-gray-500 text-center">
        Sales Summary
      </h1>
      <div className="text-center my-5">
        <button
          className="bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          onClick={() => history.push("/income")}
        >
          Add Income
        </button>
      </div>

      <div className="text-center my-5">
        <button
          className="bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
          onClick={() => history.push("/expense")}
        >
          Add Expense
        </button>
      </div>

      <div className="flex justify-around bg-gray-100 p-3 rounded-lg">
        <div
          className={
            tabState.income
              ? "cursor-pointer text-purple-500 font-medium px-4 py-2  bg-purple-200 rounded-lg"
              : "cursor-pointer text-gray-400 font-medium px-4 py-2"
          }
          onClick={() => setTabState({ expense: false, income: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 stroke-current text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>{" "}
          Income Table
        </div>
        <div
          className={
            tabState.expense
              ? "cursor-pointer text-purple-500 font-medium px-4 py-2 bg-purple-200 rounded-lg"
              : "cursor-pointer text-gray-400 font-medium px-4 py-2"
          }
          onClick={() => setTabState({ income: false, expense: true })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline mr-2 stroke-current text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
          Expense Table
        </div>
      </div>

      <SalesTable />

      {/* <button
          onClick={getSalesEntriesHandler}
          className="min-w-full bg-purple-300 text-purple-600 font-normal hover:bg-purple-200 duration-100 hover:text-purple-800 rounded-md px-2 py-1 shadow-2xl"
        >
          Get All Sales Summary
          {cardId || date ? "Get Sales Summary" : "Get All Sales Summary"}
        </button> */}

      {/* <label className="block">
          <span className="block">Filter Sales</span>
          <select value={filterBy} onChange={handleFilterChange}>
            <option value="Choose Filter" name="Choose Filter">
              Choose Filter
            </option>
            <option value="date">Filter by day</option>
            <option value="card_id">Filter by card ID</option>
            <option value="date_range">Filter by date range</option>
          </select>
        </label>
        {filterBy === "date_range" ? (
          <>
            <label className="block">Start Date</label>
            <input
              className="block mb-2"
              type="date"
              value={dateFilter.startDate}
              name="startDate"
              onChange={(e) =>
                setDateFilter({
                  ...dateFilter,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <label className="block">End Date</label>
            <input
              className="block mb-2"
              type="date"
              value={dateFilter.endDate}
              name="endDate"
              onChange={(e) =>
                setDateFilter({
                  ...dateFilter,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <button
              className="block p-2 bg-yellow-100 text-yellow-600  rounded-md px-2 py-1 shadow-2xl"
              onClick={() => {
                if (Object.values(dateFilter).length === 2) {
                  handleFilterRequest(dateFilter);
                  setDateFilter({
                    startDate: "",
                    endDate: "",
                  });
                }
              }}
            >
              Submit
            </button>
          </>
        ) : null}

        {filterBy === "date" ? <FilterByDate filterData={filterData} /> : null}
        {filterBy === "card_id" ? (
          <FilterByCardId filterData={filterData} />
        ) : null}
        {filterBy === "date_range" && Object.values(dateFilter).length === 2 ? (
          <FilterByDateRange filterData={filterData} />
        ) : null} */}
    </Layout>
  );
}

export default App;
