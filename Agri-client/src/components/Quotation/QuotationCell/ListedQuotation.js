import React from "react";
import { CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./QuotationCell.css";

function ListedQuotation({ quotation }) {
  const badgeColor = (state) => {
    let color;
    switch (state) {
      case "pending":
        color = "orange";
        break;
      case "canceled":
        color = "red";
        break;
      case "confirmed":
        color = "green";
        break;
      default:
        break;
    }
    return color;
  };
  const badgeText = (state) => {
    switch (state) {
      case "pending":
        return "Đang xử lý";
      case "canceled":
        return "Đã hủy";
      case "confirmed":
        return "Đã xác nhận";
      default:
        break;
    }
  };
  return (
    <div className="quotation-box">
      <CardContent className="media-body">
        <Link className="quotation-name">
          <Typography variant="h5">
            {quotation.requestName}
            <span
              className="badge"
              style={{ backgroundColor: badgeColor(quotation.state) }}
            >
              {badgeText(quotation.state)}
            </span>
          </Typography>
        </Link>

        <Typography style={{ marginBottom: 5, fontSize: 12 }}>
          (Được yêu cầu bởi:{" "}
          <Link className="small-link">{quotation.requestUser}</Link>)
        </Typography>
        <Typography style={{ fontSize: 15 }}>
          Đã trả giá:
          <text style={{ margin: 5, fontWeight: "bold" }}>
            {quotation.quotePrice}₫ /{quotation.requestUnit}
          </text>
        </Typography>
        <Typography style={{ fontSize: 15 }}>
          Lời nhắn:{" "}
          <text
            style={{
              marginTop: 2,
              fontSize: 14,
              fontStyle: "italic",
              color: "grey",
            }}
          >
            "{quotation.description}"
          </text>
        </Typography>
      </CardContent>
    </div>
  );
}

export default ListedQuotation;
