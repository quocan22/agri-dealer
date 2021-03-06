import React, { useState, useEffect, useContext } from "react";
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
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import "./SellingProduct.css";
import { AuthContext } from "../../../contexts/AuthProvider";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const axios = require("axios");

function SellingProduct() {
  const history = useHistory();
  const [productName, setProductName] = useState("");
  const { userAcc } = useContext(AuthContext);
  const [cateList, setCateList] = useState([]);
  const [cateId, setCateId] = useState("");
  const [price, setPrice] = useState();
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState();
  const [minPurchase, setMinPurchase] = useState();
  const [description, setDescription] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [failAlert, setFailAlert] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCateList(response.data);
      })
      .catch((error) => console.log(error));

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
    setFailAlert(false);
    let loginToken = localStorage.getItem("LoginToken");
    let userId = userAcc.id;
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
    axios
      .post("http://localhost:5000/api/products", createProductForm, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((response) => {
        setProductName("");
        setPrice(0);
        setQuantity(0);
        setMinPurchase(0);
        setDescription("");
        setIntroduction("");
        setSelectedFile(null);
        toast.success("Th??m s???n ph???m th??nh c??ng", {
          position: toast.POSITION.TOP_CENTER,
        });
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        console.log(error);
        setFailAlert(true);
      });
  };

  return (
    <div className="selling-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>????ng b??n s???n ph???m</title>
      </Helmet>
      <Typography variant="h4">????NG B??N S???N PH???M</Typography>
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
            <div className="custom-column" style={{ width: 300 }}>
              <label style={{ fontSize: "16px" }}>Danh m???c s???n ph???m </label>
              <Select
                defaultValue=""
                onChange={(e) => setCateId(e.target.value)}
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
              <label style={{ fontSize: "16px" }}>Gi?? b??n </label>
              <TextField
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="Gi?? b??n"
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
            <div className="custom-column" style={{ width: 300 }}>
              <label style={{ fontSize: "16px" }}>????n v??? </label>
              <Select
                defaultValue=""
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
              <label style={{ fontSize: "16px" }}>T???ng s??? l?????ng </label>
              <TextField
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                type="number"
                placeholder="T???ng s??? l?????ng"
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
                S??? l?????ng mua t???i thi???u{" "}
              </label>
              <TextField
                value={minPurchase}
                onChange={(e) => setMinPurchase(e.target.value)}
                type="number"
                placeholder="S??? l?????ng mua t???i thi???u"
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
              <label style={{ fontSize: "16px" }}>M?? t??? s???n ph???m</label>
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                rows={6}
                variant="filled"
              />
            </div>
          </div>

          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>Gi???i thi???u s???n ph???m</label>
              <TextField
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                multiline
                rows={6}
                variant="filled"
              />
            </div>
          </div>

          <div className="custom-row" style={{ margin: 10 }}>
            <div className="custom-column">
              <label style={{ fontSize: "16px" }}>H??nh ???nh s???n ph???m </label>
              <input type="file" accept="image/*" onChange={onSelectFile} />
              {selectedFile && (
                <img className="preview-img" src={preview} alt="" />
              )}
            </div>
          </div>
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
                width: "670px",
              }}
            >
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
                  Th??m s???n ph???m th???t b???i!
                </Alert>
              </Collapse>
            </div>
            <button
              className="add-product-button"
              onClick={() => history.goBack()}
            >
              Quay l???i
            </button>
            <button onClick={addNewProduct} className="add-product-button">
              Th??m s???n ph???m
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
export default SellingProduct;
