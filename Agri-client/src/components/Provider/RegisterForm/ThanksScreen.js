import React from "react";

import {Grid }from "@material-ui/core";
import { Link } from "react-router-dom";

import "react-tabs/style/react-tabs.css";


const ThanksScreen = () => { 
  return (
    <div className="root">
      <p className="home-title">
        Cảm ơn bạn đã tham gia cùng chúng tôi!
      </p>
      <p className="home-slogan">
        Yêu cầu của bạn đã được gửi đi, bạn sẽ nhận được thông báo ngay khi hệ thống xác nhận được thông tin.
      </p>
      <img className="image-container" src={"https://www.globalcommunities.org/files/images/ecaf-banner.jpg"} alt="Background" />

      <Grid style={{marginTop:"20px",marginLeft:"150px"}}>
      <Link to={"/"}  >
            <button className="add-product-button">
        Trở về trang chủ
      </button>
      </Link> 
      </Grid>
      </div>
  )}
  export default ThanksScreen;
