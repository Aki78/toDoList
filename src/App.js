import React, { Component } from "react";
import "./App.css";
import Entry from "./components/entry";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
class App extends Component {
  state = {
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

    this.setState({ toDo: "" });
  };
  delList = (delIndex) => {
    let a = [...this.state.toDoListText];
    a.splice(delIndex, 1);
    this.setState({ toDoListText: a });
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
                <th className="myTableWidth align-middle">level</th>
                <th style={{ fontSize: "25px" }} className="align-middle">
                  to do
                </th>
                <th className="doneTextWidth"></th>
              </tr>
              {this.state.toDoListText.map((elem, index) => (
                <tr key={index}>
                  <td className="myTableWidth">
                    <div className="numberCircle">
                      {this.state.toDoListNum[index]}
                    </div>
                  </td>
                  <td>
                    <Button
                      // for="fancy-checkbox-default"
                      className=" btn btn-default active "
                    >
                      <span style={{ fontSize: "20px" }}> {elem} </span>
                    </Button>
                  </td>
                  <td className="doneTextWidth">
                    <Button
                      className="btn btn-danger"
                      onClick={() => this.delList(index)}
                    >
                      Done
                    </Button>
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
