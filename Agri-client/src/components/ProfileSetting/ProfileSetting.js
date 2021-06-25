import { React, useEffect, useContext, useState } from "react";
import {
  Typography,
  Card,
  ListItem,
  List,
  TextField,
  CardMedia,
  Divider,
  Button,
} from "@material-ui/core";
import "./ProfileSetting.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
const axios = require("axios");

function ProfileSetting() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  const { userAcc } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [seller, setSellerData] = useState([]);
  const [userData, setUserData] = useState([]);
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
          console.log(response);
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
    fetchProductData();
    fetchSellerData();
    fetchUserData();
  }, [userAcc.id, userAcc.role]);

  return (
    //THÔNG TIN NHÀ CUNG CẤP
    <div>
      {userAcc.role === "seller" ? (
        <div className="container">
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            CHỈNH SỬA THÔNG TIN NHÀ CUNG CẤP
          </Typography>
          <div className="profile-setting-main-grid">
            <Card className="profile-setting">
              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Ảnh đại diện </label>
                </div>
                <div className="column">
                  <CardMedia
                    className="setting-avatar"
                    image={
                      userData.avatarUrl
                        ? userData.avatarUrl
                        : "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg"
                    }
                  />
                </div>
              </div>

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
                    variant="filled"
                    disabled
                    value={userAcc.displayName}
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
                  <TextField type="number" placeholder="Số điện thoại" value={userData.phoneNumber} />
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
                    value={userData.phoneNumber}
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
                <button className="add-product-button">
                  Cập nhật thông tin
                </button>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        //THÔNG TIN CÁ NHÂN
        <div className="container">
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            CHỈNH SỬA THÔNG TIN CÁ NHÂN
          </Typography>
          <div className="profile-setting-main-grid">
            <Card className="profile-setting">
              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Ảnh đại diện </label>
                </div>
                <div className="column">
                  <CardMedia
                    className="setting-avatar"
                    image={
                      userData.avatarUrl
                        ? userData.avatarUrl
                        : "https://fgcucdn.fgcu.edu/_resources/images/faculty-staff-male-avatar-200x200.jpg"
                    }
                  />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Họ và tên </label>
                </div>
                <div className="column">
                  <TextField type="text" placeholder="Họ và tên" value={userData.displayName} />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Email </label>
                </div>
                <div className="column">
                  <TextField disabled                     variant="filled"
 type="email" placeholder="Email" value={userAcc.email}/>
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Số điện thoại </label>
                </div>
                <div className="column">
                  <TextField type="number" placeholder="Số điện thoại" value={userData.phoneNumber} />
                </div>
              </div>

              <div className="row" style={{ margin: 10 }}>
                <div className="column" style={{ margin: 10, width: 425 }}>
                  <label style={{ fontSize: "18px" }}>Địa chỉ </label>
                </div>
                <div className="column">
                  <TextField type="text" placeholder="Địa chỉ" value={userData.address} />
                </div>
              </div>
              <div
                className="row"
                style={{ margin: 10, justifyContent: "center" }}
              >
                <button className="add-product-button">
                  Cập nhật thông tin
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
export default ProfileSetting;
