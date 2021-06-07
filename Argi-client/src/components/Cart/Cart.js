import React, { useState } from "react";
import { Grid, Typography, Card, Button } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";
import quotation from "../../assets/data/quotation"
import CartCell from "./CartCell/CartCell"

import "./Cart.css";
import { blueGrey, grey } from "@material-ui/core/colors";
function Cart() {
  return (

    <div className="cart container">
         <Typography variant="h5" className="cart-title">
                GIỎ HÀNG
            </Typography>
        <Grid className="cart-row">
           <Grid className="col-1">
           <Grid className="row" style={{marginLeft:10}}>
           <Card
            className="list-item"
            justify="flex-start"
          >
            <Typography vartiant="h3">Công ty Dori</Typography>
            {quotation.map((cproduct) => (
              <Grid>
                <CartCell cproduct={cproduct} />
              </Grid>
            ))}
          </Card>
          </Grid>
           </Grid>

           <Grid className="col-2">
           <Card className="price-card" style={{margin:10}}>
             <Grid className="row">
            <Typography variant="subtitle1" style={{ margin: 5, alignContent:"flex-end" }}>
              Tạm tính:
            </Typography>
            <text style={{margin: 9, alignContent:"center", fontWeight: "bold" }}>10.000.000₫</text>
            </Grid>

            <Grid className="row">
            <Typography variant="subtitle1" style={{ margin: 5 }}>
              Giao hàng:
            </Typography>
            <text style={{margin: 9, alignContent:"center", fontWeight: "bold" }}>500.000₫</text>
            </Grid>

            <p className="separator" style={{ margin: 5 }}></p>
            <Grid className="row">
            <Typography variant="h6" style={{ margin: 5, width:"fit-content",fontWeight:550, fontSize:19 }}>
              Thành tiền:
            </Typography>
            <text style={{ marginTop: 10, alignContent:"center",fontWeight:650, fontSize:18, color:"red"}}>10.500.000₫</text>
            </Grid>
            </Card>
            <Button className="buy-btn">đặt hàng</Button>
          </Grid>
          
        </Grid>        
    </div>
  );
};

export default Cart;
