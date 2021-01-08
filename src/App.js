import React, { Component } from "react";
import "./App.css";
import Entry from "./components/entry";
import Entry2 from "./components/entry2";
import ToDo from "./components/toDo";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import GlobalList from "./components/globalList";
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
    this.setState({
      toDo: e.target.value,
    });
  };
  setText2 = (e) => {
    this.setState({
      toDo2: e.target.value,
    });
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
  setCurrent = (e) => {
    this.setState({ currentGlobal: e });
  };
  sortedDecend = (a) => {
    if (a === 0 || a === 2) {
      return "▲";
    } else if (a === 1) {
      return "▼";
    }
  };
  //  getState = () => {
  //    let a = "a";
  //    a = JSON.parse(localStorage.getItem("myState"));
  //    this.setState({ toDoListText: a.toDoListText });
  //    this.setState({ toDoListNum: a.toDoListNum });
  //    this.setState({ toDoListType: a.toDoListType });
  //    this.setState({ toDoListGlobal: a.toDoListGlobal });
  //  };
  saveState = () => {
    localStorage.setItem("myState", JSON.stringify(this.state));
  };
  //  componentDidMount = () => {
  //    this.getState();
  //  };

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
        <GlobalList
          toDoListGlobal={this.state.toDoListGlobal}
          currentGlobal={this.state.currentGlobal}
          setCurrent={this.setCurrent}
          delType={this.delType}
        />
        <ToDo
          sortMe={this.sortMe}
          sortedDecend={this.sortedDecend}
          sortedState={this.state.sortedState}
          toDoListType={this.state.toDoListType}
          currentGlobal={this.state.currentGlobal}
          toDoListNum={this.state.toDoListNum}
          toDoListText={this.state.toDoListText}
          delList={this.delList}
        />
        ;
        <Button className="btn btn-danger" onClick={() => this.saveState()}>
          save
        </Button>
      </div>
    );
  }
}

export default App;
