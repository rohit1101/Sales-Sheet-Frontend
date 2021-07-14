import React from "react";

const AuthContext = React.createContext(
  JSON.parse(localStorage.getItem("jwt")) || ""
);

export default AuthContext;
