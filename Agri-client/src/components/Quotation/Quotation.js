import React, { useEffect } from "react";
import { Grid,Typography } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";
import quotation from "../../assets/data/quotation";
import { Link } from "react-router-dom";



import "./Quotation.css";
import QuotationCell from "./QuotationCell/QuotationCell.js"
function Quotation() {

  useEffect(() => {
    window.scrollTo(0, 0);
  })

  return (
    <div className="container">
                  <Typography variant="h4" style={{marginBottom:"10px"}}>BÁO GIÁ SẢN PHẨM</Typography>
    <Grid
            className="list-item"
            container
            justify="flex-start"
            spacing={1}
          >
            {quotation.map((quotation) => (
              <Grid item key={quotation.id} >
                <QuotationCell quotation={quotation} />
              </Grid>
            ))}
          </Grid>        
    </div>
  );
};

export default Quotation;
