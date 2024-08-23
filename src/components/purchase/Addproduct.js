import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";

const Addproduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    date,
    customerName,
    mobileNumber,
    location: loc,
    description,
    selectedOptions,
  } = location.state || {};

  const [formData, setFormData] = useState({
    date: date || "",
    customerName: customerName || "",
    mobileNumber: mobileNumber || "",
    location: loc || "",
    description: description || "",
    selectedProducts: selectedOptions || [],
  });

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

  const handleSubmit = () => {
    const { date, customerName, mobileNumber, location, description } =
      formData;

    if (!date || !customerName || !mobileNumber || !location || !description) {
      alert("Please fill in all required fields.");
      return;
    }

    const storedData = JSON.parse(localStorage.getItem("purchaseData")) || [];
    localStorage.setItem(
      "purchaseData",
      JSON.stringify([...storedData, formData])
    );

    localStorage.removeItem("selectedProducts");

    navigate("/Purchaseview");
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="content">
        <form className="purchase-form" style={{ marginTop: "3%" }}>
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
              required
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>

        <div className="product-container">
          <h2>Selected Products</h2>
          {formData.selectedProducts.map((option, index) => (
            <div className="form-group" key={index}>
              <input
                className="boxsizing"
                type="text"
                value={option}
                readOnly
                style={{ display: "block", margin: "10px 0" }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Addproduct;
