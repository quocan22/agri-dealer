import React, { useState, useEffect } from "react";
import {
  MenuItem,
  Typography,
  Card,
  Select,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import "./SellingProduct.css";
const axios = require("axios");

function SellingProduct() {
  const [productName, setProductName] = useState("");
  const [cateList, setCateList] = useState([]);
  const [cateId, setCateId] = useState("");
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);
  const [description, setDescription] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, wheneDver selected file is changed
  useEffect(() => {
    axios.get("http://localhost:5000/api/products/categories")
      .then(response => {
        setCateList(response.data);
      }).catch(error => console.log(error));

    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const addNewProduct = () => {
    let loginToken = localStorage.getItem("LoginToken");
    let userId = localStorage.getItem("UserId");
    let createProductForm = new FormData();
    createProductForm.append("file", selectedFile);
    createProductForm.append("productName", productName);
    createProductForm.append("price", price);
    createProductForm.append("unit", unit);
    createProductForm.append("quantity", quantity);
    createProductForm.append("minPurchase", minPurchase);
    createProductForm.append("description", description);
    createProductForm.append("introduction", introduction);
    createProductForm.append("userId", userId);
    createProductForm.append("categoryId", cateId);
    axios.post("http://localhost:5000/api/products", createProductForm, {
      headers: {
        Authorization: "Bearer " + loginToken
      }
    }).then(response => {
      setProductName("");
      setPrice(0);
      setQuantity(0);
      setMinPurchase(0);
      setDescription("");
      setIntroduction("");
      setSelectedFile(null);
      console.log("thanh cong")
    }).catch(error => console.log(error));
  }

  return (
    <div className="container">
        <Typography variant="h4" >
          ĐĂNG BÁN SẢN PHẨM
        </Typography>   
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
                onChange={e => setProductName(e.target.value)}
              />
            </div>
            <div className="custom-column" style={{ width: 300 }}>
              <label style={{ fontSize: "16px" }}>Danh mục sản phẩm </label>
              <Select
                defaultValue=""
                onChange={e => setCateId(e.target.value)}
                variant="outlined"
              >
                {cateList.map((item) => (
                  <MenuItem value={item.id} key={item.id}>
                    {item.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>Giá bán </label>
              <TextField
                value={price}
                onChange={e => setPrice(e.target.value)}
                type="number"
                placeholder="Giá bán"
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
            <div className="custom-column" style={{ width: 300 }}>
              <label style={{ fontSize: "16px" }}>Đơn vị </label>
              <Select
                defaultValue=""
                variant="outlined"
                onChange={(e) => {
                  setUnit(e.target.value);
                }}
              >
                <MenuItem value="tấn">tấn</MenuItem>
                <MenuItem value="tạ">tạ</MenuItem>
                <MenuItem value="kg">kg</MenuItem>
              </Select>
            </div>
          </div>

          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>Tổng số lượng </label>
              <TextField
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                type="number"
                placeholder="Tổng số lượng"
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
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>
                Số lượng mua tối thiểu{" "}
              </label>
              <TextField
                value={minPurchase}
                onChange={e => setMinPurchase(e.target.value)}
                type="number"
                placeholder="Số lượng mua tối thiểu"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ color: "grey" }}>
                      {unit}
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
            </div>
          </div>

          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>Mô tả sản phẩm</label>
              <TextField
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline 
                rows={6} 
                variant="filled" />
            </div>
          </div>

          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>Giới thiệu sản phẩm</label>
              <TextField
                value={introduction}
                onChange={e => setIntroduction(e.target.value)}
                multiline 
                rows={6} 
                variant="filled" />
            </div>
          </div>

          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>Hình ảnh sản phẩm </label>
                <input type="file" accept="image/*" onChange={onSelectFile} />
                {selectedFile && <img className="preview-img" src={preview} alt=""/>}
            </div>
          </div>
          <div className="custom-row" style={{ margin: 10, justifyContent:"flex-end"}}>
            <button onClick={addNewProduct} className="add-product-button">Thêm sản phẩm</button>
          </div>
        </Card> 
      </div>
    </div>
  );
}
export default SellingProduct;