import React, { useEffect, useContext, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../contexts/AuthProvider";

import {
  Grid,
  Card,
  CardMedia,
  Typography,
  // TableContainer,
  // TableBody,
  // TableCell,
  // TableRow,
  // TableHead,
  // Table
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { Link, useHistory } from "react-router-dom";
const axios = require("axios");

function Profile() {
  const { userAcc, logout } = useContext(AuthContext);
  const history = useHistory();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchUserData() {
      // eslint-disable-next-line no-lone-blocks
      axios
        .get("http://localhost:5000/api/users/" + userAcc.id, {})
        .then((response) => {
          setUserData(response.data.userClaims);
          console.log(response.data.userClaims);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchUserData();
  }, [userAcc.id]);

  const handleLogout = () => {
    logout().then(history.push("/"));
  };

  return (
    <div className="profile-container">
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        THÔNG TIN CÁ NHÂN
      </Typography>
      {userAcc === null ? (
        <p>Đang tải dữ liệu</p>
      ) : (
        <Card className="profile-card">
          <Grid style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to={"/profile-setting"} className="card-content-name">
              <SettingsIcon fontSize="large" />
            </Link>
          </Grid>
          <Grid className="row">
            <div className="cuscolumn1">
              <CardMedia
                className="user-big-avatar"
                image={
                  userData.avatarUrl
                    ? userData.avatarUrl
                    : "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg"
                }
              />
              <h2 className="user-big-name">{userData.displayName}</h2>
            </div>
            <div className="profile-info">
              <div className="profilecuscolumn">
                <p>
                  <text style={{ fontWeight: "bold" }}>Email:</text>{" "}
                  {userAcc.email}{" "}
                </p>
                <p>
                  <text style={{ fontWeight: "bold" }}>Ngày tham gia:</text>{" "}
                  {new Date(userData.joinDate).toLocaleDateString("vi-VI", {
                    timeZone: "UTC",
                  })}{" "}
                </p>
                <p>
                  {" "}
                  <text style={{ fontWeight: "bold" }}>
                    Số điện thoại:
                  </text>{" "}
                  {userData.phonenumber
                    ? userData.phonenumber
                    : "Số điện thoại đã được ẩn"}
                </p>
                <p>
                  <text style={{ fontWeight: "bold" }}>Địa chỉ:</text>{" "}
                  {userData.address}
                </p>
              </div>
            </div>
          </Grid>
        </Card>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="logout" onClick={handleLogout}>
          Đăng xuất{" "}
          <DirectionsRunIcon style={{ marginTop: "3px", fontSize: "large" }} />
        </button>
      </div>
    </div>
  );
}
export default Profile;
