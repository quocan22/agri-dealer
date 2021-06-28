import React, { useContext, useEffect, useState } from "react";
import {
  CardContent,
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  InputAdornment,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./QuotationCell.css";
import { AuthContext } from "../../../contexts/AuthProvider";
const axios = require("axios");

function QuotationCell({ quotation }) {
  const [open, setOpen] = React.useState(false);
  const [categoryList, setCategoryList] = useState(null);
  const [userData, setUserData] = useState([]);
  const [quotationList, setQuotationList] = useState([]);

  const [quotePrice, setQuotePrice] = useState(null);
  const [description, setDescription] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { userAcc } = useContext(AuthContext);
  const handleCreateQuotationtoRequest = () => {
    let userId = localStorage.getItem("UserId");
    let loginToken = localStorage.getItem("LoginToken");
    if (!quotePrice) {
      setQuotePrice(quotation.wishPrice);
    }
    if (!description) {
      setDescription("Báo giá bởi " + userData.displayName);
    }
    const newquotationForm = new FormData();
    if (description && quotePrice) {
      newquotationForm.append("userId", userId);
      newquotationForm.append("requestId", quotation.id);
      newquotationForm.append("quotePrice", quotePrice);
      newquotationForm.append("Description", description);
      newquotationForm.append("State", "pending");
    }
    axios
      .post("http://localhost:5000/api/quotations", newquotationForm, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((res) => {
        console.log(res);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:5000/api/users/" + quotation.userId, {})
      .then((response) => {
        setUserData(response.data.userClaims);
      })
      .catch((error) => {
        console.log(error);
      });
    function fetchQuotationData() {
      axios
        .get("http://localhost:5000/api/quotations/filter", {
          params: {
            type: "requestid",
            value: quotation.id,
          },
        })
        .then((res) => {
          setQuotationList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchQuotationData();
  }, [quotation.userId, quotation.id]);

  return (
    <div>
      <div className="quotation-rq-box">
        <CardContent className="media-body">
          <Link className="quotation-name">
            <Typography variant="h5">
              {quotation.productName}
              <span
                onClick={() => console.log(quotationList.lenght)}
                className="badge"
              >
                {quotationList.length} Báo giá
              </span>
            </Typography>
          </Link>
          <Typography style={{ marginBottom: 10, fontSize: 12 }}>
            (Phân loại:{" "}
            <Link className="small-link">{quotation.categoryName}</Link>
            <subtitile2> | </subtitile2>
            Danh mục:{" "}
            <Link className="small-link">
              {categoryList
                ? categoryList.find((cate) => cate.id === quotation.categoryId)
                    .categoryName
                : ""}
            </Link>
            <subtitile2> | </subtitile2>
            Được yêu cầu bởi:{" "}
            <Link className="small-link">{userData.displayName}</Link>)
          </Typography>
          <Typography style={{ marginTop: 5, fontSize: 15 }}>
            Số lượng cần mua:
            <text style={{ margin: 5, fontWeight: "bold" }}>
              {quotation.quantity} {quotation.unit}
            </text>
          </Typography>
          <Typography style={{ fontSize: 15 }}>
            Mức giá mong muốn:
            <text style={{ margin: 5, fontWeight: "bold" }}>
              {quotation.wishPrice}₫ / {quotation.unit}
            </text>
          </Typography>
          <Typography style={{ fontSize: 15 }}>
            Ngày mua - hết hạn:
            <text style={{ margin: 5, fontWeight: "bold" }}>
              {new Date(quotation.startDate).toLocaleDateString("vi-VI", {
                timeZone: "UTC",
              })}{" "}
              -{" "}
              {new Date(quotation.endDate).toLocaleDateString("vi-VI", {
                timeZone: "UTC",
              })}
            </text>
          </Typography>
          <Typography
            style={{
              marginTop: 2,
              fontSize: 14,
              fontStyle: "italic",
              color: "grey",
            }}
          >
            "{quotation.description}"
          </Typography>
        </CardContent>
        <Button className="quote-btn" onClick={handleClickOpen}>
          Báo giá
        </Button>
      </div>
      {!userAcc ? (
        <div>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle style={{ alignContent: "center", color: "seagreen" }}>
              Báo giá
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ color: "black" }}>
                Bạn chưa đăng nhập, vui lòng đăng nhập tại đây:
                <Link to="/login" className="register-forgot-link">
                  <p> Đăng nhập</p>
                </Link>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          {userAcc.role === "seller" ? (
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle
                  style={{ alignContent: "center", color: "seagreen" }}
                >
                  Báo giá
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Báo giá cho sản phẩm
                    <text style={{ color: "seagreen" }}>
                      {" "}
                      {quotation.productName}
                    </text>
                    :
                  </DialogContentText>
                  <TextField
                    label="Giá tiền"
                    variant="outlined"
                    type="number"
                    onChange={(e) => setQuotePrice(e.target.value)}
                    defaultValue={quotation.wishPrice}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          style={{ color: "grey" }}
                        >
                          VNĐ / {quotation.unit}{" "}
                        </InputAdornment>
                      ),
                    }}
                  />
                </DialogContent>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Lời nhắn cho{" "}
                    <text style={{ color: "seagreen" }}>
                      {" "}
                      {userData.displayName}
                    </text>
                    :
                  </DialogContentText>
                  <TextField
                    label="Lời nhắn"
                    multiline
                    fullWidth
                    onChange={(e) => setDescription(e.target.value)}
                    rowsMax={4}
                    variant="outlined"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} style={{ color: "seagreen" }}>
                    Hủy
                  </Button>
                  <Button
                    onClick={handleCreateQuotationtoRequest}
                    style={{ color: "seagreen" }}
                  >
                    Báo giá
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ) : (
            <div>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle
                  style={{ alignContent: "center", color: "seagreen" }}
                >
                  Báo giá
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Bạn không đủ điều kiện để báo giá, vui lòng cập nhật tài
                    khoản tại đây:
                    <Link to="/provider-re" className="register-forgot-link">
                      <p> Đăng ký bán hàng</p>
                    </Link>
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuotationCell;
