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
import "./ProfileSetting.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import ArrowBackOutlined from "@material-ui/icons/ArrowBackOutlined";
const axios = require("axios");

function ProfileSetting() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { userAcc } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [seller, setSellerData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);

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
    async function fetchSellerData() {
      if (userAcc.role === "seller") {
        axios
          .get("http://localhost:5000/api/users/seller", {
            params: {
              id: userAcc.id,
            },
          })
          .then((response) => {
            setSellerData(response.data);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
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
    fetchProductData();
    fetchSellerData();
    fetchUserData();
  }, [userAcc.id, userAcc.role]);

  const updateUserData = (e) => {
    e.preventDefault();
    let loginToken = localStorage.getItem("LoginToken");
    const newInfo = new FormData();
    newInfo.append("id", userAcc.id);
    newInfo.append("phoneNumber", phoneNumber);
    newInfo.append("address", address);
    newInfo.append("displayName", displayName);
    axios
      .put("http://localhost:5000/api/users/" + userAcc.id, newInfo, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const handleClickOpenWarning = () => {
    setOpenWarning(true);
  };

  return (
    //THÔNG TIN NHÀ CUNG CẤP
    <div>
      {userAcc.role === "seller" ? (
        <div className="profile-setting-container">
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            CHỈNH SỬA THÔNG TIN NHÀ CUNG CẤP
          </Typography>
          <div className="profile-setting-main-grid">
            <div align="right">
              <ArrowBackOutlined
                style={{ color: "green", fontSize: "35", margin: 5 }}
                onClick={handleClickOpenWarning}
              />
            </div>
            <Card className="profile-setting">
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
                    value={seller.sellerName}
                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Chủ sở hữu </label>
                </div>
                <div className="column">
                  <TextField
                    type="text"
                    placeholder="Chủ sở hữu"
                    value={userAcc.displayName}
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
                    value={userAcc.email}
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
                    value={userData.phoneNumber}
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
                    placeholder="Địa chỉ bán hàng"
                    value={userData.address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              {userAcc.role === "seller" && (
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
                    <div
                      className="row"
                      style={{ margin: 10, justifyContent: "flex-end" }}
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
                </div>
              )}
              <div
                className="row"
                style={{ margin: 10, justifyContent: "center" }}
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
                onClose={handleCloseConfirm}
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
                    onClick={handleCloseConfirm}
                    style={{ color: "seagreen" }}
                  >
                    Hủy
                  </Button>
                  <Button onClick style={{ color: "seagreen" }}>
                    Xác nhận
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={openWarning}
                onClose={handleCloseConfirm}
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
                    onClick={handleCloseWarning}
                    style={{ color: "seagreen" }}
                  >
                    Ở lại trang
                  </Button>
                  <Button style={{ color: "seagreen" }}>
                    <Link to="/profile" className="normalink">Rời khỏi trang</Link>
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
          </div>
        </div>
      ) : (
        //THÔNG TIN CÁ NHÂN
        <div className="profile-setting-container">
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            CHỈNH SỬA THÔNG TIN CÁ NHÂN
          </Typography>
          <div className="profile-setting-main-grid">
            <div align="right">
              <ArrowBackOutlined
                style={{ color: "green", fontSize: "35", margin: 5 }}
                onClick={handleClickOpenWarning}
              />
            </div>
            <Card className="profile-setting">
              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Họ và tên </label>
                </div>
                <div className="column">
                  <TextField
                    type="text"
                    placeholder="Họ và tên"
                    value={userData.displayName}
                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Email </label>
                </div>
                <div className="column">
                  <TextField
                    disabled
                    variant="filled"
                    type="email"
                    placeholder="Email"
                    value={userAcc.email}
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
                    value={userData.phoneNumber}
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
                    placeholder="Địa chỉ"
                    value={userData.address}
                  />
                </div>
              </div>
              <div
                className="row"
                style={{ margin: 10, justifyContent: "center" }}
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
                onClose={handleCloseConfirm}
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
                    onClick={handleCloseConfirm}
                    style={{ color: "seagreen" }}
                  >
                    Hủy
                  </Button>
                  <Button onClick style={{ color: "seagreen" }}>
                    Xác nhận
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={openWarning}
                onClose={handleCloseConfirm}
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
                    onClick={handleCloseWarning}
                    style={{ color: "seagreen" }}
                  >
                    Ở lại trang
                  </Button>
                  <Button onClick style={{ color: "seagreen" }}>
                    <Link to="/profile" className="normalink">Rời khỏi trang</Link>
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
