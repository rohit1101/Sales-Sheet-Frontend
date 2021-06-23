import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <div className="w-full max-w-screen-md mx-auto rounded-sm h-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
