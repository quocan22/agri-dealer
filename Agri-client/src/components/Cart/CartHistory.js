import React, { useEffect, useContext, useState } from "react";
import "./CartHistory.css";
import { AuthContext } from "../../contexts/AuthProvider";
import {
  Grid,
  Card,
  Typography,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const axios = require("axios");

function CartHistory() {
  const { userAcc } = useContext(AuthContext);
  const [cartHistoryData, setCartHistoryData] = useState([]);
  var total = 0;

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchUserData() {
      // eslint-disable-next-line no-lone-blocks
      axios
        .get("http://localhost:5000/api/users/" + userAcc.id, {})
        .then((response) => {
          console.log(response.data.userClaims);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUserData();
  }, [userAcc.id]);

  useEffect(() => {
    function fetchCartData() {
      let loginToken = localStorage.getItem("LoginToken");
      axios
        .get("http://localhost:5000/api/carts/historycart", {
          params: {
            userId: userAcc.id,
          },
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((res) => {
          setCartHistoryData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchCartData();
  }, [userAcc.id]);

  return (
    <div className="history-container">
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        LỊCH SỬ MUA HÀNG
      </Typography>
      {userAcc === null ? (
        <p>Đang tải dữ liệu</p>
      ) : (
        <Card className="history-card">
          <Grid className="row">
            <Grid className="history">
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Lịch sử giao dịch
              </Typography>
              <Typography variant="subtitle1" style={{ margin: 5 }}>
                - Số lần giao dịch thành công:{" "}
                <text style={{ fontWeight: "bold" }}>
                  {cartHistoryData.length}
                </text>
              </Typography>
              <Typography variant="subtitle1" style={{ margin: 5 }}>
                - Tổng chi tiêu:{" "}
                {cartHistoryData.forEach((data) => (total += data.total))}
                <text style={{ fontWeight: "bold" }}>
                  {numberWithCommas(total)}₫
                </text>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h4" style={{ margin: 10 }}>
            Giao dịch gần đây
          </Typography>
          <p className="separator" style={{ margin: 10 }}></p>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Ngày mua hàng
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Số sản phẩm
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Tổng Tiền
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>Chi tiết</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartHistoryData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {new Date(row.buyDate).toLocaleDateString("vi-VI")}
                    </TableCell>
                    <TableCell>{row.details.length}</TableCell>
                    <TableCell>{numberWithCommas(row.total)}₫</TableCell>
                    <TableCell>
                      <Accordion
                        TransitionProps={{ unmountOnExit: true }}
                        className="quotation-list-dropdown"
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Danh sách sản phẩm</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="quotation-list">
                          {
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
                                        align="center"
                                        style={{
                                          fontWeight: "700",
                                          color: "black",
                                        }}
                                      >
                                        Số lượng
                                      </TableCell>
                                      <TableCell
                                        align="center"
                                        style={{
                                          fontWeight: "700",
                                          color: "black",
                                        }}
                                      >
                                        Đơn vị
                                      </TableCell>
                                      <TableCell
                                        align="right"
                                        style={{
                                          fontWeight: "700",
                                          color: "black",
                                        }}
                                      >
                                        Giá bán
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {row.details.map((product) => {
                                      return (
                                        <TableRow
                                          hover
                                          key={product.productName}
                                        >
                                          <TableCell align="left">
                                            {product.productName}
                                          </TableCell>
                                          <TableCell align="center">
                                            {product.buyQuantity}
                                          </TableCell>
                                          <TableCell align="center">
                                            {product.productUnit}
                                          </TableCell>
                                          <TableCell align="right">
                                            {" "}
                                            {numberWithCommas(
                                              product.productPrice
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
                          }
                        </AccordionDetails>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link to="/">
          <button className="logout">Trang chủ</button>
        </Link>
      </div>
    </div>
  );
}
export default CartHistory;
