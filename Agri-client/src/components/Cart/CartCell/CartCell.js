import React, {useState, useContext} from "react";
import {
  Card,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./CartCell.css";
import { AuthContext } from "../../../contexts/AuthProvider";
const axios = require("axios");


function CartCell({ cproduct }) {
   const { userAcc } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(cproduct.buyQuantity);
  const [minPurchase, setMinPurchase] = useState(0);
  
  const handleQuantity = (event) => {
    const value = event.target.value;
    if (value < 1 || value > quantity) return;
    setBuyQuantity(value);
  };

  function addQuantity() {
    if (buyQuantity === quantity) return;
    setBuyQuantity(buyQuantity + 1);
  }

  function subtractQuantity() {
    if (buyQuantity === minPurchase) return;
    setBuyQuantity(buyQuantity - 1);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function removeProduct()
  { 
    console.log(cproduct.productId);
    let loginToken = localStorage.getItem("LoginToken");
    let removeData = new FormData();
    removeData.append("id", "60de7dc64a393873f4f3f323");
    removeData.append("productId", cproduct.productId);
    axios
      .delete("http://localhost:5000/api/carts/removeproduct", removeData, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  
  return (
    <div className ="cart-container"> 
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
            <Typography variant="subtitle2" style={{fontSize:17}}>{cproduct.productName}</Typography>
        </Link>
        </Grid>
                  
            <p variant="subtitle2" style={{color:"orange", height: "auto",width: "fit-content",margin: 20}}>{numberWithCommas(cproduct.productPrice)}₫</p>
        <p className="quantity" style={{margin:20, width:200}}>
            <button className="qtyBtn" onClick={subtractQuantity}>
              <i className="fas fa-minus" />
            </button>
            <input
              className="qtyBox"
              type="number"
              
              onChange={handleQuantity}
              value={buyQuantity}
            />
            <button className="qtyBtn" onClick={addQuantity}>
              <i className="fas fa-plus" />
            </button>{" "}
          </p>
          <Button onCLick={removeProduct} className="del-btn" >
          Xóa
          </Button>
          </Card>
      </Grid>
    </div>
  );
}

export default CartCell;
