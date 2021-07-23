import { React, useEffect, useContext, useState } from "react";
import {
  Typography,
  Card,
  ListItem,
  List,
  TextField,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./ProfileSetting.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import ArrowBackOutlined from "@material-ui/icons/ArrowBackOutlined";
import { toast } from "react-toastify";
const axios = require("axios");

function ProfileSetting() {
  const { userAcc } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchProductData() {
      axios
        .get("http://localhost:5000/api/products/search", {
          params: {
            type: "userId",
            value: userAcc.id,
          },
        })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchProductData();
    fetchUserData();
    // eslint-disable-next-line
  }, []);

  function fetchUserData() {
    axios
      .get("http://localhost:5000/api/users/" + userAcc.id)
      .then((response) => {
        setUserData(response.data);
        setAddress(response.data.userClaims.address);
        setPhoneNumber(response.data.userClaims.phoneNumber);
        setDisplayName(response.data.userClaims.displayName);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateUserData = (e) => {
    e.preventDefault();
    if (displayName === "") {
      toast.error("Tên người dùng không được để trống", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    let loginToken = localStorage.getItem("LoginToken");
    const newInfo = new FormData();
    newInfo.append("id", userAcc.id);
    newInfo.append("phoneNumber", phoneNumber);
    newInfo.append("address", address);
    newInfo.append("displayName", displayName);
    axios
      .put("http://localhost:5000/api/account", newInfo, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((res) => {
        toast.success("Cập nhật thông tin thành công", {
          position: toast.POSITION.TOP_CENTER,
        });
        setOpenConfirm(false);
        fetchUserData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Cập nhật thông tin thất bại", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  const handleClickOpenConfirm = () => {
    if (
      phoneNumber === userData.userClaims.phoneNumber &&
      address === userData.userClaims.address &&
      displayName === userData.userClaims.displayName
    ) {
      toast.warning("Không có thông tin nào được thay đổi", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setOpenConfirm(true);
  };

  const handleClickOpenWarning = () => {
    if (
      phoneNumber !== userData.userClaims.phoneNumber ||
      address !== userData.userClaims.address ||
      displayName !== userData.userClaims.displayName
    ) {
      setOpenWarning(true);
    } else {
      history.goBack();
    }
  };

  return (
    <div style={{ minHeight: 600 }}>
      {userData && (
        <div className="profile-setting-container">
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            {userAcc.role === "seller"
              ? "CHỈNH SỬA THÔNG TIN NHÀ CUNG CẤP"
              : "CHỈNH SỬA THÔNG TIN CÁ NHÂN"}
          </Typography>
          <div className="profile-setting-main-grid">
            <div align="right">
              <ArrowBackOutlined
                style={{ color: "green", fontSize: "35", margin: 20 }}
                onClick={handleClickOpenWarning}
              />
            </div>
            <Card className="profile-setting">
              {userAcc.role === "seller" && (
                <div className="row" style={{ margin: 10 }}>
                  <div className="column" style={{ margin: 10, width: 425 }}>
                    <label style={{ fontSize: "18px" }}>Tên nhà vườn </label>
                  </div>
                  <div className="column">
                    <TextField
                      type="text"
                      placeholder="Tên nhà vườn"
                      variant="filled"
                      disabled
                      value={userData.sellerClaims.sellerName}
                    />
                  </div>
                </div>
              )}
              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>
                    {userAcc.role === "seller" ? "Chủ sở hữu" : "Họ và tên"}
                  </label>
                </div>
                <div className="column">
                  <TextField
                    type="text"
                    placeholder={
                      userAcc.role === "seller" ? "Chủ sở hữu" : "Họ và tên"
                    }
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Email </label>
                </div>
                <div className="column">
                  <TextField
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    variant="filled"
                    disabled
                  />
                </div>
              </div>
              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Số điện thoại </label>
                </div>
                <div className="column">
                  <TextField
                    type="number"
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Địa chỉ </label>
                </div>
                <div className="column">
                  <TextField
                    type="text"
                    placeholder={
                      userAcc.role === "seller" ? "Địa chỉ bán hàng" : "Địa chỉ"
                    }
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              {userAcc.role === "seller" && (
                <div>
                <div className="row" style={{ margin: 10 }}>
                  <div className="column" style={{ margin: 10, width: 425 }}>
                    <label style={{ fontSize: "18px" }}>
                      Sản phẩm cung cấp{" "}
                    </label>
                  </div>
                  <div className="column">
                    <Divider />
                    {products.map((product) => (
                      <List item key={product.id} container>
                        <ListItem button>
                          <Link
                            to={`post/${product.id}`}
                            className="card-content-name"
                          >
                            <Typography variant="h7" gutterBottom>
                              {product.productName}
                            </Typography>
                          </Link>
                        </ListItem>
                      </List>
                    ))}
                    <Divider />
                  </div>
                  </div>
                  <div
                      className="row"
                      style={{ margin: 10, justifyContent: "flex-end" }}
                      align="right"
                    >
                      <Link
                        to={"/selling-new-product"}
                        className="card-content-name"
                      >
                        <Button style={{ color: "seagreen" }}>
                          {" "}
                          Thêm sản phẩm
                        </Button>
                      </Link>
                    </div>
                  </div>
              )}
              <div
                className="row"
                style={{
                  margin: 10,
                  justifyContent: "center",
                }}
              >
                <button
                  className="add-product-button"
                  onClick={(e) => handleClickOpenConfirm(e)}
                >
                  Cập nhật thông tin
                </button>
              </div>
              <Dialog
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle
                  style={{ alignContent: "center", color: "seagreen" }}
                >
                  Lưu thay đổi?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Thông tin cá nhân của bạn sẽ được cập nhật
                  </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: 10 }}>
                  <Button
                    onClick={() => setOpenConfirm(false)}
                    style={{ color: "seagreen" }}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={(e) => updateUserData(e)}
                    style={{ color: "seagreen" }}
                  >
                    Xác nhận
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={openWarning}
                onClose={() => setOpenConfirm(false)}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle
                  style={{ alignContent: "center", color: "seagreen" }}
                >
                  Rời khỏi trang?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Bạn chưa cập thông tin. Bạn có muốn rời mà không hoàn tất
                    không?
                  </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: 10 }}>
                  <Button
                    onClick={() => setOpenWarning(false)}
                    style={{ color: "seagreen" }}
                  >
                    Ở lại trang
                  </Button>
                  <Button
                    onClick={() => history.goBack()}
                    style={{ color: "seagreen" }}
                  >
                    Rời khỏi trang
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProfileSetting;
