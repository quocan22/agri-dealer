import React from "react";
import { Grid } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";
import quotation from "../../assets/data/quotation";


import "./Quotation.css";
import QuotationCell from "./QuotationCell/QuotationCell.js"
function Quotation() {
  return (
    <div className="container">
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
      <button className="read-more-button">
        Xem thêm <i className="fas fa-angle-right"/>
      </button>
    </div>
  );
};

export default Quotation;
