import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Input } from "@material-ui/core";

import "./Post.css";
import Comment from "./Comment/Comment";
import post from "../../assets/data/post";
import comments from "../../assets/data/comments";

const axios = require("axios");
const dateFormat = require("dateformat");

function Post() {
  const {productId} = useParams();

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);
  const [description, setDescription] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [providerId, setProviderId] = useState('')
  const [provider, setProvider] = useState([]);

  const [buyQuantity, setBuyQuantity] = useState(1);

  useEffect(() => {
    function fetchProductDetail() {
      axios.get("http://localhost:5000/api/products/" + productId)
        .then(response => {
          setProductName(response.data.productName);
          setPrice(response.data.price);
          setUnit(response.data.unit);
          setQuantity(response.data.quantity);
          setMinPurchase(response.data.minPurchase);
          setDescription(response.data.description);
          setIntroduction(response.data.introduction);
          setImageUrl(response.data.imageUrl);
          setBuyQuantity(response.data.minPurchase);
          setProviderId(response.data.userId);
        }).catch(error => {
          console.log(error);
        })
    }
    fetchProductDetail();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    console.log(providerId);
    axios.get("http://localhost:5000/api/users/seller", {
        params: {
          id: providerId
        }
      }).then(res => {
        setProvider(res.data);
      }).catch(error => console.log(error));
  }, [providerId]);

  const handleQuantity = (event) => {
    const value = event.target.value;
    if (value < 1 || value > quantity) return;
    setBuyQuantity(value);
  };

  function addQuantity() {
    if (buyQuantity === quantity) return;
    setBuyQuantity(buyQuantity + 1);
  };

  function subtractQuantity() {
    if (buyQuantity === minPurchase) return;
    setBuyQuantity(buyQuantity - 1);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="root">
      {productId === null || providerId === null ?
      <p>Đang tải dữ liệu</p> :
      <div className="post">
        <div className="about-product">
          <div className="details" key={post._id}>
            <div className="big-img">
              <img src={imageUrl} alt="" />
            </div>
            <div className="box">
              <div className="row">
                <h2>{productName}</h2>
              </div>
              <span>
                {numberWithCommas(price)} đ / {unit}
              </span>
              <p className="content">{post.description}</p>
              <p className="content">
                Còn lại: {quantity} {unit}
              </p>
              <p className="quantity">
                Số lượng{" "}
                <button className="qtyBtn" onClick={subtractQuantity}>
                  <i className="fas fa-minus" />
                </button>
                <input
                  className="qtyBox"
                  type="number"
                  value={buyQuantity}
                  onChange={e => handleQuantity(e)}
                />
                <button className="qtyBtn" onClick={addQuantity}>
                  <i className="fas fa-plus" />
                </button>{" "}
                {unit}
              </p>
              <button className="cart" onClick={() => console.log(productId)}>
                <i className="fas fa-cart-plus" /> Mua ngay
              </button>
            </div>
          </div>
          <p style={{fontSize: 20, margin: 20, marginLeft: 10}}>MÔ TẢ SẢN PHẨM</p>
          <div className="description">
            {description}
          </div>
          <p style={{fontSize: 20, margin: 20, marginLeft: 10}}>GIỚI THIỆU SẢN PHẨM</p>
          <div className="description">
            {introduction}
          </div>
          <div className="comment">
            <div style={{height: 50, fontSize: 18, padding: 16, backgroundColor: "lightgrey"}}>
              Bình luận về sản phẩm
            </div>
            <div className="comment-list">
            <Input className="add-comment-field" id="filled-basic" placeholder="Viết bình luận"></Input>
              {comments.map((comment) => (
                <Comment comment={comment} />
              ))}
            </div>
          </div>
        </div>
        <div className="provider">
          <h3>Được cung cấp bởi</h3>
          <Link to="/" className="provider-link">
          {provider.sellerName}
          </Link>
          <p className="separator"></p>
          <div>
            <div className="info-details">
              <p className="index">Ngày tham gia</p>
              <p className="info">{dateFormat(provider.joinDate, "dd/mm/yyyy")}</p>
            </div>
            <div className="info-details">
              <p className="index">Địa chỉ</p>
              <p className="info">{provider.address}</p>
            </div>
            <div className="info-details">
              <p className="index">Thương hiệu</p>
              <p className="info">{provider.brandName}</p>
            </div>
            <div className="info-details">
              <p className="index">Tiêu chuẩn</p>
              <p className="info">Viet Gap</p>
            </div>
            <div className="info-details">
              <p className="index">Quy mô</p>
              <p className="info">{provider.scale}</p>
            </div>
            <div className="info-details">
              <p className="index">Sản lượng</p>
              <p className="info">{provider.capacity}</p>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
}

export default Post;
