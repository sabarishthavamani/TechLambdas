import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "../purchase/Purchase.css";
import sampleImage from "../../images/Mail-Box.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Purchase = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [checked, setChecked] = useState([false, false, false, false, false]);
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    customerName: "",
    mobileNumber: "",
    location: "",
    description: "",
  });

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleCheckboxChange = (index) => (event) => {
    const newChecked = [...checked];
    newChecked[index] = event.target.checked;
    setChecked(newChecked);
  };

  const handleSubmit = () => {
    const selectedOptions = [
      "School Bag",
      "Sanddles",
      "Umbrella",
      "Tiffen Box",
      "Watter Bottle",
    ].filter((option, index) => checked[index]);

    if (selectedOptions.length === 0) {
      alert("Please Add Product First!");
      return;
    }

    const dataToPass = {
      ...formData,
      selectedOptions,
    };

    localStorage.setItem("selectedProducts", JSON.stringify(selectedOptions));

    setChecked([false, false, false, false, false]);
    setSelectedProducts([]);

    navigate("/Addproduct", { state: dataToPass });
    handleSidebarClose();
  };

  const formhandleSubmit = () => {
    alert("Please Add Product First!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobileNumber") {
      if (!/^\d*$/.test(value)) {
        return;
      }
      if (value.length > 10) {
        return;
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    setSelectedProducts(products);
    const checkBoxes = [
      "School Bag",
      "Sanddles",
      "Umbrella",
      "Tiffen Box",
      "Watter Bottle",
    ];
    const updatedChecked = checkBoxes.map((item) => products.includes(item));
    setChecked(updatedChecked);
  }, []);

  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      <SwipeableDrawer
        anchor="right"
        open={isSidebarOpen}
        onClose={handleSidebarClose}
      >
        <Box
          sx={{
            width: 400,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          role="presentation"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 2,
              borderBottom: "1px solid #ddd",
            }}
          >
            <Typography variant="h6">Select Options</Typography>
            <IconButton onClick={handleSidebarClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ flexGrow: 1 }}>
            {[
              "School Bag",
              "Sanddles",
              "Umbrella",
              "Tiffen Box",
              "Watter Bottle",
            ].map((text, index) => (
              <ListItem key={text}>
                <Checkbox
                  checked={checked[index]}
                  onChange={handleCheckboxChange(index)}
                />
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>

          <Divider />

          <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <Button onClick={handleSidebarClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Submit
            </Button>
          </Box>
        </Box>
      </SwipeableDrawer>

      <div className="content">
        <form className="purchase-form">
          <button
            class="custom-button"
            onClick={() => navigate("/Purchaseview")}
          >
            <span class="button-icon">&#9664;</span>
            <span class="button-text">Create New Purchase</span>
          </button>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              className="boxsizing"
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input
              className="boxsizing"
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              className="boxsizing"
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              className="boxsizing"
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              className="boxsizing"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="buttons-container" style={{ marginLeft: "70%" }}>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/Purchaseview")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="submit-button"
            onClick={formhandleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="Mail-Box">
          <img src={sampleImage} alt="Add Products" className="sample-image" />
        </div>
        <div className="image-container">
          <Button className="image-button" onClick={handleSidebarOpen}>
            + Add Products
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Purchase;
