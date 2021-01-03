import React, { Component } from "react";
import "./App.css";
import Entry from "./components/entry";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class App extends Component {
  state = {
    level: "1 ",
    toDo: "",
    toDoListText: [],
    toDoListNum: [],
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
  };
  delList = (delIndex) => {
    let a = [...this.state.toDoListText];
    a.splice(delIndex, 1);
    this.setState({ toDoListText: a });
  };
  render() {
    return (
      <div className="App">
        <Entry setText={this.setText} setLevel={this.setLevel} />
        {this.state.toDoListText.map((elem, index) => (
          <Container key={index} sm={8}>
            <Button onClick={() => this.delList(index)}>{elem}</Button>
          </Container>
        ))}
      </div>
    );
  }
}

export default App;
