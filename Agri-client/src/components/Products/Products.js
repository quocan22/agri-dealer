import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import "react-tabs/style/react-tabs.css";

import Product from "./Product/Product";
import "./Products.css";

const axios = require("axios");

const Products = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      axios.get('http://localhost:5000/api/products/search', {
        params: {
          type: "categoryid",
          value: props.cate,
        },
      })
        .then(response => {
          setProducts(response.data);
        }).catch(error => {
          console.log(error);
        })
    }
    fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container">
      <Tabs
        className="products-tab"
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          {props.cate !== "all" ? <button className="cate-button">{props.cate}</button> : null}
          <Tab>Sản phẩm có sẵn</Tab>
          <Tab>Sản phẩm bán trước</Tab>
        </TabList>
        <TabPanel>
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
        </TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
      <button className="read-more-button">
        Xem thêm <i className="fas fa-angle-right"/>
      </button>
    </div>
  );
};

export default Products;
