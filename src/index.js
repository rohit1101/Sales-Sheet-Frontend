import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from "./globalStyles";
import Routes from "./Route";

// import swDev from "./swDev";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
// swDev();
