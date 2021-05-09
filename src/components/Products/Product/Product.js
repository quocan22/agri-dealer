import React from "react";
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
    height: "100%",
    paddingTop: "100%",
  },
  cardContentPrice: {
    display: "flex",
    justifyContent: "flex-start",
    color: "orange",
  },
}));

const Product = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Link to="/post">
        <CardMedia className={classes.media} image={product.imgsrc} title={product.name} />
      </Link>
      <CardContent>
        <Link to="/post" className="card-content-name">
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
        </Link>
        <div className={classes.cardContentPrice}>
          <Typography variant="subtitle1">
            {product.price}
            <subtitile1> / </subtitile1>
            {product.unit}
          </Typography>
        </div>
        <Typography variant="subtitle1" color="textSecondary">
          <subtitile1
            className="fas fa-map-marker-alt"
            style={{ color: "green" }}
          ></subtitile1>{" "}
          {product.provider}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
