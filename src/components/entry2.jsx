import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusSquare } from "react-icons/fa";
import Button from "react-bootstrap/Button";

import { fadeIn, fadeOut } from "react-animations";

const Entry2 = (props) => {
  const levels = [1, 2];
  return (
    <div style={{ margin: "5px", marginTop: "200px" }}>
      <div style={{ alignItems: "center" }} className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Type"
          aria-label="Type"
          aria-describedby="basic-addon1"
          onChange={props.setText}
          value={props.toDo}
          style={{ fontSize: "30px" }}
        />
        <Button
          style={{ hight: "50px", width: "60px" }}
          onClick={() => {
            props.setLevel();
            props.setAnimationMode(fadeIn);
          }}
        >
          <span style={{ fontSize: "30px" }}>+</span>
        </Button>
      </div>
    </div>
  );
};

export default Entry2;
