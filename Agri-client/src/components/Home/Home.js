import React, { useState, useEffect } from "react";
import Products from "../Products/Products";
import background from "../../assets/images/background3.png";
import "./Home.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "react-tabs/style/react-tabs.css";
import fruitLogo from "../../assets/images/fruit.png";
import vegetableLogo from "../../assets/images/vegetable.png";
import flowerLogo from "../../assets/images/flower.png";

const Home = () => {
  const [tabAll, setTabAll] = useState(0);
  const [tabFruit, setTabFruit] = useState(0);
  const [tabVegetable, setTabVegetable] = useState(0);
  const [tabFlower, setTabFlower] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="root">
      <Helmet>
        <meta charSet="utf-8" />
        <title>AgriDeal - Sàn giao dịch nông sản</title>
      </Helmet>
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
        <TabPanel style={{ width: 1000 }}></TabPanel>
      </Tabs>
      <Link to={`/search?type=catename&value=all`}>
        <button className="read-more-button">
          Xem thêm <i className="fas fa-angle-right" />
        </button>
      </Link>
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
          <Products limit={8} type="catename" value="Trái cây" />
        </TabPanel>
        <TabPanel style={{ width: 1000 }}></TabPanel>
      </Tabs>
      <Link to={`/search?type=catename&value=Trái%20cây&limit=0`}>
        <button className="read-more-button">
          Xem thêm <i className="fas fa-angle-right" />
        </button>
      </Link>
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
          <Products limit={8} type="catename" value="Rau củ quả" />
        </TabPanel>
        <TabPanel style={{ width: 1000 }}></TabPanel>
      </Tabs>
      <Link to={`/search?type=catename&value=Rau%20củ%20quả&limit=0`}>
        <button className="read-more-button">
          Xem thêm <i className="fas fa-angle-right" />
        </button>
      </Link>
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
          <Products limit={8} type="catename" value="Hoa tươi" />
        </TabPanel>
        <TabPanel style={{ width: 1000 }}></TabPanel>
      </Tabs>
      <Link to={`/search?type=catename&value=Hoa%20tươi&limit=0`}>
        <button className="read-more-button">
          Xem thêm <i className="fas fa-angle-right" />
        </button>
      </Link>
    </div>
  );
};

export default Home;
