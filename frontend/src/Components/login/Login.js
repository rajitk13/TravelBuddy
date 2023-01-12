<<<<<<< Updated upstream
=======
import { useContext, useRef, useState } from "react";
>>>>>>> Stashed changes
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Login.module.css";

function Login() {
<<<<<<< Updated upstream
  return (
    <Form className={classes.padding}>
      <h1>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Registration Number</Form.Label>
        <Form.Control type="integer" placeholder="Enter registation number" />
=======
  const regRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    const identification = regRef.current.value;
    const password = passwordRef.current.value;
    try {
      const response = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        body: JSON.stringify({ identification, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      console.log(data);
      const expTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
      authCtx.login(data.token, expTime);
      return navigation("/explore");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form className={classes.padding} onSubmit={submitHandler}>
      <h1>Login</h1>
      {error && (
        <p style={{ color: "red", fontSize: "25px" }}>
          Incorrect Username or password
        </p>
      )}
      <Form.Group className="mb-3">
        <Form.Label>Registration Number</Form.Label>
        <Form.Control ref={regRef} type="integer" />
>>>>>>> Stashed changes
        <Form.Text className="text-muted">
          Enter your MUJ Registration Number
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
<<<<<<< Updated upstream
        <Form.Control type="password" placeholder="Password" />
=======
        <Form.Control ref={passwordRef} type="password" />
>>>>>>> Stashed changes
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
<<<<<<< Updated upstream
     
     
=======
      <p>
        <Form.Text className="text-muted">
          Not a user ? <a href="/signup">Signup here</a>
        </Form.Text>
      </p>
>>>>>>> Stashed changes
    </Form>
  );
}

export default Login;
