import React, { useEffect } from "react";
import "react-tabs/style/react-tabs.css";
import quotation from "../../assets/data/quotation";
import { Link } from "react-router-dom";
import SubjectIcon from '@material-ui/icons/Subject';

import "./Quotation.css";
import QuotationCell from "./QuotationCell/QuotationCell.js";

function Quotation() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="container">
        <div className="quotation-heading">
      <text style={{ marginBottom: "10px" }}>
        BÁO GIÁ SẢN PHẨM
      </text>
            <Link className="manage-link" to={"/quotation-manage"}>     
            <h6 style={{marinTop:"50px"}}>Quản lý báo giá</h6> <SubjectIcon style={{ color:"green", fontSize:"35"}} />
            </Link>
          </div>
          <div className="quotations-tab">
        {quotation.map((quotation) => (
          <div item key={quotation.id}>
            <QuotationCell quotation={quotation} />
          </div>
        ))}
        </div>
    </div>
  );
}

export default Quotation;
