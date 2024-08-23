import React from "react";
import "./Sidebar.css";
import { Button, Divider, List, Box, ListItem, Checkbox, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Sidebar = ({ isOpen, onClose, onSubmit }) => {

  const nav=useNavigate();

  const logout =()=>{
    nav('/')
  }
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <h2 className="header">
        <span className="first-part">Tech</span>
        <span className="second-part">Lambdas</span>
      </h2>
      <Box sx={{ width: 250 }} role="presentation">
      
        <Divider />
       
      </Box>
      <div className="logout-container">
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;
