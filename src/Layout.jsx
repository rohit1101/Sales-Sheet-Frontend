import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-full bg-blue-100">
      <div className="w-full max-w-screen-md mx-auto rounded-sm shadow-xl h-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
