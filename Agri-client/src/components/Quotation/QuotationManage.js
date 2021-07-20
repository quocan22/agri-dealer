import React, { useEffect, useState, useContext } from "react";
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Link, useHistory } from "react-router-dom";
import ArrowBackOutlined from "@material-ui/icons/ArrowBackOutlined";
import "./Quotation.css";
import MyQuotationCell from "./QuotationCell/MyQuotationCell.js";

import ListedQuotation from "./QuotationCell/ListedQuotation.js";

import { AuthContext } from "../../contexts/AuthProvider";
const axios = require("axios");

function QuotationManage() {
  const history = useHistory();
  const [tabAll, setTabAll] = useState(0);
  const { userAcc } = useContext(AuthContext);
  const [quoReqData, setQuoReqData] = useState([]);
  const [quotationList, setQuotationList] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    function fetchQuoReqData() {
      axios
        .get("http://localhost:5000/api/quotationrequests/search", {
          params: {
            type: "userid",
            value: userAcc.id,
          },
        })
        .then((res) => {
          setQuoReqData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    function fetchQuotationData() {
      axios
        .get("http://localhost:5000/api/quotations/filter", {
          params: {
            type: "userid",
            value: userAcc.id,
          },
        })
        .then((res) => {
          setQuotationList(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchQuotationData();
    fetchQuoReqData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="quotation-container">
      <div className="quotation-heading">
        <text style={{ marginBottom: "10px" }}>QUẢN LÝ BÁO GIÁ</text>
        <ArrowBackOutlined
          onClick={() => history.goBack()}
          style={{ color: "green", fontSize: "35", cursor: "pointer" }}
        />
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
                    <MyQuotationCell quotation={quotationrq} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabPanel>
        <TabPanel>
          <div>
            {quotationList.length < 1 ? (
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
