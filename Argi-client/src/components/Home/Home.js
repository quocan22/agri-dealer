import React from "react";

import Products from "../Products/Products";
import background from "../../assets/images/background3.png";
import "./Home.css";

const Home = () => {
  return (
    <div className="root">
      <img className="image-container" src={background} alt="Background" />
      <p className="home-title">
        Chào mừng đến với sàn giao dịch nông sản AgriDeal
      </p>
      <p className="home-slogan">
        Hệ thống hỗ trợ báo giá và giao dịch nông sản
      </p>
      <Products />
      <Products />
      <Products />
      <Products />
    </div>
  );
};

export default Home;
