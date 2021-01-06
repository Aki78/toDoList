import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusSquare } from "react-icons/fa";

const Entry = (props) => {
  const levels = [1, 2, 3];
  return (
    <div className="container mt-1 mb-5">
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
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FaPlusSquare size={20} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {levels.map((myNum) => (
              <Dropdown.Item key={myNum} onClick={() => props.setLevel(myNum)}>
                Level {myNum}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default Entry;
