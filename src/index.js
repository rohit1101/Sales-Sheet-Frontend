import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import Routes from "./Route";

// import swDev from "./swDev";

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
// swDev();
