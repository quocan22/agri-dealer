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
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import CloseIcon from "@material-ui/icons/Close";
import { Link, useHistory } from "react-router-dom";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { toast } from "react-toastify";
const axios = require("axios");

function Profile() {
  const { userAcc, logout } = useContext(AuthContext);
  const history = useHistory();
  const [userData, setUserData] = useState(undefined);
  const [open, setOpen] = useState(false);
  const [openDelConfirm, setOpenDelConfirm] = useState(false);

  const [preview, setPreview] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [onUpdate, setOnUpdate] = useState(false);
  const [onChange, setOnChange] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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
  }, [userAcc, onChange]);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const updateAvatar = (e) => {
    e.preventDefault();
    if (!onUpdate) {
      setOpen(false);
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    let updateAvatarForm = new FormData();
    updateAvatarForm.append("id", userAcc.id);
    updateAvatarForm.append("file", selectedFile);
    axios
      .put("http://localhost:5000/api/account/changeavatar", updateAvatarForm, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then(() => {
        setOpen(false);
        setOnUpdate(false);
        setOnChange(!onChange);
        toast.success("Cập nhật ảnh đại diện thành công", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => console.error(error));
  };

  const deleteAvatar = (e) => {
    e.preventDefault();
    if (!userData.avatarUrl) {
      setOpen(false);
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    let userId = localStorage.getItem("UserId");
    let deleteForm = new FormData();
    deleteForm.append("id", userId);
    axios
      .put("http://localhost:5000/api/account/deleteavatar", deleteForm, {
        headers: {
          Authorization: "Bearer " + loginToken, 
        },
      })
      .then(() => {
        setOpen(false);
        setOnChange(!onChange);
        setPreview(undefined);
        setOpenDelConfirm(false);
        toast.success("Xóa ảnh đại diện thành công", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((error) => console.error(error));
  };

  const handleLogout = () => {
    logout().then(history.push("/"));
  };

  const handleClose = () => {
    setOpen(false);
    setPreview(undefined);
  };

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setOnUpdate(true);
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
                      <button className="change-image-button">
                        <AddPhotoAlternateIcon
                          className="change-image-icon"
                          onClick={() => setOpen(true)}
                        ></AddPhotoAlternateIcon>
                      </button>
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
                <DialogTitle
                  align="center"
                  style={{
                    verticalAlign: "middle",
                    color: "seagreen",
                    borderBottom: "1px solid rgb(212, 212, 212)",
                  }}
                >
                  <div className="custom-dialog-title">
                    <text>Cập nhật ảnh đại diện</text>
                    <button className="button-exit">
                      <CloseIcon
                        className="icon-exit"
                        onClick={handleClose}
                      ></CloseIcon>
                    </button>
                  </div>
                </DialogTitle>
                <DialogContent>
                  <div className="custom-page">
                    <div className="custom-container">
                      <div className="img-holder">
                        <img
                          src={
                            preview
                              ? preview
                              : userData.avatarUrl && userData.avatarUrl
                              ? userData.avatarUrl
                              : "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg"
                          }
                          alt=""
                          id="img"
                          className="preview-img-holder"
                        />
                      </div>
                      <div className="uppload-button-group">
                        <div className="input-wrapper">
                          <input
                            type="file"
                            accept="image/*"
                            class="custom-file-input"
                            onChange={onSelectFile}
                          />
                        </div>
                        {userAcc.role === "user" && userData.avatarUrl && (
                          <button
                            onClick={() => setOpenDelConfirm(true)}
                            class="button-delete"
                          >
                            Xóa ảnh đại diện
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogContent>
                <DialogActions style={{ margin: 10 }}>
                  <Button onClick={handleClose} style={{ color: "seagreen" }}>
                    Quay lại
                  </Button>
                  <Button
                    onClick={(e) => updateAvatar(e)}
                    style={{ color: "seagreen" }}
                  >
                    Xác nhận
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={openDelConfirm}
                onClose={() => setOpenDelConfirm(false)}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle
                  style={{ alignContent: "center", color: "seagreen" }}
                >
                  Xóa ảnh đại diện?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Ảnh đại diện sẽ trở về mặc định? Bạn có muốn xóa ảnh?
                  </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: 10 }}>
                  <Button
                    onClick={() => setOpenDelConfirm(false)}
                    style={{ color: "seagreen" }}
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    onClick={(e) => deleteAvatar(e)}
                    style={{ color: "red" }}
                  >
                    Xóa ảnh
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
