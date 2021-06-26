import React, { useEffect, useState, useContext } from "react";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link } from "react-router-dom";
import ArrowBackOutlined from "@material-ui/icons/ArrowBackOutlined";
import "./Quotation.css";
import QuotationCell from "./QuotationCell/QuotationCell.js";
import ListedQuotation from "./QuotationCell/ListedQuotation.js";

import { AuthContext } from "../../contexts/AuthProvider";
const axios = require("axios");

function QuotationManage() {
  const [tabAll, setTabAll] = useState(0);
  const { userAcc } = useContext(AuthContext);
  const [quoReqData, setQuoReqData] = useState([]);
  const [quotationList, setQuotationList] = useState([]);


  useEffect(() => {
    window.scrollTo(0, 0);
    let loginToken = localStorage.getItem("LoginToken");
    async function fetchQuoReqData() {
      axios
        .get("http://localhost:5000/api/quotationrequests/search", {
          params:
          {
            type: "userid",
            value: userAcc.id
          },
          headers: {
            Authorization: "Bearer " + loginToken,
          },
        })
        .then((res) => {
          setQuoReqData(res.data);
        }).catch(error => {
          console.log(error);
          console.log(error.data);
      });
    }
    async function fetchQuotationData() {
    axios.get("http://localhost:5000/api/quotations/filter",{
      params:
      {
        type: "userid", 
        value: userAcc.id
      },  
      headers: {
        Authorization: "Bearer " + loginToken,
      },
    })
      .then((res) => {
        setQuotationList(res.data);
        console.log(res.data);
      }).catch(error => {
        console.log(error);
        console.log(error.data);
    });
  }
    fetchQuotationData();
    fetchQuoReqData();
  },[userAcc.id]);

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
            <AddCircleIcon style={{ fontSize: "20" }} />
            Tạo mới
          </Link>

          <div>
            {quoReqData.length < 1 ? (
              "Hiện chưa có yêu cầu báo giá"
            ) : (
              <div>
                {quoReqData.map((quotationrq) => (
                  <div item key={quotationrq.id}>
                    <QuotationCell quotation={quotationrq} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            {quoReqData.length < 1 ? (
              "Bạn chưa báo giá sản phẩm nào"
            ) : (
              <div>
                {quotationList.map((quotation) => (
                  <div item key={quotation.id}>
                    <ListedQuotation quotation={quotation} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default QuotationManage;
