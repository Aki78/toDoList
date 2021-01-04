import React, { Component } from "react";
import "./App.css";
import Entry from "./components/entry";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import _ from "lodash";
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
    sortedState: 0,
  };
  setText = (e) => {
    this.setState({ toDo: e.target.value });
  };
  setLevel = (e) => {
    var joined = [...this.state.toDoListText];
    joined.push(this.state.toDo);
    this.setState({ toDoListText: joined });

    var joinedNum = [...this.state.toDoListNum];
    joinedNum.push(e);
    this.setState({ toDoListNum: joinedNum });

    this.setState({ toDo: "" });
  };
  delList = (delIndex) => {
    //    if (myProgress > 80 && !this.state.mouseDown) {
    let a = [...this.state.toDoListText];
    let b = [...this.state.toDoListNum];
    a.splice(delIndex, 1);
    b.splice(delIndex, 1);
    this.setState({ toDoListText: a });
    this.setState({ toDoListNum: b });
    //    }
  };
  isMouseDown = () => {
    this.setState({ mouseDown: true });
  };
  isMouseUp = () => {
    this.setState({ mouseDown: false });
  };
  sortMe = () => {
    if (this.state.toDoListNum.length === 0) return;
    if (this.state.sortedState === 0 || this.state.sortedState === 2) {
      let newMyList = _.zip(this.state.toDoListNum, this.state.toDoListText);

      newMyList.sort();
      let MyNewList2 = _.unzip(newMyList);
      this.setState({ toDoListText: MyNewList2[1] });
      this.setState({ toDoListNum: MyNewList2[0] });
      this.setState({ sortedState: 1 });
    } else if (this.state.sortedState === 1) {
      let newMyList = _.zip(this.state.toDoListNum, this.state.toDoListText);

      newMyList.reverse();
      let MyNewList2 = _.unzip(newMyList);
      this.setState({ toDoListText: MyNewList2[1] });
      this.setState({ toDoListNum: MyNewList2[0] });
      this.setState({ sortedState: 2 });
    }
  };
  sortedDecend() {
    if (this.state.sortedState === 0 || this.state.sortedState === 2) {
      return "▲";
    } else if (this.state.sortedState === 1) {
      return "▼";
    }
  }
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
                <th
                  style={{ cursor: "pointer" }}
                  onClick={this.sortMe}
                  className="myTableWidth align-middle"
                >
                  level{this.sortedDecend()}
                </th>
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
                        <span style={{ fontSize: "20px" }}>{elem}</span>
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
