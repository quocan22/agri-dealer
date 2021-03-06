import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Typography,
  Card,
  Select,
  TextField,
  InputAdornment,
  Collapse,
  IconButton,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import "../SellingProduct/SellingProduct.css";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
const axios = require("axios");

function CreateQuotation() {
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState("");
  const [wishPrice, setWishPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const history = useHistory();


  const handleRequestQuotation = () => {
    if (
      !productName ||
      !categoryId ||
      !description ||
      !startDate ||
      !endDate ||
      !categoryName
    ) {
      setSuccessAlert(false);
      setFailAlert(true);
      return;
    }
    let userId = localStorage.getItem("UserId");
    let loginToken = localStorage.getItem("LoginToken");
    const quotationForm = new FormData();
    quotationForm.append("userId", userId);
    quotationForm.append("categoryId", categoryId);
    quotationForm.append("categoryName", categoryName);
    quotationForm.append("productName", productName);
    quotationForm.append("quantity", quantity);
    quotationForm.append("unit", unit);
    quotationForm.append("wishPrice", wishPrice);
    quotationForm.append("description", description);
    quotationForm.append("startDate", startDate);
    quotationForm.append("endDate", endDate);
    axios
      .post("http://localhost:5000/api/quotationrequests", quotationForm, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((res) => {
        console.log(res);
        clearAllFields();
        setSuccessAlert(true);
        setFailAlert(false);
      })
      .catch((err) => {
        console.log(err);
        setSuccessAlert(false);
        setFailAlert(true);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  function clearAllFields() {
    setProductName("");
    setCategoryId(null);
    setQuantity("");
    setWishPrice("");
    setCategoryName("");
    setUnit(null);
    setStartDate("");
    setEndDate("");
    setDescription("");
  }
  return (
    <div className="quotation-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>T???o y??u c???u b??o gi??</title>
      </Helmet>
      <Typography variant="h4">T???O Y??U C???U B??O GI?? S???N PH???M</Typography>
      <div className="selling-product-main-grid">
        <Card className="selling-product-form">
          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>T??n s???n ph???m </label>
              <TextField
                type="text"
                placeholder="T??n s???n ph???m"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="custom-column" style={{ width: 350 }}>
              <label style={{ fontSize: "16px" }}>Ph??n lo???i </label>
              <TextField
                type="text"
                placeholder="Ph??n lo???i: T???i, ???t,..."
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="custom-column" style={{ width: 350 }}>
              <label style={{ fontSize: "16px" }}>Danh m???c s???n ph???m </label>
              <Select
                defaultValue={"DEFAULT"}
                onChange={(e) => setCategoryId(e.target.value)}
                variant="outlined"
                placeholder="Danh m???c s???n ph???m"
                value={categoryId}
              >
                {categoryList.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>M???c gi?? mong mu???n </label>
              <TextField
                value={wishPrice}
                onChange={(e) => setWishPrice(e.target.value)}
                type="number"
                placeholder="M???c gi?? mong mu???n"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ color: "grey" }}>
                      VN??{" "}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>
            <div className="custom-column" style={{ width: 250 }}>
              <label style={{ fontSize: "16px" }}>????n v??? </label>
              <Select
                defaultValue={"DEFAULT"}
                placeholder="????n v???"
                value={unit}
                variant="outlined"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
              >
                <MenuItem value="t???n">t???n</MenuItem>
                <MenuItem value="t???">t???</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="b??">b??</MenuItem>
                <MenuItem value="g??i">g??i</MenuItem>
                <MenuItem value="th??ng">th??ng</MenuItem>
              </Select>
            </div>
          </div>

          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>S??? l?????ng c???n mua </label>
              <TextField
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder="S??? l?????ng c???n mua"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ color: "grey" }}>
                      {unit}{" "}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>
            <div className="custom-column" style={{ width: 300 }}>
              <label style={{ fontSize: "16px" }}>Ng??y mua </label>
              <form noValidate>
                <TextField
                  value={startDate}
                  id="date"
                  type="date"
                  variant="outlined"
                  format="dd//mm/yyyy"
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </form>
            </div>
            <div className="custom-column" style={{ width: 300 }}>
              <label style={{ fontSize: "16px" }}>Ng??y h???t h???n </label>
              <form noValidate>
                <TextField
                  value={endDate}
                  id="date"
                  type="date"
                  variant="outlined"
                  format="dd//mm/yyyy"
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>M?? t??? b??o gi??</label>
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                variant="filled"
              />
            </div>
          </div>
          <div className="custom-row" style={{ margin: 10 }}></div>

          <div
            className="custom-row"
            style={{
              margin: 10,
              justifyContent: "space-between",
              alignContent: "center",
            }}
          >
            <div
              className="custom-column"
              style={{
                margin: 10,
                justifyContent: "flex-start",
                width: "600px",
              }}
            >
              <Collapse in={successAlert}>
                <Alert
                  severity="success"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setSuccessAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Y??u c???u b??o gi?? th??nh c??ng!
                </Alert>
              </Collapse>

              <Collapse in={failAlert}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setFailAlert(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Y??u c???u b??o gi?? th???t b???i, vui l??ng ki???m tra l???i th??ng tin!
                </Alert>
              </Collapse>
            </div>
              <button className="add-product-button"
              onClick={() => history.goBack()}>Quay l???i</button>
            <button
              onClick={handleRequestQuotation}
              className="add-product-button"
            >
              Y??u c???u b??o gi??
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreateQuotation;
