import React, { useEffect, useState } from "react";
import {
  CardContent,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import "./QuotationCell.css";
const axios = require("axios");

function MyQuotationCell({ quotation }) {
  const [categoryList, setCategoryList] = useState(null);
  const [userData, setUserData] = useState([]);
  const [quotationList, setQuotationList] = useState([]);



  useEffect(() => {
    let loginToken = localStorage.getItem("LoginToken");
    axios
      .get("http://localhost:5000/api/products/categories")
      .then((response) => {
        setCategoryList(response.data);
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:5000/api/users/" + quotation.userId, {})
      .then((response) => {
        setUserData(response.data.userClaims);
      })
      .catch((error) => {
        console.log(error);
      });
    function fetchQuotationData() {
        axios.get("http://localhost:5000/api/quotations/filter",{ 
          params:
          {
            type: "requestid", 
            value: quotation.id
          },  
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
          .then((res) => {
            setQuotationList(res.data);
          }).catch(error => {
            console.log(error);
        });
      }
      fetchQuotationData();
  }, [quotation.userId, quotation.id ]);

  return (
    <div>
      <div className="quotation-rq-box">
        <CardContent className="media-body">
          <Link className="quotation-name">
            <Typography variant="h5">
              {quotation.productName}
              <span 
              onClick={()=>console.log(quotationList.lenght)}
              className="badge">{quotationList.length} Báo giá</span>
            </Typography>
          </Link>
          <Typography style={{ marginBottom: 10, fontSize: 12 }}>
            (Phân loại:{" "}
            <Link className="small-link">{quotation.categoryName}</Link>
            <subtitile2> | </subtitile2>
            Danh mục:{" "}
            <Link className="small-link">
              {categoryList
                ? categoryList.find((cate) => cate.id === quotation.categoryId)
                    .categoryName
                : ""}
            </Link>
            <subtitile2> | </subtitile2>
            Được yêu cầu bởi:{" "}
            <Link className="small-link">{userData.displayName}</Link>)
          </Typography>
          <Typography style={{ marginTop: 5, fontSize: 15 }}>
            Số lượng cần mua:
            <text style={{ margin: 5, fontWeight: "bold" }}>
              {quotation.quantity} {quotation.unit}
            </text>
          </Typography>
          <Typography style={{ fontSize: 15 }}>
            Mức giá mong muốn:
            <text style={{ margin: 5, fontWeight: "bold" }}>
              {quotation.wishPrice}₫ / {quotation.unit}
            </text>
          </Typography>
          <Typography style={{ fontSize: 15 }}>
            Ngày mua - hết hạn:
            <text style={{ margin: 5, fontWeight: "bold" }}>
              {new Date(quotation.startDate).toLocaleDateString("vi-VI", {
                timeZone: "UTC",
              })}{" "}
              -{" "}
              {new Date(quotation.endDate).toLocaleDateString("vi-VI", {
                timeZone: "UTC",
              })}
            </text>
          </Typography>
          <Typography
            style={{
              marginTop: 2,
              fontSize: 14,
              fontStyle: "italic",
              color: "grey",
            }}
          >
            "{quotation.description}"
          </Typography>
        </CardContent>
      </div>
    </div>
  );
}

export default MyQuotationCell;
