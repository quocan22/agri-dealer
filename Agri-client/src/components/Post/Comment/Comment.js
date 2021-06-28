import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import "./Comment.css";

const axios = require("axios");

const Comment = ({ comment, onDelete }) => {
  const { userAcc } = useContext(AuthContext);

  function timeSince(date) {
    let comDate = new Date(date);
    var seconds = Math.floor((new Date() - comDate) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " năm";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " tháng";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " ngày";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " giờ";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " phút";
    }
    return Math.floor(seconds) + " giây";
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    axios
      .delete("localhost:5000/api/comments/" + comment.id)
      .then()
      .catch((err) => console.log(err));
    setAnchorEl(null);
  };

  return (
    <div className="comment-container">
      <div className="comment-bar">
        <div className="owner">
          <img alt="" src={comment.userAvatarUrl} />
          <div className="user">
            <p className="user-name">{comment.userName}</p>
            <p className="time">
              {timeSince(comment.commentDate)}
              {" trước"}
            </p>
          </div>
        </div>
        {userAcc && userAcc.id === comment.userId ? (
          <div>
            <IconButton
              size="small"
              aria-label="more"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <i className="fas fa-ellipsis-v" />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Chỉnh sửa</MenuItem>
              <MenuItem onClick={handleDelete}>Xóa</MenuItem>
            </Menu>
          </div>
        ) : null}
      </div>
      <p className="content">{comment.content}</p>
    </div>
  );
};

export default Comment;
