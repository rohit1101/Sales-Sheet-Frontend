import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="text-left">
      <Link to="/" className="underline text-blue-500 ">
        Home
      </Link>
    </div>
  );
};

export default NavBar;
