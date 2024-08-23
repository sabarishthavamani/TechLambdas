import React from "react";
import "./Navbar.css"; 
import Bell from "../../images/Bell.png"; 
import "../purchase/Purchase.css"
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Purchase</h1>
      <img src={Bell} alt="Bell" style={{marginRight:"5%"}}/>
    </nav>
  );
};

export default Navbar;
