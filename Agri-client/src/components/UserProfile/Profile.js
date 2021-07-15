import React, { useEffect, useContext, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../contexts/AuthProvider";
import { Helmet } from "react-helmet";
import { Grid, Card, CardMedia, Typography } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import { Link, useHistory } from "react-router-dom";
const axios = require("axios");

function Profile() {
  const { userAcc, logout } = useContext(AuthContext);
  const history = useHistory();
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchUserData() {
      axios
        .get("http://localhost:5000/api/users/" + userAcc.id)
        .then((response) => {
          setUserData(response.data.userClaims);
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
      {userData && (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Thông tin cá nhân</title>
          </Helmet>
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
                      {userData.phoneNumber
                        ? userData.phoneNumber
                        : "Chưa cung cấp"}
                    </p>
                    <p>
                      <text style={{ fontWeight: "bold" }}>Địa chỉ:</text>{" "}
                      {userData.address ? userData.address : "Chưa cung cấp"}
                    </p>
                  </div>
                </div>
              </Grid>
            </Card>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="logout" onClick={handleLogout}>
              Đăng xuất{" "}
              <DirectionsRunIcon
                style={{ marginTop: "3px", fontSize: "large" }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;
