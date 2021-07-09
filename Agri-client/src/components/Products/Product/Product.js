import {React, useEffect, useState} from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Product.css";


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
const axios = require("axios");


const Product = ({ product }) => {
  const classes = useStyles();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [providerId, setProviderId] = useState([]);
  useEffect(() => {
    async function fetchProvidersData() {
      axios
        .get("http://localhost:5000/api/users/sellers", {})
        .then((response) => {
          setProviderId(response.data.find(provider => provider.sellerName === product.sellerName).userId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchProvidersData();
  }, [product.sellerName]);
  return (
    <Card className={classes.root}>
      <Link to={`/post/${product.id}`}>
        <CardMedia className={classes.media} image={product.imageUrl} title={product.productName} />
      </Link>
      <CardContent>
        <Link to={`/post/${product.id}`} className="card-content-name">
          <Typography variant="h6" gutterBottom>
            {product.productName}
          </Typography>
        </Link>
        <div className={classes.cardContentPrice}>
          <Typography variant="subtitle1">
            {numberWithCommas(product.price)}
            <subtitile1> đ / </subtitile1>
            {product.unit}
          </Typography>
        </div>
        <Typography variant="subtitle2" color="textSecondary">
          <Link to={`/pvdetails/${providerId}`} className="provider-name">
          <subtitile2
            className="fas fa-map-marker-alt"
            style={{ color: "green" }}
          ></subtitile2>{" "}
          {product.sellerName}
          </Link>
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Tối thiểu: {product.minPurchase} {product.unit}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
