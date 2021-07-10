import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import "./Post.css";
import Comment from "./Comment/Comment";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-toastify";

const axios = require("axios");
const dateFormat = require("dateformat");

function Post() {
  const { userAcc } = useContext(AuthContext);
  const { productId } = useParams();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);
  const [description, setDescription] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [providerId, setProviderId] = useState("");
  const [provider, setProvider] = useState([]);
  const [comments, setComments] = useState([]);

  const [content, setContent] = useState("");
  const [onChange, setOnChange] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [buyQuantity, setBuyQuantity] = useState(1);
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    function fetchProductDetail() {
      axios
        .get("http://localhost:5000/api/products/" + productId)
        .then((response) => {
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
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchProductDetail();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    function fetchCommentData() {
      axios
        .get("http://localhost:5000/api/comments/filter", {
          params: {
            type: "productid",
            value: productId,
          },
        })
        .then((res) => {
          setComments(res.data);
        })
        .catch((err) => console.log(err));
    }
    fetchCommentData();
  }, [onChange, productId, comments.length]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/seller", {
        params: {
          id: providerId,
        },
      })
      .then((res) => {
        setProvider(res.data);
      })
      .catch((error) => console.log(error));
  }, [providerId]);

  const handleQuantity = (event) => {
    const value = event.target.value;
    if (value < 1 || value > quantity) return;
    setBuyQuantity(value);
  };

  function addQuantity() {
    if (buyQuantity === quantity) return;
    setBuyQuantity(buyQuantity + 1);
  }

  function subtractQuantity() {
    if (buyQuantity === minPurchase) return;
    setBuyQuantity(buyQuantity - 1);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleComment = (e) => {
    e.preventDefault();

    if (!content) {
      return;
    }
    let commentData = new FormData();
    commentData.append("userId", userAcc.id);
    commentData.append("productId", productId);
    commentData.append("content", content);
    axios
      .post("http://localhost:5000/api/comments", commentData)
      .then((res) => {
        setContent("");
        setOnChange(!onChange);
      })
      .catch((err) => console.log(err));
  };

  const onDelete = (commentId) => {
    axios
      .delete("http://localhost:5000/api/comments/" + commentId)
      .then(() => {
        var res = comments.filter((c) => c.id !== commentId);
        setComments(res);
      })
      .catch((err) => console.log(err));
  };

  const addToCard = () => {
    let loginToken = localStorage.getItem("LoginToken");
    let cartData = new FormData();
    cartData.append("userId", userAcc.id);
    cartData.append("productId", productId);
    cartData.append("buyQuantity", buyQuantity);
    axios
      .post("http://localhost:5000/api/carts/addproduct", cartData, {
        headers: {
          Authorization: "Bearer " + loginToken,
        },
      })
      .then(() => {
        toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
          position: toast.POSITION.TOP_CENTER,
        });
        history.push("/cart");
      })
      .catch((err) => console.log(err));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className="root">
      <div className="post">
        <div className="about-product">
          <div className="details">
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
              <p className="content">{description}</p>
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
                  onChange={(e) => handleQuantity(e)}
                />
                <button className="qtyBtn" onClick={addQuantity}>
                  <i className="fas fa-plus" />
                </button>{" "}
                {unit}
              </p>
              <button
                className="cart-button"
                onClick={userAcc ? addToCard : openDialog}
              >
                <i className="fas fa-cart-plus" /> Mua ngay
              </button>
            </div>
          </div>
          <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle
                style={{ alignContent: "center", color: "seagreen" }}
              >
                Thông báo
              </DialogTitle>
              <DialogContent>
                <DialogContentText style={{ color: "black" }}>
                  Bạn chưa đăng nhập, vui lòng đăng nhập để mua sản phẩm
                  <Link to="/login" className="register-forgot-link">
                    <p> Đăng nhập tại đây</p>
                  </Link>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
          <p style={{ fontSize: 20, margin: 20, marginLeft: 10 }}>
            MÔ TẢ SẢN PHẨM
          </p>
          <div className="description">{description}</div>
          <p style={{ fontSize: 20, margin: 20, marginLeft: 10 }}>
            GIỚI THIỆU SẢN PHẨM
          </p>
          <div className="description">{introduction}</div>
          <div className="comment">
            <div
              style={{
                height: 50,
                fontSize: 18,
                padding: 16,
                backgroundColor: "lightgrey",
              }}
            >
              Bình luận về sản phẩm
            </div>
            <div className="comment-list">
              {!userAcc ? (
                <Link to={"/login"}>
                  <button className="login-to-cmt-button">
                    Đăng nhập để bình luận
                  </button>
                </Link>
              ) : (
                <form onSubmit={(e) => handleComment(e)}>
                  <Input
                    autoComplete="off"
                    className="add-comment-field"
                    id="filled-basic"
                    placeholder="Viết bình luận"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </form>
              )}
              {comments.length < 1 ? (
                <p style={{ margin: 15 }}>
                  Hãy là người đầu tiên bình luận về sản phẩm này
                </p>
              ) : (
                comments.map((comment, index) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        <div className="provider">
          <h3>Được cung cấp bởi</h3>
          <Link to={`/pvdetails/${provider.userId}`} className="provider-link">
            {provider.sellerName}
          </Link>
          <p className="separator"></p>
          <div>
            <div className="info-details">
              <p className="index">Ngày tham gia</p>
              <p className="info">
                {dateFormat(provider.joinDate, "dd/mm/yyyy")}
              </p>
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
    </div>
  );
}

export default Post;
