import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import "react-tabs/style/react-tabs.css";
import quotation from "../../assets/data/quotation";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import ArrowBackOutlined from "@material-ui/icons/ArrowBackOutlined";
import "./Quotation.css";
import QuotationCell from "./QuotationCell/QuotationCell.js";

function QuotationManage() {
  const [tabAll, setTabAll] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="quotation-container">
      <div className="quotation-heading">
        <text style={{ marginBottom: "10px" }}>QUẢN LÝ BÁO GIÁ</text>
        <Link className="manage-link" to={"/quotation"}>
          <ArrowBackOutlined style={{ color: "green", fontSize: "35" }} />
        </Link>
      </div>
      <Tabs
        className="quotations-tab"
        selectedIndex={tabAll}
        onSelect={(index) => setTabAll(index)}
      >
        <TabList>
          <Tab>Yêu cầu báo giá của tôi</Tab>
          <Tab>Báo giá của tôi</Tab>
        </TabList>
        <TabPanel>
          <Link className="manage-link" to={"/new-quotation"}>
            <AddCircleIcon />
            Tạo mới
          </Link>
          <div>
            {quotation.map((quotation) => (
              <div item key={quotation.id}>
                <QuotationCell quotation={quotation} />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel style={{ width: 1000 }}></TabPanel>
      </Tabs>
    </div>
  );
}

export default QuotationManage;
