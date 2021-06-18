import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";


import Product from "./Product/Product";
import "./Products.css";

const axios = require("axios");

const Products = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      axios.get('http://localhost:5000/api/products/search', {
          params: {
            type: props.type,
            value: props.value,
          },
        }).then(response => {
            setProducts(response.data);
        }).catch(error => {
          console.log(error);
        })
    }
    fetchProductData();
  }, [props])

  return (
    <div className="container">
      {products.length < 1 ? 
      <p>Không tìm thấy sản phẩm phù hợp</p> :
      <Grid
        className="list-item"
        container
        justify="flex-start"
        spacing={1}
      >
        {products.map((product) => (
          <Grid item key={product.id} xs sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
      }
    </div>
  );
};

export default Products;
