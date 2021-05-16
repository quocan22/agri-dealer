import React from "react";
import "./Comment.css";

const Comment = ({comment}) => {
  return (
    <div className="comment-container">
      <div className="owner">
        <img alt="" src={comment.img}/>
        <div className="user">
          <p className="user-name">{comment.user}</p>
          <p className="time">{comment.time}</p>
        </div>
      </div>
      <p className="content">
        {comment.content}
      </p>
    </div>
  )
};

export default Comment;