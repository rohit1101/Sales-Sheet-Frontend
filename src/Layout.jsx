import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="w-full max-w-screen-md mx-auto rounded-sm h-full text-center">
      {children}
    </div>
  );
};

export default Layout;
