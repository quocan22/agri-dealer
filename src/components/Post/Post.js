import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from "@material-ui/core";

import "./Post.css";
import Comment from "./Comment/Comment";
import post from "../../assets/data/post";
import provider from "../../assets/data/provider";
import comments from "../../assets/data/comments";

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
    this.setState({maxQuantity: post.remain});
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
      <div className="root">
      <div className="post">
        <div className="about-product">
          <div className="details" key={post._id}>
            <div className="big-img">
              <img src={post.src[index]} alt="" />
            </div>
            <div className="box">
              <div className="row">
                <h2>{post.name}</h2>
              </div>
              <span>
                {post.price} / {post.unit}
              </span>
              <p className="content">{post.description}</p>
              <p className="content">
                Còn lại: {post.remain} {post.unit}
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
                {post.unit}
              </p>
              <DetailsThumb
                images={post.src}
                tab={this.handleTab}
                myRef={this.myRef}
              />
              <button className="cart">
                <i className="fas fa-cart-plus" /> Mua ngay
              </button>
            </div>
          </div>
          <p style={{fontSize: 20, margin: 20, marginLeft: 10}}>MÔ TẢ SẢN PHẨM</p>
          <div className="description">
            Thương hiệu: Dori - Vua Tỏi Lý Sơn<br/>
            Khối lượng: 1 kg<br/>
            Bao bì: Túi lưới<br/>
            Hàng trong kho: Còn hàng<br/>
            Mô tả: Tỏi Lý Sơn chính hiệu<br/>
            Dạng khô, đã bóc lớp vỏ lụa bên ngoài, cắt gọn<br/>
            Tỏi Lý Sơn có một đặc điểm đặc trưng là củ nhỏ vừa, tép đều, màu trắng, chắc. Ăn tỏi Lý Sơn, ta cảm nhận được cả các mùi vị thơm cay dịu ngọt nồng hơn củ tỏi được trồng ở những vùng đất khác.<br/>
            <br/>
            Tỏi Lý Sơn chính hiệu rất thơm ngon, vị cay nhẹ, dễ chịu.<br/>
            <br/>
            Tỏi Lý Sơn chính hiệu còn có tác dụng trong phòng, trị bệnh<br/>
            <br/>
            Ưu điểm của tỏi Lý Sơn là dù có ăn nhiều nhưng không bao giờ có mùi hôi như những giống tỏi khác.<br/>
            <br/>
            Củ tỏi có kích thước trung bình từ 1,5 ÷ 3,5 cm, có màu trắng, trung bình mỗi củ có từ 6÷12 tép lớn.Thành phần củ tỏi chứa 0,1÷0.36% tinh dầu, trong đó hơn 90% chứa hợp chất lưu huỳnh, thành phần chủ yếu của củ tỏi là chất alixin. Tỏi tươi không có alixin ngay mà có chứa chất alinin chất này dưới tác động của enzyme alinaza và khi giã dập mới cho alixin. Ngoài ra trong tỏi còn chứa nhiều vitamin và khoáng chất đặc biệt là selen. Đây là khoáng chất giúp cơ thể con người tăng cường hệ miễn dịch, giảm nguy cơ mắc bệnh tim, ung thư, phát triển trí não và tăng cường tuổi thọ cho con người.
          </div>
          <p style={{fontSize: 20, margin: 20, marginLeft: 10}}>GIỚI THIỆU SẢN PHẨM</p>
          <div className="description">
          Tỏi được các nhà khoa học ở nhiều nước nghiên cứu, phát hiện những đặc tính kỳ diệu như: khả năng tăng cường hệ thống miễn dịch, nâng cao sức khỏe, làm giảm huyết áp, có tác dụng chống tắc nghẽn mạch máu, làm chậm quá trình lão hóa tế bào, chống sự già nua, làm giảm sung huyết và tiêu viêm, phục hồi nhanh thể lực…
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
