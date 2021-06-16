import React from "react";

const SalesContext = React.createContext();
export const SalesProvider = SalesContext.Provider;
export const SalesConsumer = SalesContext.Consumer;

export default SalesContext;
