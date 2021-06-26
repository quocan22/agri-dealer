import React, { useEffect, useContext, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../contexts/AuthProvider";

import {
  Grid,
  Card,
  CardMedia,
  Typography,
} from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import { Link, useHistory } from "react-router-dom";
const axios = require("axios");


function Profile() {
  const {userAcc, logout} = useContext(AuthContext);
  const history = useHistory();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchUserData() {
      // eslint-disable-next-line no-lone-blocks
      axios.get('http://localhost:5000/api/users/'+userAcc.id, {
      }).then(response => {
          setUserData(response.data.userClaims);
          console.log(response.data.userClaims);
      }).catch(error => {
          console.log(error);
      })
    }
    fetchUserData();
  },[userAcc.id])

  const handleLogout = () => {
    logout().then(history.push("/"));
  }

  return (
    <div className="profile-container">
      <Typography variant="h4" style={{marginBottom:"10px"}}>THÔNG TIN CÁ NHÂN</Typography>
      {userAcc === null ?
      <p>Đang tải dữ liệu</p> :
      <Card className="profile-card">
        <Grid style={{display:"flex", justifyContent:"flex-end"}}>
        <Link to={"/profile-setting"} className="card-content-name">
        <SettingsIcon fontSize="large" />
        </Link> 
        </Grid>
        <Grid className="row">
          <CardMedia className="user-avatar" image={ userData.avatarUrl
                        ? userData.avatarUrl
                        : "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg"} />
          <Grid className="profile-info">
            <Typography style={{ fontSize: 15 }}>
              Họ và tên:
              <text style={{ margin: 5, fontWeight: "bold" }}>
                {userData.displayName}
              </text>
            </Typography>
            <Typography style={{ fontSize: 15 }}>
              Số điện thoại:
              <text style={{ margin: 5, fontWeight: "bold" }}>
                {userData.phonenumber}

              </text>
            </Typography>
            <Typography style={{ fontSize: 15 }}>
              Email:
              <text style={{ margin: 5, fontWeight: "bold" }}>
                {userAcc.email}
              </text>
            </Typography>
            <Typography style={{ fontSize: 15 }}>
              Địa chỉ:
              <text style={{ margin: 5, fontWeight: "bold" }}>
                {userData.address}
              </text>
            </Typography>
            <Typography style={{ fontSize: 15 }}>
              Ngày tham gia:
              <text style={{ margin: 5, fontWeight: "bold" }}>
              {new Date(userData.joinDate).toLocaleDateString("vi-VI", {
                        timeZone: "UTC",
                      })}              
              </text>
            </Typography>
          </Grid>
          <Grid className="history">
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Lịch sử giao dịch
            </Typography>
            <Typography variant="subtitle1" style={{ margin: 5 }}>
              - Số lần giao dịch thành công:{" "}
              <text style={{ fontWeight: "bold" }}>3</text>
            </Typography>
            <Typography variant="subtitle1" style={{ margin: 5 }}>
              - Số lượng nhà cung cấp khác nhau:{" "}
              <text style={{ fontWeight: "bold" }}>2</text>
            </Typography>
            <Typography variant="subtitle1" style={{ margin: 5 }}>
              - Số lượt đánh giá:{" "}
              <text style={{ color: "green", fontWeight: "bold" }}>
                {" "}
                Hài lòng (2)
              </text>
              ,
              <text style={{ color: "skyblue", fontWeight: "bold" }}>
                {" "}
                Bình thường (1)
              </text> 
              ,
              <text style={{ color: "red", fontWeight: "bold" }}>
                {" "}
                Không hài lòng (0)
              </text>
            </Typography>
          </Grid>
        </Grid>
        
        {/* <Typography variant="h4" style={{ margin: 10 }}>Giao dịch gần đây</Typography>
        <p className="separator" style={{ margin: 10 }}></p>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
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
        </TableContainer>  */}
      </Card>
      }
      <div style={{display: 'flex', justifyContent: "center"}}>
        <button className="logout" onClick={handleLogout}>
          Đăng xuất  <DirectionsRunIcon style={{marginTop:"3px",fontSize:"large"}}/>
        </button>
      </div>
    </div>
  );
}
export default Profile;
