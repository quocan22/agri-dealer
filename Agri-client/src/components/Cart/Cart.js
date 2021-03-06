import React, { useContext, useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
} from "@material-ui/core";
import "react-tabs/style/react-tabs.css";
import CartCell from "./CartCell/CartCell";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import HistoryIcon from "@material-ui/icons/History";
import "./Cart.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
const axios = require("axios");

function Cart() {
  const { userAcc } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const [cartId, setCartId] = useState("");

  const [open, setOpen] = React.useState(false);

  var total = 0;
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    function fetchCartData() {
      let loginToken = localStorage.getItem("LoginToken");
      axios
        .get("http://localhost:5000/api/carts/currentcart", {
          params: {
            userId: userAcc.id,
          },
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((res) => {
          setCartId(res.data.id);
          setCartData(res.data.details);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchCartData();
  }, [userAcc.id, cartData]);
  const PaidCart = () => {
    let loginToken = localStorage.getItem("LoginToken");
    let PaidData = new FormData();
    PaidData.append("id", cartId);
    axios
      .put("http://localhost:5000/api/carts/paidcart", PaidData, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then(() => {
        toast.success("Đặt hàng thành công", {
          position: toast.POSITION.TOP_CENTER,
        });
        setOpen(true);
      })
      .catch((err) => console.log(err));
  };

  function removeProduct(productid) {
    let loginToken = localStorage.getItem("LoginToken");
    let removeData = new FormData();
    removeData.append("id", cartId);
    removeData.append("productId", productid);
    console.log(cartId);
    console.log(productid);
    axios
      .put("http://localhost:5000/api/carts/removeproduct", removeData, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then(() => {
        let temp = cartData.filter((Cart) => Cart.productId !== productid);
        setCartData(temp);
      })
      .catch((err) => console.log(err));
  }
  



  return (
    <div className="cart-screen-container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Giỏ hàng</title>
      </Helmet>
      <div>
        <div className="quotation-heading">
          <text style={{ marginBottom: "10px" }}>GIỎ HÀNG</text>
          {!userAcc ? null : (
            <Link className="manage-link" to={"/cart-history"}>
              <h6 style={{ marinTop: "50px" }}>Lịch sử mua hàng</h6>{" "}
              <HistoryIcon style={{ color: "green", fontSize: "35" }} />
            </Link>
          )}
        </div>
        {cartData.length < 1 ? (
          "Bạn không có sản phẩm nào trong giỏ hàng"
        ) : (
          <Grid className="cart-row">
            <Grid className="col-1">
              <Grid className="row" style={{ marginLeft: 10 }}>
                <Grid className="list-item" justify="flex-start">
                  {cartData.map((cproduct) => (
                    <Grid>
                      <CartCell cproduct={cproduct} remove={removeProduct}/>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <Grid className="col-2">
              <Card className="price-card" style={{ margin: 10 }}>
                <Typography
                  variant="subtitle1"
                  style={{
                    margin: 5,
                    fontWeight: 550,
                    justifyContent: "flex-start",
                  }}
                >
                  Tạm tính:
                </Typography>
                {cartData.map((cproduct) => (
                  <Grid
                    className="row"
                    style={{ justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="subtitle1"
                      style={{
                        margin: 5,
                        alignContent: "center",
                        width: "100px",
                      }}
                      align="left"
                    >
                      {cproduct.productName}
                    </Typography>
                    <Typography
                      variant="subtitle3"
                      style={{
                        margin: 10,
                        alignItems: "flex-end",
                        justifyContent: "flex-start",
                        color: "orange",
                      }}
                      align="center"
                    >
                      x {cproduct.buyQuantity}
                    </Typography>
                    <text
                      style={{
                        margin: 9,
                        alignContent: "center",
                        fontWeight: "bold",
                        width: "80px",
                      }}
                      align="right"
                    >
                      {numberWithCommas(
                        cproduct.productPrice * cproduct.buyQuantity
                      )}
                      ₫
                    </text>
                  </Grid>
                ))}
                <Grid className="row">
                  <Typography
                    variant="subtitle1"
                    style={{ margin: 5, fontWeight: 550 }}
                  >
                    Tổng cộng:
                  </Typography>
                  <text
                    style={{
                      margin: 9,
                      alignContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {cartData.forEach(
                      (cproduct) =>
                        (total += cproduct.productPrice * cproduct.buyQuantity)
                    )}
                    {numberWithCommas(total)}₫
                  </text>
                </Grid>
                <p className="separator" style={{ margin: 5 }}></p>
                <Grid className="row">
                  <Typography
                    variant="h6"
                    style={{
                      margin: 5,
                      width: "fit-content",
                      fontWeight: 550,
                      fontSize: 19,
                    }}
                  >
                    Thành tiền:
                  </Typography>
                  <text
                    style={{
                      margin: 7,
                      alignContent: "center",
                      fontWeight: 650,
                      fontSize: 18,
                      color: "red",
                    }}
                  >
                    {numberWithCommas(total)}₫
                  </text>
                </Grid>
              </Card>
              <Button className="buy-btn" onClick={PaidCart}>
                đặt hàng
              </Button>
              <div>
                <Dialog
                  open={open}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle
                    align="center"
                    style={{ color: "seagreen" }}
                  >
                    Hóa đơn
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      style={{ color: "seagreen", margin: 10 }}
                    >
                      {" "}
                      Danh sách sản phẩm
                    </DialogContentText>
                    <div>
                      <TableContainer>
                        <Table
                          aria-labelledby="tableTitle"
                          size={"small"}
                          aria-label="enhanced table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell
                                align="left"
                                style={{
                                  fontWeight: "700",
                                  color: "black",
                                }}
                              >
                                Sản phẩm
                              </TableCell>
                              <TableCell
                                align="left"
                                style={{
                                  fontWeight: "700",
                                  color: "black",
                                }}
                              >
                                Số lượng
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  fontWeight: "700",
                                  color: "black",
                                }}
                              >
                                Giá bán (VNĐ)
                              </TableCell>
                              <TableCell
                                align="right"
                                style={{
                                  fontWeight: "700",
                                  color: "black",
                                }}
                              >
                                Thành tiền (VNĐ)
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {cartData.map((product) => {
                              return (
                                <TableRow hover key={product.productName}>
                                  <TableCell align="left">
                                    {product.productName}
                                  </TableCell>
                                  <TableCell align="left">
                                    {product.buyQuantity}
                                  </TableCell>
                                  <TableCell align="right">
                                    {" "}
                                    {numberWithCommas(product.productPrice)}₫
                                  </TableCell>
                                  <TableCell align="right">
                                    {" "}
                                    {numberWithCommas(
                                      product.productPrice * product.buyQuantity
                                    )}
                                    ₫
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </DialogContent>
                  <DialogContent>
                    <DialogContentText
                      style={{ color: "black", margin: 10, fontWeight: "bold" }}
                      align="right"
                      justify="flex-end"
                    >
                      Tổng cộng:{" "}
                      <text
                        style={{
                          color: "seagreen",
                          fontWeight: "bold",
                          alignContent: "center",
                        }}
                      >
                        {" "}
                        {numberWithCommas(total)}₫
                      </text>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Link className="cart-btn-link" to="/">
                      <Button
                        style={{ color: "seagreen" }}
                      >
                        Trở về trang chủ
                      </Button>
                    </Link>
                    <Button style={{ color: "seagreen" }}>
                      <Link className="cart-btn-link" to={"/cart-history"}>
                        Xem lịch sử mua hàng
                      </Link>
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
}

export default Cart;
