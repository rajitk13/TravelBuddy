import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Login.module.css";

function Login() {
  return (
    <Form className={classes.padding}>
      <h1>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Registration Number</Form.Label>
        <Form.Control type="integer" placeholder="Enter registation number" />
        <Form.Text className="text-muted">
          Enter your MUJ Registration Number
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;
