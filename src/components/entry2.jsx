import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusSquare } from "react-icons/fa";
import Button from "react-bootstrap/Button";

const Entry2 = (props) => {
  const levels = [1, 2, 3];
  return (
    <div className="container mt-5">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Task"
          aria-label="Task"
          aria-describedby="basic-addon1"
          onChange={props.setText}
          value={props.toDo}
        />
        <Button onClick={() => props.setLevel()}>+</Button>
      </div>
    </div>
  );
};

export default Entry2;
