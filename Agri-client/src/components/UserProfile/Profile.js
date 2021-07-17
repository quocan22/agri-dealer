import React, { useEffect, useContext, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../contexts/AuthProvider";
import { Helmet } from "react-helmet";
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import CloseIcon from '@material-ui/icons/Close';
import { Link, useHistory } from "react-router-dom";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
const axios = require("axios");

function Profile() {
  const { userAcc, logout } = useContext(AuthContext);
  const history = useHistory();
  const [userData, setUserData] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();

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

  const handleClose = () => {
    setOpen(false);
    setPreview(undefined);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
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
            <div>
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
                    >
                      <AddPhotoAlternateIcon
                        className="change-image-icon"
                        onClick={handleClickOpen}
                      ></AddPhotoAlternateIcon>
                    </CardMedia>
                  </div>
                  <h2 className="user-big-name">{userData.displayName}</h2>

                  <div className="profile-info">
                    <div className="profilecuscolumn">
                      <p>
                        <text style={{ fontWeight: "bold" }}>Email:</text>{" "}
                        {userAcc.email}{" "}
                      </p>
                      <p>
                        <text style={{ fontWeight: "bold" }}>
                          Ngày tham gia:
                        </text>{" "}
                        {new Date(userData.joinDate).toLocaleDateString(
                          "vi-VI",
                          {
                            timeZone: "UTC",
                          }
                        )}{" "}
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
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth
                maxWidth="sm"
              
              >
                <CloseIcon className="icon-exit" onClick={handleClose} style={{color:"green",marginTop:5,marginLeft:560}}></CloseIcon>
                <DialogTitle
                  align="center"
                  style={{ alignContent: "center", color: "seagreen" }}
                >
                  Cập nhật ảnh đại diện
                </DialogTitle>
                <DialogContent>
                  <div className="custom-page">
                    <div className="custom-container">
                      <div className="img-holder">
                        <img
                          src={preview ? preview : userData.avatarUrl}
                          alt=""
                          id="img"
                          className="preview-img-holder"
                        />
                      </div>
                      <div >
                      <input type="file" class="custom-file-input" onChange={onSelectFile}/>
                      <button class="button-delete"> Xóa ảnh đại diện</button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions style={{margin:10}}>
                  <Button onClick={handleClose} style={{ color: "seagreen" }}>
                    Quay lại
                  </Button>
                  <Button onClick style={{ color: "seagreen" }}>
                    Xác nhận
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
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
