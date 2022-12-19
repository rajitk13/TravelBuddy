import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Signup.module.css";
import { useRef } from "react";

function Signup() {
  const regRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const cfpasswordRef = useRef();
  return (
    <Form className={classes.padding}>
      <h1>Signup</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Registration Number</Form.Label>
        <Form.Control
          type="integer"
          placeholder="Enter registation number"
          ref={regRef}
        />
        <Form.Text className="text-muted">
          Enter your MUJ Registration Number
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="integer"
          placeholder="Enter registation number"
          ref={regRef}
        />
        <Form.Text className="text-muted">Enter your Name</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="integer"
          placeholder="Enter registation number"
          ref={emailRef}
        />
        <Form.Text className="text-muted">Enter your Email</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mobile</Form.Label>
        <Form.Control
          type="integer"
          placeholder="Enter registation number"
          ref={mobileRef}
        />
        <Form.Text className="text-muted">Enter your Mobile Number</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          ref={cfpasswordRef}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <p>
        <Form.Text className="text-muted">
          Already a user ? <a href="/login">Login here</a>
        </Form.Text>
      </p>
    </Form>
  );
}

export default Signup;
