import React, {useState, useEffect} from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./ProviderCell.css";
const axios = require("axios");


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    paddingTop: "50%",
  }
}));

function ProviderCell({ provider }) {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [owner, setOwnerData] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      axios.get('http://localhost:5000/api/products/search', {
        params: {
          type: "userId",
          value: provider.userId,
        },
        }).then(response => {
          setProducts(response.data);
          console.log(response.data);
        }).catch(error => {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log(error);
        })
    }
    async function fetchUserData() {
      axios
        .get("http://localhost:5000/api/users/" + provider.userId, {})
        .then((response) => {
          setOwnerData(response.data.userClaims);
          console.log(response.data.userClaims);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchProductData();
    fetchUserData();
  }, [provider.userId])
  return (
    <Card className="card-content-box">
      <Link to={`/pvdetails/${provider.userId}`}>
        <CardMedia className={classes.media} image = {owner.avatarUrl} title ={provider.sellerName}/>
      </Link>
      <CardContent>
      <Link to={`/pvdetails/${provider.userId}`} className="card-content-name">
          <Typography variant="h6" gutterBottom>
            {provider.sellerName}
          </Typography>
        </Link>
        <div className="card-content-address">
        <Typography variant="subtitle1" color="textSecondary">
          <subtitile1
            className="fas fa-map-marker-alt"
            style={{ color: "green" } }
          ></subtitile1>{" "}
            {provider.address} 
        </Typography>
        </div>
        <div className="product-cont" >
        {products.map((img) => (
          <Link to={`/post/${img.id}`}>
          <img src={img.imageUrl} alt=""/>
          </Link>
        ))}
      </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCell;
