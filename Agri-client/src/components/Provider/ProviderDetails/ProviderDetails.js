import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProviderDetails.css";
import {
  Grid,
  Typography,
  CardMedia,
  CardContent,
  makeStyles,
} from "@material-ui/core";

const axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    paddingTop: "80%",
  },
  cardContentPrice: {
    display: "flex",
    justifyContent: "flex-start",
    color: "orange",
  },
}));

function ProviderDetails() {
  const [products, setProducts] = useState([]);
  const [owner, setOwnerData] = useState([]);
  const { providerId } = useParams();
  const [sellerName, setSellerName] = useState("");
  const [brandName, setBrandName] = useState(0);
  const [address, setAddress] = useState("");
  const [joinDate, setJoinDate] = useState(0);
  const [scale, setScale] = useState(0);
  const [capacity, setCapacity] = useState("");
  const [production, setProduction] = useState("");

  const classes = useStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchProviderDetail() {
      axios
        .get("http://localhost:5000/api/users/seller/", {
          params: {
            id: providerId,
          },
        })
        .then((response) => {
          setSellerName(response.data.sellerName);
          setBrandName(response.data.brandName);
          setAddress(response.data.address);
          setJoinDate(response.data.joinDate);
          setScale(response.data.scale);
          setCapacity(response.data.capacity);
          setProduction(response.data.production);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    async function fetchUserData() {
      // eslint-disable-next-line no-lone-blocks
      axios
        .get("http://localhost:5000/api/users/" + providerId, {})
        .then((response) => {
          setOwnerData(response.data.userClaims);
          console.log(response.data.userClaims);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    async function fetchProductData() {
      axios
        .get("http://localhost:5000/api/products/search", {
          params: {
            type: "userId",
            value: providerId,
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
    fetchProviderDetail();
    fetchUserData();
    fetchProductData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="provider-detail-container">
      <div className="main-grid">
        {
          <div className="information-details">
            <div className="information-box">
              <div className="big-img">
                <img src={owner.avatarUrl} alt="" />
              </div>
              <div className="information">
                <h2>{sellerName}</h2>
                <div className="information-description">
                  <div className="cuscolumn1">
                    <p>Chủ sở hữu:</p>
                    <p>Thương hiệu:</p>
                    <p>Địa chỉ: </p>
                    <p>Ngày tham gia: </p>
                    <p>Quy mô nhà vườn:</p>
                    <p>Sản lượng cung cấp: </p>
                  </div>
                  <div className="cuscolumn2">
                    <p>{owner.displayName}</p>
                    <p>{brandName}</p>
                    <p>{address}</p>
                    <p>
                      {new Date(joinDate).toLocaleDateString("vi-VI", {
                        timeZone: "UTC",
                      })}
                    </p>
                    <p>{scale}</p>
                    <p>{capacity}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="production">
              <h2>GIỚI THIỆU</h2>
              <br />
              <p>{production}</p>
            </div>
          </div>
        }
      </div>
      <div className="products">
        <div
          style={{
            height: 50,
            fontSize: 25,
            padding: 16,
            backgroundColor: "seagreen",
          }}
        >
          DANH SÁCH SẢN PHẨM CUNG CẤP
        </div>
        <Grid className="list-item" container justify="flex-start" spacing={1}>
          {products.map((product) => (
            <Grid item key={product.id} xs sm={6} md={4} lg={3}>
              <div className="product">
                <Link to={`/post/${product.id}`}>
                  <CardMedia
                    className={classes.media}
                    image={product.imageUrl}
                    title={product.productName}
                  />
                </Link>
                <CardContent>
                  <Link
                    to={`/post/${product.id}`}
                    className="product-name"
                    justify="center"
                  >
                    <Typography variant="h6" style={{ fontWeight: "550" }}>
                      {product.productName}
                    </Typography>
                  </Link>
                </CardContent>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
export default ProviderDetails;
