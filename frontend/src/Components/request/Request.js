import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Request.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/ModalComponent";

function Request() {
  const authCtx = useContext(AuthContext);
  const [source, setSource] = useState("MUJ");
  const [dest, setDest] = useState("MUJ");
  const [occupants, setOccupants] = useState(2);
  const [dateTime, setDateTime] = useState(new Date());
  const [error, setError] = useState();
  const [show, setShow] = useState();
  const [load, setLoading] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate("/explore");
  };
  const dateRef = useRef();
  const navigate = useNavigate();

  function sourceChangeHandler(e) {
    setSource(e.target.value);
  }
  function destChangeHandler(e) {
    setDest(e.target.value);
  }
  function occupantsChangeHandler(e) {
    setOccupants(parseInt(e.target.value));
  }
  function datetimeChangleHandler() {
    setDateTime(new Date(dateRef.current.value));
  }
  async function submitHandler(e) {
    setLoading(true);
    e.preventDefault();
    try {
      if (source === dest) {
        let msg = "Destination and Source Can't be same";
        setError(msg);
        setLoading(false);
        return;
      } else if (dateTime < new Date()) {
        let msg = "Check Date and Time";
        setLoading(false);
        setError(msg);
        return;
      }

      const response = await fetch(
        "https://travel-buddy-9f75.onrender.com/requests",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authCtx.token}`,
          },
          body: JSON.stringify({
            from: source,
            to: dest,
            when: dateTime,
            requiredStrength: occupants,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        return setError(data.error);
      }
      setShow(true);
    } catch (error) {}
  }
  return (
    <Form className={classes.padding} onSubmit={submitHandler}>
      <h1>
        <i className="fa-solid fa-circle-info"></i> Request
      </h1>
      {error && (
        <h6 style={{ color: "red" }}>
          {" "}
          <i className="fa-solid fa-triangle-exclamation"></i> {error}
        </h6>
      )}
      <Modal
        handleClose={handleClose}
        show={show}
        title="Success"
        body="Your request was successfully created 😃"
      />
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="">
          <Form.Label>
            <i className="fa-solid fa-location-arrow"></i> From
          </Form.Label>
          <Form.Select value={source} onChange={sourceChangeHandler}>
            <option value="MUJ">MUJ</option>
            <option value="Railway Station">RAILWAY STATION</option>
            <option value="Airport">AIRPORT</option>
            <option value="Jaipur">JAIPUR CITY</option>
          </Form.Select>
          <Form.Text className="text-muted">Select starting location</Form.Text>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="">
          <Form.Label>
            <i className="fa-solid fa-map-pin"></i> To
          </Form.Label>
          <Form.Select value={dest} onChange={destChangeHandler}>
            <option value="MUJ">MUJ</option>
            <option value="Railway Station">RAILWAY STATION</option>
            <option value="Airport">AIRPORT</option>
            <option value="Jaipur">JAIPUR CITY</option>
          </Form.Select>
          <Form.Text className="text-muted">Select destination</Form.Text>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>
          <i className="fa-solid fa-calendar-day"></i> Date & Time
        </Form.Label>
        <Form.Control
          type="datetime-local"
          ref={dateRef}
          onChange={datetimeChangleHandler}
        />
        <Form.Text className="text-muted">
          if date and time is selected before current date & time , current time
          is set
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>
          {" "}
          <i className="fa-solid fa-user-group"></i> Occupants
        </Form.Label>
        <Form.Select value={occupants} onChange={occupantsChangeHandler}>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
        </Form.Select>
      </Form.Group>
      <Button variant="dark" type="submit">
        {load && <div class="spinner-border spinner-border-sm" role="status" />}{" "}
        Submit
      </Button>
    </Form>
  );
}

export default Request;
