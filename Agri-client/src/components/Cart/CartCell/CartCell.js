import React from "react";
import {
  Card,
  CardMedia,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./CartCell.css";

function CartCell({ cproduct }) {


  const   handleQuantity = (event) => {
    const value = event.target.value;
    if (value < 1 || value > this.state.maxQuantity) return;
    this.setState({
      quantity: value,
    });
  };

  const addQuantity = () =>{
    if (this.state.quantity === this.state.maxQuantity) return;
    this.setState({
      quantity: this.state.quantity + 1,
    })
  };

  const subtractQuantity =() =>{
    if (this.state.quantity === 1) return;
    this.setState({
      quantity: this.state.quantity - 1,
    })
  }

  return (
    <div className ="cart-container"> 
      <Grid className="provider-table">
        <Card className="row">
        <Grid className="product-details">
          <Link>
            <CardMedia
              className="media-object"
              image={cproduct.imgsrc}
              title={cproduct.name}
            />
          </Link>

          <Link className="quotation-name">
            <Typography variant="subtitle2" style={{fontSize:17}}>{cproduct.name}</Typography>
        </Link>
        </Grid>
                  
            <p variant="subtitle2" style={{color:"orange", height: "auto",width: "fit-content",margin: 20}}>12.301.230₫</p>
        <p className="quantity" style={{margin:20, width:200}}>
            <button className="qtyBtn" onClick={subtractQuantity}>
              <i className="fas fa-minus" />
            </button>
            <input
              className="qtyBox"
              type="number"
              onChange={handleQuantity}
            />
            <button className="qtyBtn" onClick={addQuantity}>
              <i className="fas fa-plus" />
            </button>{" "}
          </p>
          <Button className="del-btn">
          Xóa
          </Button>
          </Card>
      </Grid>
    </div>
  );
}

export default CartCell;
