import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "../purchase/Purchase.css";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Purchaseview = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("purchaseData")) || [];
    setRows(storedData);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter((row) =>
    row.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIndex(null);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      const updatedRows = rows.filter((_, index) => index !== selectedIndex);
      setRows(updatedRows);
      localStorage.setItem("purchaseData", JSON.stringify(updatedRows));
      handleMenuClose();
    }
  };

  const handleAddProduct = () => {
    navigate("/Purchase");
  };

  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      <div className="content" style={{ marginTop: "80px" }}>
        <div className="content-header">
          <h2>All Products</h2>
          <Box className="search-add-container">
            <TextField
              label="Search Products"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </Box>
        </div>
        <CollapsibleTable rows={filteredRows} onMenuClick={handleMenuClick} />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDelete}>
            <DisabledByDefaultIcon /> Delete
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

function Row(props) {
  const { row, index, onMenuClick } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell sx={{ align: "center" }}>{row.customerName}</TableCell>
        <TableCell sx={{ align: "center" }}>{row.mobileNumber}</TableCell>
        <TableCell sx={{ align: "center" }}>{row.location}</TableCell>
        <TableCell sx={{ align: "center",width:"40%" }}>{row.description}</TableCell>
        <TableCell>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={(event) => onMenuClick(event, index)}
          >
            <MoreIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Selected Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>S.No</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.selectedProducts && row.selectedProducts.map((option, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{option}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    date: PropTypes.string.isRequired,
    customerName: PropTypes.string.isRequired,
    mobileNumber: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    selectedProducts: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

function CollapsibleTable({ rows, onMenuClick }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold', align: "center" }}>Invoice Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold', align: "center" }}>Customer Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', align: "center" }}>Mobile Number</TableCell>
            <TableCell sx={{ fontWeight: 'bold', align: "center" }}>Location</TableCell>
            <TableCell sx={{ fontWeight: 'bold', align: "center" }}>Description</TableCell>
            <TableCell sx={{ fontWeight: 'bold', align: "center" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} index={index} onMenuClick={onMenuClick} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

CollapsibleTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
      mobileNumber: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      selectedProducts: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default Purchaseview;
