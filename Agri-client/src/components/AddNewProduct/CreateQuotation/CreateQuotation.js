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
import {Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import "../SellingProduct/SellingProduct.css";
const axios = require("axios");

function CreateQuotation() {
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [quantity, setQuantity] = useState(null);
  const [unit, setUnit] = useState("");
  const [wishPrice, setWishPrice] = useState(null);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);


  const handleRequestQuotation = () => {
    if (!productName || !categoryId || !description || !startDate || !endDate) {
      setSuccessAlert(false);
      setFailAlert(true);
      //thong bao thieu thong tin
      return;
    }
    let userId = localStorage.getItem("UserId");
    let loginToken = localStorage.getItem("LoginToken");
    const quotationForm = new FormData();
    quotationForm.append("userId", userId);
    quotationForm.append("categoryId", categoryId);
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
        clearAllFields()
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
  },[]);
  function clearAllFields()
  {
    setProductName('');
    setCategoryId(null);
    setQuantity('');
    setWishPrice('');
    setUnit(null);
    setStartDate('');
    setEndDate('');
    setDescription('')
  }
  return (
    <div className="quotation-container">
      <Typography variant="h4">ĐĂNG BÁN SẢN PHẨM</Typography>
      <div className="selling-product-main-grid">
        <Card className="selling-product-form">
          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>Tên sản phẩm </label>
              <TextField
                type="text"
                placeholder="Tên sản phẩm"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="custom-column" style={{ width: 250 }}>
              <label style={{ fontSize: "16px" }}>Danh mục sản phẩm </label>
              <Select
                defaultValue={"DEFAULT"}
                onChange={(e) => setCategoryId(e.target.value)}
                variant="outlined"
                placeholder="Danh mục sản phẩm"
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
              <label style={{ fontSize: "16px" }}>Mức giá mong muốn </label>
              <TextField
                value={wishPrice}
                onChange={(e) => setWishPrice(e.target.value)}
                type="number"
                placeholder="Mức giá mong muốn"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ color: "grey" }}>
                      VNĐ{" "}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>
            <div className="custom-column" style={{ width: 250 }}>
              <label style={{ fontSize: "16px" }}>Đơn vị </label>
              <Select
                defaultValue={"DEFAULT"}
                placeholder="Đơn vị"
                value={unit}
                variant="outlined"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
              >
                <MenuItem value="tấn">tấn</MenuItem>
                <MenuItem value="tạ">tạ</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
                <MenuItem value="bó">bó</MenuItem>
                <MenuItem value="gói">gói</MenuItem>
                <MenuItem value="thùng">thùng</MenuItem>
              </Select>
            </div>
          </div>

          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>Số lượng cần mua </label>
              <TextField
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder="Số lượng cần mua"
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
              <label style={{ fontSize: "16px" }}>Ngày mua </label>
          <form noValidate >
            <TextField
            value={startDate}
              id="date"
              type="date"
              variant="outlined"
              format="dd//mm/yyyy"
              onChange={(e)=>setStartDate(e.target.value)}
            />
          </form>
        </div>
        <div className="custom-column" style={{ width: 300 }}>
          <label style={{ fontSize: "16px" }}>Ngày hết hạn </label>
          <form  noValidate>
            <TextField
            value={endDate}
              id="date"
              type="date"
              variant="outlined"
              format="dd//mm/yyyy"
              onChange={(e)=>setEndDate(e.target.value)}
            />
          </form>
            </div>
          </div>
          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>Mô tả báo giá</label>
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
                width: "700px",
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
                  Yêu cầu báo giá thành công!
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
                  Yêu cầu báo giá thất bại, vui lòng kiểm tra lại thông tin!
                </Alert>
              </Collapse>
            </div>
            <button
              onClick={handleRequestQuotation}
              className="add-product-button"
            >
              Yêu cầu báo giá
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default CreateQuotation;
