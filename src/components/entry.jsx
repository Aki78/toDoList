import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const Entry = (props) => {
  const levels = [1, 2, 3];
  return (
    <div className="container">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Task"
          aria-label="Task"
          aria-describedby="basic-addon1"
          onChange={props.setText}
        />
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Importance
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
