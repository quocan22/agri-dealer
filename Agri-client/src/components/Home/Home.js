import React, { useState } from "react";

import Products from "../Products/Products";
import background from "../../assets/images/background3.png";
import "./Home.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import fruitLogo from "../../assets/images/fruit.png";
import vegetableLogo from "../../assets/images/vegetable.png";
import flowerLogo from "../../assets/images/flower.png";

const Home = () => {
  const [tabAll, setTabAll] = useState(0);
  const [tabFruit, setTabFruit] = useState(0);
  const [tabVegetable, setTabVegetable] = useState(0);
  const [tabFlower, setTabFlower] = useState(0);

  return (
    <div className="root">
      <img className="image-container" src={background} alt="Background" />
      <p className="home-title">
        Chào mừng đến với sàn giao dịch nông sản AgriDeal
      </p>
      <p className="home-slogan">
        Hệ thống hỗ trợ báo giá và giao dịch nông sản
      </p>
      <Tabs
        className="products-tab"
        selectedIndex={tabAll}
        onSelect={(index) => setTabAll(index)}
      >
        <TabList>
          <Tab>Sản phẩm có sẵn</Tab>
          <Tab>Sản phẩm bán trước</Tab>
        </TabList>
        <TabPanel>
          <Products type="catename" value="all" />
        </TabPanel>
        <TabPanel style={{width: 1000}}></TabPanel>
      </Tabs>
      <button className="read-more-button">
        Xem thêm <i className="fas fa-angle-right" />
      </button>
      <Tabs
        className="products-tab"
        selectedIndex={tabFruit}
        onSelect={(index) => setTabFruit(index)}
      >
        <TabList>
          <img className="img-product-start" src={fruitLogo} alt="fruit" />
          <button className="cate-button">Trái cây</button>
          <Tab>Sản phẩm có sẵn</Tab>
          <Tab>Sản phẩm bán trước</Tab>
        </TabList>
        <TabPanel>
          <Products type="catename" value="Trái cây" />
        </TabPanel>
        <TabPanel style={{width: 1000}}></TabPanel>
      </Tabs>
      <button className="read-more-button">
        Xem thêm <i className="fas fa-angle-right" />
      </button>
      <Tabs
        className="products-tab"
        selectedIndex={tabVegetable}
        onSelect={(index) => setTabVegetable(index)}
      >
        <TabList>
          <img className="img-product-start" src={vegetableLogo} alt="fruit" />
          <button className="cate-button">Rau củ quả</button>
          <Tab>Sản phẩm có sẵn</Tab>
          <Tab>Sản phẩm bán trước</Tab>
        </TabList>
        <TabPanel>
          <Products type="catename" value="Rau củ quả" />
        </TabPanel>
        <TabPanel style={{width: 1000}}></TabPanel>
      </Tabs>
      <button className="read-more-button">
        Xem thêm <i className="fas fa-angle-right" />
      </button>
      <Tabs
        className="products-tab"
        selectedIndex={tabFlower}
        onSelect={(index) => setTabFlower(index)}
      >
        <TabList>
          <img className="img-product-start" src={flowerLogo} alt="fruit" />
          <button className="cate-button">Hoa tươi</button>
          <Tab>Sản phẩm có sẵn</Tab>
          <Tab>Sản phẩm bán trước</Tab>
        </TabList>
        <TabPanel>
          <Products type="catename" value="Hoa tươi" />
        </TabPanel>
        <TabPanel style={{width: 1000}}></TabPanel>
      </Tabs>
      <button className="read-more-button">
        Xem thêm <i className="fas fa-angle-right" />
      </button>
    </div>
  );
};

export default Home;
