import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  cardContentName: {
    display: "flex",
    justifyContent: "flex-start",
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
      <CardMedia className={classes.media} image="" title={product.name} />
      <CardContent>
        <div className={classes.cardContentName}>
          <Typography variant="h6" gutterBottom>
            {product.name}
          </Typography>
        </div>
        <div className={classes.cardContentPrice}>
          <Typography variant="subtitle1">
            {product.price}
            <subtitile1> / </subtitile1>
            {product.unit}
          </Typography>
        </div>
        <Typography variant="subtitle2" color="textSecondary">
          <a className="fas fa-map-marker-alt" style={{ color: "green" }}></a>{" "}
          {product.provider}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Product;
