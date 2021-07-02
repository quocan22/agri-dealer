import React, { useEffect, useContext, useState } from "react";
import "./CartHistory.css";
import { AuthContext } from "../../contexts/AuthProvider";
import profile from "../../assets/data/profile";

import {
  Grid,
  Card,
  CardMedia,
  Typography,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  Paper
} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { Link } from "react-router-dom";
const axios = require("axios");


function CartHistory() {
  const {userAcc} = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchUserData() {
      // eslint-disable-next-line no-lone-blocks
      axios.get('http://localhost:5000/api/users/'+userAcc.id, {
      }).then(response => {
          console.log(response.data.userClaims);
      }).catch(error => {
          console.log(error);
      })
    }
    fetchUserData();
  },[userAcc.id])


  return (
    <div className="profile-container">
      <Typography variant="h4" style={{marginBottom:"10px"}}>LỊCH SỬ MUA HÀNG</Typography>
      {userAcc === null ?
      <p>Đang tải dữ liệu</p> :
      <Card className="profile-card">
        <Grid className="row">
          <Grid className="history">
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Lịch sử giao dịch
            </Typography>
            <Typography variant="subtitle1" style={{ margin: 5 }}>
              - Số lần giao dịch thành công:{" "}
              <text style={{ fontWeight: "bold" }}>3</text>
            </Typography>
            <Typography variant="subtitle1" style={{ margin: 5 }}>
              - Tổng chi tiêu:{" "}
              <text style={{ fontWeight: "bold" }}>200000.00000</text>
            </Typography>
          </Grid>
        </Grid>
           <Typography variant="h4" style={{ margin: 10 }}>Giao dịch gần đây</Typography>
        <p className="separator" style={{ margin: 10 }}></p>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{fontWeight:"bold"}}>Mã Đơn Hàng</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Nhà Cung Cấp	</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Sản Phẩm	</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Tổng Tiền</TableCell>
                <TableCell style={{fontWeight:"bold"}}>Ngày Mua</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {profile.recentorder.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.provider}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>{row.bill}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> 
      </Card>
      }
      <div style={{display: 'flex', justifyContent: "center"}}>
        <Link to="/">
        <button className="logout">
          Trang chủ
        </button>
        </Link>
      </div>
    </div>
  );
}
export default CartHistory;
