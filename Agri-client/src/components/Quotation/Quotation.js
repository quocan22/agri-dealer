import React, { useState, useEffect, useContext } from "react";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router-dom";
import SubjectIcon from "@material-ui/icons/Subject";
import { AuthContext } from "../../contexts/AuthProvider";

import "./Quotation.css";
import QuotationCell from "./QuotationCell/QuotationCell.js";

const axios = require("axios");

function Quotation() {
  const { userAcc } = useContext(AuthContext);
  const [quoReq, setQuoReq] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let loginToken = localStorage.getItem("LoginToken");
    function fetchQuoReqData() {
      axios
        .get("http://localhost:5000/api/quotationrequests", {
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((res) => {
          setQuoReq(res.data);
        }).catch(error => {
          console.log(error);
          console.log(error.data);
      });
    }
    fetchQuoReqData();
  }, []);

  return (
    <div className="quotation-container">
      <div className="quotation-heading">
        <text style={{ marginBottom: "10px" }}>BÁO GIÁ SẢN PHẨM</text>
        {!userAcc ? null : (
          <Link className="manage-link" to={"/quotation-manage"}>
            <h6 style={{ marinTop: "50px" }}>Quản lý báo giá</h6>{" "}
            <SubjectIcon style={{ color: "green", fontSize: "35" }} />
          </Link>
        )}
      </div>
      <div className="quotations-tab">
        {quoReq.map((quotationrq) => (
          <div item key={quotationrq.id}>
            <QuotationCell quotation={quotationrq} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quotation;
