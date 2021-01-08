import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";

const GlobalList = (props) => {
  const levels = [1, 2];
  //  console.log(props.toDoListGlobal);
  return props.toDoListGlobal.map((elem, index) => (
    <Button
      key={index}
      variant={elem === props.currentGlobal ? "primary" : "outline-primary"}
      onDoubleClick={() => props.delType(index)}
      onClick={() => props.setCurrent(elem)}
      style={{ margin: "3px" }}
    >
      {elem}
    </Button>
  ));
};

export default GlobalList;
