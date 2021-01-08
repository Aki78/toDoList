import React, { Component } from "react";
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

const ToDo = (props) => {
  console.log(props.currentGlobal);
  return (
    <Container className="mt-2">
      <ListGroup size="sm">
        <ListGroupItem>
          <div
            style={{ cursor: "pointer" }}
            onClick={props.sortMe}
            className="myTableWidth align-middle"
          >
            level{props.sortedDecend(props.sortedState)}
            {console.log(props.sortedState)}
          </div>
        </ListGroupItem>
        {props.toDoListText.map((elem, index) => {
          //              console.log(props.toDoListGlobal);
          if (props.toDoListType[index] === props.currentGlobal) {
            return (
              <ListGroupItem
                key={index}
                variant={props.toDoListNum[index] === 1 ? "" : "danger"}
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
                    action: () => props.delList(index),
                  }}
                >
                  <span style={{ fontSize: "30px" }}>{elem}</span>
                </SwipeableListItem>
              </ListGroupItem>
            );
          }
        })}
      </ListGroup>
    </Container>
  );
};

export default ToDo;
