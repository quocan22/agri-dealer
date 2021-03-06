import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";

import { Link } from "react-router-dom";
import "./QuotationCell.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const axios = require("axios");

const useheadingStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
    fontStyle: "bold",
    color: "green",
  },
}));

const statusColor = (state) => {
  let color;
  switch (state) {
    case "pending":
      color = "orange";
      break;
    case "canceled":
      color = "red";
      break;
    case "confirmed":
      color = "green";
      break;
    default:
      break;
  }
  return color;
};
const statusText = (state) => {
  switch (state) {
    case "pending":
      return "Đang chờ xử lý";
    case "canceled":
      return "Đã hủy";
    case "confirmed":
      return "Đã xác nhận";
    default:
      break;
  }
};

function MyQuotationCell({ quotation }) {
  const [categoryList, setCategoryList] = useState(null);
  const [change, setChange] = useState(false);
  const [quotationList, setQuotationList] = useState([]);
  const headingclasses = useheadingStyles();
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => console.log(error));
    async function fetchQuotationData() {
      axios
        .get("http://localhost:5000/api/quotations/filter", {
          params: {
            type: "requestid",
            value: quotation.id,
          },
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((res) => {
          setQuotationList(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchQuotationData();
  }, [quotation.userId, quotation.id, change]);

  const handleConfirm = (id) => {
    let loginToken = localStorage.getItem("LoginToken");
    let updateConfirmStatus = new FormData();
    updateConfirmStatus.append("id", id);
    updateConfirmStatus.append("status", "confirmed");
    axios
      .put("http://localhost:5000/api/quotations/browse", updateConfirmStatus, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((res) => {
        setChange(!change);
        setOpenConfirm(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = (id) => {
    let loginToken = localStorage.getItem("LoginToken");
    let updateCancelStatus = new FormData();
    updateCancelStatus.append("id", id);
    updateCancelStatus.append("status", "canceled");
    axios
      .put("http://localhost:5000/api/quotations/browse", updateCancelStatus, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((res) => {
        setChange(!change);
        setOpenCancel(false);
      })
      .catch((err) => console.log(err));
  };

  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleClickOpenCancel = () => {
    setOpenCancel(true);
  };

  const handleCloseCancel = () => {
    setOpenCancel(false);
  };

  return (
    <div>
      <div className="quotation-rq-box">
        <CardContent className="media-body">
          <Link className="quotation-name">
            <Typography variant="h5">
              {quotation.productName}
              <span className="badge">{quotationList.length} Báo giá</span>
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
            )
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
              {numberWithCommas(quotation.wishPrice)}₫ /{quotation.unit}
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
      </div>
      <Accordion
        TransitionProps={{ unmountOnExit: true }}
        className="quotation-list-dropdown"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={headingclasses.heading}>
            Danh sách báo giá cho yêu cầu
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="quotation-list">
          {quotationList.length < 1 ? (
            "Hiện chưa có báo giá nào cho yêu cầu này"
          ) : (
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
                        style={{ fontWeight: "700", color: "black" }}
                      >
                        Lời nhắn
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{ fontWeight: "700", color: "black" }}
                      >
                        Giá báo (VNĐ)
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{ fontWeight: "700", color: "black" }}
                      >
                        Trạng thái
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {quotationList.map((row) => {
                      return (
                        <TableRow hover key={row.name}>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="right">
                            {" "}
                            {numberWithCommas(row.quotePrice)}₫/
                            {row.requestUnit}
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{
                              fontWeight: "600",
                              color: statusColor(row.state),
                            }}
                          >
                            {statusText(row.state)}
                          </TableCell>
                          {row.state === "pending" ? (
                            <TableCell>
                              <div className="confirm-button-group">
                                <Button
                                  className="confirm"
                                  onClick={() => handleClickOpenConfirm(row.id)}
                                >
                                  Xác nhận
                                </Button>
                                <Button
                                  onClick={() => handleClickOpenCancel(row.id)}
                                  className="cancel"
                                >
                                  Hủy
                                </Button>
                              </div>
                            </TableCell>
                          ) : (
                            <TableCell />
                          )}
                          <div>
                            <Dialog
                              open={openConfirm}
                              onClose={handleCloseConfirm}
                              aria-labelledby="form-dialog-title"
                            >
                              <DialogTitle
                                style={{
                                  alignContent: "center",
                                  color: "seagreen",
                                }}
                              >
                                Xác nhận báo giá
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText
                                  style={{
                                    color: "black",
                                    fontStyle: "italic",
                                  }}
                                >
                                  Bạn có muốn xác nhận báo giá này?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleCloseConfirm}
                                  style={{ color: "seagreen" }}
                                >
                                  Quay lại
                                </Button>
                                <Button
                                  onClick={()=>handleConfirm(row.id)}
                                  style={{ color: "seagreen" }}
                                >
                                  Xác nhận
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                          <div>
                            <Dialog
                              open={openCancel}
                              onClose={handleCloseCancel}
                              aria-labelledby="form-dialog-title"
                            >
                              <DialogTitle
                                style={{
                                  alignContent: "center",
                                  color: "seagreen",
                                }}
                              >
                                Hủy báo giá
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText
                                  style={{
                                    color: "black",
                                    fontStyle: "italic",
                                  }}
                                >
                                  Bạn có muốn hủy báo giá này?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  onClick={handleCloseCancel}
                                  style={{ color: "seagreen" }}
                                >
                                  Quay lại
                                </Button>
                                <Button
                                  onClick={()=>handleCancel(row.id)}
                                  style={{ color: "seagreen" }}
                                >
                                  Hủy báo giá
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MyQuotationCell;
