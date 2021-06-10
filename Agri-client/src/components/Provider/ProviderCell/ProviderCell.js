import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./ProviderCell.css";

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

  return (
    <Card className="card-content-box">
      <Link to="/pvdetails">
        <CardMedia className={classes.media} image = {provider.imgsrc} title ={provider.name}/>
      </Link>
      <CardContent>
      <Link to="/pvdetails" className="card-content-name">
          <Typography variant="h6" gutterBottom>
            {provider.name}
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
        {provider.product.map((img) => (
          <img src={img} alt=""/>
        ))}
      </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCell;
