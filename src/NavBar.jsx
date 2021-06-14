import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <Link to="/" className="underline text-blue-500">
        Home
      </Link>
    </>
  );
};

export default NavBar;
