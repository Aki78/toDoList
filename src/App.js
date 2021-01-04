import React, { Component } from "react";
import "./App.css";
import Entry from "./components/entry";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import {
  SwipeableList,
  SwipeableListItem,
} from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import { FaCheckSquare } from "react-icons/fa";

class App extends Component {
  state = {
    toDo: "",
    toDoListText: [],
    toDoListNum: [],
    mouseDown: false,
  };
  setText = (e) => {
    this.setState({ toDo: e.target.value });
  };
  setLevel = (e) => {
    var joined = [...this.state.toDoListText];
    joined.push(this.state.toDo);
    console.log(joined);
    this.setState({ toDoListText: joined });

    var joinedNum = [...this.state.toDoListNum];
    joinedNum.push(e);
    this.setState({ toDoListNum: joinedNum });

    this.setState({ toDo: "" });
  };
  delList = (delIndex) => {
    //    if (myProgress > 80 && !this.state.mouseDown) {
    let a = [...this.state.toDoListText];
    a.splice(delIndex, 1);
    this.setState({ toDoListText: a });
    //    }
  };
  isMouseDown = () => {
    this.setState({ mouseDown: true });
    console.log(this.state.mouseDown);
  };
  isMouseUp = () => {
    this.setState({ mouseDown: false });
    console.log(this.state.mouseDown);
  };
  render() {
    return (
      <div className="App">
        <Entry
          setText={this.setText}
          setLevel={this.setLevel}
          toDo={this.state.toDo}
        />

        <Container className="mt-5">
          <Table striped size="sm">
            <tbody className="center">
              <tr>
                <th className="myTableWidth align-middle"></th>
                <th style={{ fontSize: "25px" }} className="align-middle"></th>
              </tr>
              {this.state.toDoListText.map((elem, index) => (
                <tr key={index}>
                  <td className="myTableWidth align-middle">
                    <div className="numberCircle align-middle">
                      {this.state.toDoListNum[index]}
                    </div>
                  </td>
                  <td className="doneTextWidth">
                    <SwipeableListItem
                      swipeRight={{
                        content: (
                          <div>
                            <Button
                              onMouseDown={this.isMouseDown}
                              onMouseUp={this.isMouseUp}
                              className="btn "
                            >
                              <FaCheckSquare />
                            </Button>
                          </div>
                        ),
                        action: () => this.delList(index),
                      }}
                      onSwipeProgress={(progress) =>
                        console.info(`Swipe progress: ${progress}%`)
                      }
                    >
                      <Button
                        onMouseDown={this.isMouseDown}
                        onMouseUp={this.isMouseUp}
                        className="btn"
                        variant="outline-dark"
                      >
                        <span style={{ fontSize: "30px" }}>{elem}</span>
                      </Button>
                    </SwipeableListItem>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default App;
