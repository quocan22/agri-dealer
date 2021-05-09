import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const products = {
  _id: "1",
  name: "Tỏi Lý Sơn - Thương hiệu Dori",
  src: [
    "https://cdn.vinagex.com/image.php?src=images/5c67b2f2ac210c465e0369b2/product/5c67bb1923b1c.png&size=375x350",
    "https://cdn.vinagex.com/image.php?src=images/5c67b2f2ac210c465e0369b2/product/5c67bb1926e2c.png&size=375x350",
    "https://cdn.vinagex.com/image.php?src=images/5c67b2f2ac210c465e0369b2/product/5c6bcb90b9b21.png&size=375x350",
    "https://cdn.vinagex.com/image.php?src=images/5c67b2f2ac210c465e0369b2/product/5c6bcb90bc939.png&size=375x350",
  ],
  description: "Lưu ý: Tỏi Lý Sơn - Loại tỏi 3 tép VietGAP",
  remain: 500,
  price: "200,000",
  unit: "kg",
  count: 1,
};

const provider = {
  name: "Công ty cổ phần Dori",
  joinDate: "16/02/2019",
  address: "Thôn Đông, An Vinh, Lý Sơn, Quảng Ngãi",
  brand: "Tỏi Lý Sơn",
  standard: "Viet Gap",
  scale: "2 ha",
  quantity: "20 tấn",
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1, index: 0, maxQuantity: 0 };
    this.handleQuantity = this.handleQuantity.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.subtractQuantity = this.subtractQuantity.bind(this);
  }

  myRef = React.createRef();

  handleQuantity = (event) => {
    this.setState({maxQuantity: products.remain});
    const value = event.target.value;
    if (value < 1 || value > this.state.maxQuantity) return;
    this.setState({
      quantity: value,
    });
  };

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  componentDidMount() {
    const { index } = this.state;
    this.myRef.current.children[index].className = "active";
  };

  addQuantity() {
    if (this.state.quantity === this.state.maxQuantity) return;
    this.setState({
      quantity: this.state.quantity + 1,
    })
  };

  subtractQuantity() {
    if (this.state.quantity === 1) return;
    this.setState({
      quantity: this.state.quantity - 1,
    })
  }

  render() {
    const { index } = this.state;

    return (
      <div className="post">
        <div className="details" key={products._id}>
          <div className="big-img">
            <img src={products.src[index]} alt="" />
          </div>

          <div className="box">
            <div className="row">
              <h2>{products.name}</h2>
            </div>
            <span>
              {products.price} / {products.unit}
            </span>
            <p className="content">{products.description}</p>
            <p className="content">
              Còn lại: {products.remain} {products.unit}
            </p>
            <p className="quantity">
              Số lượng{" "}
              <button className="qtyBtn" onClick={this.subtractQuantity}>
                <i className="fas fa-minus" />
              </button>
              <input
                className="qtyBox"
                type="number"
                value={this.state.quantity}
                onChange={this.handleQuantity}
              />
              <button className="qtyBtn" onClick={this.addQuantity}>
                <i className="fas fa-plus" />
              </button>{" "}
              {products.unit}
            </p>
            <DetailsThumb
              images={products.src}
              tab={this.handleTab}
              myRef={this.myRef}
            />
            <button className="cart">
              <i className="fas fa-cart-plus" /> Mua ngay
            </button>
          </div>
        </div>
        <div className="provider">
          <h3>Được cung cấp bởi</h3>
          <Link to="/" className="provider-link">
            {provider.name}
          </Link>
          <p className="separator"></p>
          <div>
            <div className="info-details">
              <p className="index">Ngày tham gia</p>
              <p className="info">{provider.joinDate}</p>
            </div>
            <div className="info-details">
              <p className="index">Địa chỉ</p>
              <p className="info">{provider.address}</p>
            </div>
            <div className="info-details">
              <p className="index">Thương hiệu</p>
              <p className="info">{provider.brand}</p>
            </div>
            <div className="info-details">
              <p className="index">Tiêu chuẩn</p>
              <p className="info">{provider.standard}</p>
            </div>
            <div className="info-details">
              <p className="index">Quy mô</p>
              <p className="info">{provider.scale}</p>
            </div>
            <div className="info-details">
              <p className="index">Sản lượng</p>
              <p className="info">{provider.quantity}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class DetailsThumb extends Component {
  constructor(props) {
    super(props);
    this.state = { index: 0 };
  }

  render() {
    const { images, tab, myRef } = this.props;
    return (
      <div className="thumb" ref={myRef}>
        {images.map((img, index) => (
          <img src={img} alt="" key={index} onClick={() => tab(index)} />
        ))}
      </div>
    );
  }
}

export default Post;
