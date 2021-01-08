import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import { bounce } from "react-animations";
import { fadeIn, fadeOut } from "react-animations";
import Radium, { StyleRoot } from "radium";

const levels = [1, 2];

class GlobalList extends Component {
  setStyle = (e) => {
    if (e === this.props.currentGlobal) {
      return {
        animation: "1s",
        animationName: Radium.keyframes(this.props.animationMode),
      };
    } else {
      return;
    }
  };
  render() {
    this.setStyle.bind(this);
    return this.props.toDoListGlobal.map((elem, index) => (
      <Container key={index}>
        <StyleRoot>
          <div style={this.setStyle(elem)}>
            <Button
              variant={
                elem === this.props.currentGlobal
                  ? "primary"
                  : "outline-primary"
              }
              onDoubleClick={() => {
                this.props.setAnimationMode(fadeOut);
                setTimeout(() => this.props.delType(index), 700);
              }}
              onClick={() => this.props.setCurrent(elem)}
            >
              {elem}
            </Button>
          </div>
        </StyleRoot>
      </Container>
    ));
  }
}

export default GlobalList;

//          style={
//            this.state.isAnimate
//              ? {
//                  animation: "x 1s",
//                  animationName: Radium.keyframes(bounce, "bounce"),
//                  margin: "3px",
//                  float: "center-left",
//                }
//              : {}
//          }
//    this.handleBounce.bind(this);
//    this.handleEnd.bind(this);

//  state = {
//    isAnimate: false,
//  };
//  handleBounce = () => {
//    this.setState({ isAnimate: true });
//  };
//  handleEnd = () => {
//    this.setState({ isAnimate: false });
//  };
