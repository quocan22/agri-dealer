import React, { useState, useContext, useEffect } from "react";
import { Card, CardMedia, Grid, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./CartCell.css";
import { AuthContext } from "../../../contexts/AuthProvider";
const axios = require("axios");

function CartCell({ cproduct, remove }) {
  const { userAcc } = useContext(AuthContext);
  const [buyQuantity, setBuyQuantity] = useState(cproduct.buyQuantity);
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    function fetchCartData() {
      let loginToken = localStorage.getItem("LoginToken");
      axios
        .get("http://localhost:5000/api/carts/currentcart", {
          params: {
            userId: userAcc.id,
          },
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((res) => {
          setCartId(res.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchCartData();
  }, [userAcc.id]);

  const handleQuantity = (buyQuantity) => {
    let loginToken = localStorage.getItem("LoginToken");
    let changeData = new FormData();
    changeData.append("id", cartId);
    changeData.append("productId", cproduct.productId);
    changeData.append("newAmount", buyQuantity);
    console.log(cproduct.productId);
    console.log(buyQuantity);
    axios
      .put("http://localhost:5000/api/carts/changeamount", changeData, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then(() => {
        setBuyQuantity(buyQuantity);
      })
      .catch((err) => console.log(err));
  };

  function addQuantity() {
    if (buyQuantity === cproduct.maxPurchase) return;
    handleQuantity(buyQuantity + 1);
  }

  function subtractQuantity() {
    if (buyQuantity === cproduct.minPurchase) return;
    handleQuantity(buyQuantity - 1);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="cart-container">
      <Grid className="provider-table">
        <Card className="row">
          <Grid className="product-details">
            <Link>
              <CardMedia
                className="media-object"
                image={cproduct.productImage}
              />
            </Link>
            <Link className="quotation-name">
              <Typography variant="subtitle2" style={{ fontSize: 17 }}>
                {cproduct.productName}
              </Typography>
            </Link>
          </Grid>

          <p
            variant="subtitle2"
            style={{
              color: "orange",
              height: "auto",
              width: "fit-content",
              margin: 20,
            }}
          >
            {numberWithCommas(cproduct.productPrice)}₫
          </p>
          <p className="quantity" style={{ margin: 20, width: 200 }}>
            <button className="qtyBtn" onClick={subtractQuantity}>
              <i className="fas fa-minus" />
            </button>
            <input
              className="qtyBox"
              type="number"
              onChange={(e) => handleQuantity(e.target.value)}
              value={buyQuantity}
            />
            <button className="qtyBtn" onClick={addQuantity}>
              <i className="fas fa-plus" />
            </button>{" "}
          </p>
          <Button
            onClick={() => remove(cproduct.productId)}
            className="del-btn"
          >
            Xóa
          </Button>
        </Card>
      </Grid>
    </div>
  );
}

export default CartCell;
