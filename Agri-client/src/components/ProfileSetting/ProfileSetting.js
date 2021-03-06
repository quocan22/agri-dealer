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
      toast.error("T??n ng?????i d??ng kh??ng ???????c ????? tr???ng", {
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
        toast.success("C???p nh???t th??ng tin th??nh c??ng", {
          position: toast.POSITION.TOP_CENTER,
        });
        setOpenConfirm(false);
        fetchUserData();
      })
      .catch((err) => {
        console.log(err);
        toast.error("C???p nh???t th??ng tin th???t b???i", {
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
      toast.warning("Kh??ng c?? th??ng tin n??o ???????c thay ?????i", {
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
              ? "CH???NH S???A TH??NG TIN NH?? CUNG C???P"
              : "CH???NH S???A TH??NG TIN C?? NH??N"}
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
                    <label style={{ fontSize: "18px" }}>T??n nh?? v?????n </label>
                  </div>
                  <div className="column">
                    <TextField
                      type="text"
                      placeholder="T??n nh?? v?????n"
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
                    {userAcc.role === "seller" ? "Ch??? s??? h???u" : "H??? v?? t??n"}
                  </label>
                </div>
                <div className="column">
                  <TextField
                    type="text"
                    placeholder={
                      userAcc.role === "seller" ? "Ch??? s??? h???u" : "H??? v?? t??n"
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
                  <label style={{ fontSize: "18px" }}>S??? ??i???n tho???i </label>
                </div>
                <div className="column">
                  <TextField
                    type="number"
                    placeholder="S??? ??i???n tho???i"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>?????a ch??? </label>
                </div>
                <div className="column">
                  <TextField
                    type="text"
                    placeholder={
                      userAcc.role === "seller" ? "?????a ch??? b??n h??ng" : "?????a ch???"
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
                      S???n ph???m cung c???p{" "}
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
                          Th??m s???n ph???m
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
                  C???p nh???t th??ng tin
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
                  L??u thay ?????i?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    Th??ng tin c?? nh??n c???a b???n s??? ???????c c???p nh???t
                  </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: 10 }}>
                  <Button
                    onClick={() => setOpenConfirm(false)}
                    style={{ color: "seagreen" }}
                  >
                    H???y
                  </Button>
                  <Button
                    onClick={(e) => updateUserData(e)}
                    style={{ color: "seagreen" }}
                  >
                    X??c nh???n
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
                  R???i kh???i trang?
                </DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ color: "black" }}>
                    B???n ch??a c???p th??ng tin. B???n c?? mu???n r???i m?? kh??ng ho??n t???t
                    kh??ng?
                  </DialogContentText>
                </DialogContent>
                <DialogActions style={{ margin: 10 }}>
                  <Button
                    onClick={() => setOpenWarning(false)}
                    style={{ color: "seagreen" }}
                  >
                    ??? l???i trang
                  </Button>
                  <Button
                    onClick={() => history.goBack()}
                    style={{ color: "seagreen" }}
                  >
                    R???i kh???i trang
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
