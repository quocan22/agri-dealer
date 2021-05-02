import React from "react";
import { Grid, GridList, makeStyles } from "@material-ui/core";
import Product from "./Product/Product";
import background from "../../assets/background3.png";

const products = [
  {
    id: 1,
    name: "Tỏi Lý Sơn",
    provider: "Thương hiệu Dori",
    price: "200,000 VNĐ",
    unit: "kg",
  },
  {
    id: 2,
    name: "Chanh ta",
    provider: "Nhà vườn thành thực",
    price: "28,000 VNĐ",
    unit: "trái",
  },
  {
    id: 2,
    name: "Chanh ta",
    provider: "Nhà vườn thành thực",
    price: "28,000 VNĐ",
    unit: "trái",
  },
  {
    id: 2,
    name: "Chanh ta",
    provider: "Nhà vườn thành thực",
    price: "28,000 VNĐ",
    unit: "trái",
  },
  {
    id: 2,
    name: "Chanh ta",
    provider: "Nhà vườn thành thực",
    price: "28,000 VNĐ",
    unit: "trái",
  },
  {
    id: 2,
    name: "Chanh ta",
    provider: "Nhà vườn thành thực",
    price: "28,000 VNĐ",
    unit: "trái",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 700,
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginTop: 0,
    marginBottom: 20,
    height: "auto",
    width: "100%",
    maxWidth: 1000,
    backgroundSize: "fill",
  },
}));

const Products = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.imageContainer}>
        <img src={background} alt="Background" />
      </div>
      <GridList cellHeight={200} className={classes.gridList} cols={1}>
        <Grid container justify="flex-start" spacing={1}>
          {products.map((product) => (
            <Grid item key={product.id} item xs sm={6} md={4} lg={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </GridList>
    </div>
  );
};

export default Products;
