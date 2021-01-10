import React, { Component } from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import { useSpring, animated } from "react-spring";

const levels = [1, 2];

const GlobalList = (props) => {
  const [pressed, setPressed] = useState(false);
  const { scale } = useSpring({
    scale: pressed ? 0.8 : 1,
  });

  return props.toDoListGlobal.map((elem, index) => (
    <Container key={index}>
      <animated.div
        style={
          props.currentGlobal === elem
            ? { transform: scale.interpolate((s) => `scale(${s})`) }
            : {}
        }
      >
        <Button
          variant={elem === props.currentGlobal ? "primary" : "outline-primary"}
          onDoubleClick={() => props.delType(index)}
          //          onClick={() => }
          onMouseDown={() => {
            setPressed(true);
            props.setCurrent(elem);
          }}
          onMouseUp={() => setPressed(false)}
        >
          {elem}
        </Button>
      </animated.div>
    </Container>
  ));
};

export default GlobalList;

//          style ={
//            state.isAnimate
//              ? {
//                  animation: "x 1s",
//                  animationName: Radium.keyframes(bounce, "bounce"),
//                  margin: "3px",
//                  float: "center-left",
//                }
//              : {}
//          }

//  state = {
//    isAnimate: false,
//  };
//  handleBounce = () => {
//    setState({ isAnimate: true });
//  };
//  handleEnd = () => {
//    setState({ isAnimate: false });
//  };
