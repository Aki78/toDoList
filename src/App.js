import React, { Component } from "react";
import "./App.css";
import Entry from "./components/entry";
import Entry2 from "./components/entry2";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup, ListGroupItem } from "react-bootstrap";
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
    toDo2: "",
    toDoListText: [],
    toDoListType: [],
    toDoListNum: [],
    currentGlobal: "Primary",
    toDoListGlobal: ["Primary"],
    sortedState: 0,
  };
  setText = (e) => {
    this.setState({ toDo: e.target.value });
  };
  setText2 = (e) => {
    this.setState({ toDo2: e.target.value });
  };
  setLevel = (e) => {
    if (!this.state.toDo || /^\s*$/.test(this.state.toDo)) return;

    var joined = [...this.state.toDoListText];
    joined.push(this.state.toDo);
    this.setState({ toDoListText: joined });

    var joinedNum = [...this.state.toDoListNum];
    joinedNum.push(e);
    this.setState({ toDoListNum: joinedNum });

    var joined = [...this.state.toDoListType];
    joined.push(this.state.currentGlobal);
    this.setState({ toDoListType: joined });

    this.setState({ toDo: "" });
    localStorage.setItem("myState", JSON.stringify(this.state));
  };
  setGlobal = (e) => {
    if (!this.state.toDo2 || /^\s*$/.test(this.state.toDo2)) return;
    var joined = [...this.state.toDoListGlobal];

    joined.push(this.state.toDo2);
    this.setState({ toDoListGlobal: joined });

    this.setState({ currentGlobal: this.state.toDo2 });
    this.setState({ toDo2: "" });
  };
  delList = (delIndex) => {
    let a = [...this.state.toDoListText];
    let b = [...this.state.toDoListNum];
    let c = [...this.state.toDoListType];
    a.splice(delIndex, 1);
    b.splice(delIndex, 1);
    c.splice(delIndex, 1);
    this.setState({ toDoListText: a });
    this.setState({ toDoListNum: b });
    this.setState({ toDoListType: c });
  };
  delType = (delIndex) => {
    let a = [...this.state.toDoListGlobal];
    a.splice(delIndex, 1);
    this.setState({ toDoListGlobal: a });
  };
  sortMe = () => {
    if (this.state.toDoListNum.length === 0) return;
    if (this.state.sortedState === 0 || this.state.sortedState === 2) {
      let newMyList = _.zip(
        this.state.toDoListNum,
        this.state.toDoListText,
        this.state.toDoListType
      );

      newMyList.sort();
      let MyNewList2 = _.unzip(newMyList);
      this.setState({ toDoListText: MyNewList2[1] });
      this.setState({ toDoListType: MyNewList2[2] });
      this.setState({ toDoListNum: MyNewList2[0] });
      this.setState({ sortedState: 1 });
    } else if (this.state.sortedState === 1) {
      let newMyList = _.zip(
        this.state.toDoListNum,
        this.state.toDoListText,
        this.state.toDoListType
      );

      newMyList.reverse();
      let MyNewList2 = _.unzip(newMyList);
      this.setState({ toDoListText: MyNewList2[1] });
      this.setState({ toDoListType: MyNewList2[2] });
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
  getState = () => {
    let a = "a";
    a = JSON.parse(localStorage.getItem("myState"));
    this.setState({ toDoListText: a.toDoListText });
    this.setState({ toDoListNum: a.toDoListNum });
    this.setState({ toDoListType: a.toDoListType });
    this.setState({ toDoListGlobal: a.toDoListGlobal });
  };
  saveState = () => {
    localStorage.setItem("myState", JSON.stringify(this.state));
  };
  componentDidMount = () => {
    this.getState();
  };

  render() {
    return (
      <div className="App">
        <Entry2
          setText={this.setText2}
          setLevel={this.setGlobal}
          toDo={this.state.toDo2}
        />
        <Entry
          setText={this.setText}
          setLevel={this.setLevel}
          toDo={this.state.toDo}
        />
        {this.state.toDoListGlobal.map((elem, index) => {
          return (
            <Button
              key={index}
              variant={
                elem === this.state.currentGlobal
                  ? "primary"
                  : "outline-primary"
              }
              onDoubleClick={() => this.delType(index)}
              onClick={() => this.setState({ currentGlobal: elem })}
              style={{ margin: "3px" }}
            >
              {elem}
            </Button>
          );
        })}
        <Container className="mt-2">
          <ListGroup size="sm">
            <ListGroupItem>
              <div
                style={{ cursor: "pointer" }}
                onClick={this.sortMe}
                className="myTableWidth align-middle"
              >
                level{this.sortedDecend()}
              </div>
            </ListGroupItem>
            {this.state.toDoListText.map((elem, index) => {
              //              console.log(this.state.toDoListGlobal);
              if (this.state.toDoListType[index] === this.state.currentGlobal) {
                return (
                  <ListGroupItem
                    key={index}
                    variant={
                      this.state.toDoListNum[index] === 1 ? "dark" : "danger"
                    }
                  >
                    <SwipeableListItem
                      swipeRight={{
                        content: (
                          <div>
                            <Button className="btn ">
                              <FaCheckSquare />
                            </Button>
                          </div>
                        ),
                        action: () => this.delList(index),
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{elem}</span>
                    </SwipeableListItem>
                  </ListGroupItem>
                );
              }
            })}
          </ListGroup>
        </Container>
        <Button className="btn btn-danger" onClick={() => this.saveState()}>
          save
        </Button>
      </div>
    );
  }
}

export default App;
