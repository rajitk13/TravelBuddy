import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Request.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Request() {
  return (
    <Form className={classes.padding}>
      <h1>Request</h1>
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="">
          <Form.Label>From</Form.Label>
          <Form.Select>
            <option>MUJ</option>
            <option>RAILWAY STATION</option>
            <option>AIRPORT</option>
            <option>JAIPUR CITY</option>
          </Form.Select>
          <Form.Text className="text-muted">Select starting location</Form.Text>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="">
          <Form.Label>To</Form.Label>
          <Form.Select>
            <option>MUJ</option>
            <option>RAILWAY STATION</option>
            <option>AIRPORT</option>
            <option>JAIPUR CITY</option>
          </Form.Select>
          <Form.Text className="text-muted">Select destination</Form.Text>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" placeholder="date" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Occupants</Form.Label>
        <Form.Select>
          <option>2</option>
          <option>4</option>
          <option>6</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Request;
