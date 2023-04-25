import React, { Component } from "react";

const Like = (props) => {
  let classes = "fa-heart fa-";
  classes = props.liked ? `${classes}solid` : `${classes}regular`;

  return (
    <i
      onClick={props.onLike}
      style={{ cursor: "pointer" }}
      className={classes}
    ></i>
  );
};

export default Like;
