import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusSquare } from "react-icons/fa";

const Entry = (props) => {
  const levels = [1, 2];
  return (
    <div style={{ margin: "5px" }}>
      <div style={{ alignItems: "center" }} className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Task"
          aria-label="Task"
          aria-describedby="basic-addon1"
          onChange={props.setText}
          value={props.toDo}
          style={{ fontSize: "30px" }}
        />
        <div style={{ alignItems: "center" }}>
          <Dropdown>
            <Dropdown.Toggle
              style={{ height: "60px", width: "60px" }}
              variant="success"
              id="dropdown-basic"
            >
              <FaPlusSquare size={25} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {levels.map((myNum) => (
                <Dropdown.Item
                  key={myNum}
                  onClick={() => props.setLevel(myNum)}
                >
                  Level {myNum}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Entry;
