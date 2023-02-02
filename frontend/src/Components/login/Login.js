import { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Login.module.css";
import Modal from "../../modal/ModalComponent";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

function Login() {
  const regRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  const [show, setShow] = useState();
  const navigate = useNavigate();
  const handleClose = () => {
    setShow(false);
    navigate("/explore");
  };

  async function submitHandler(e) {
    e.preventDefault();
    const identification = regRef.current.value;
    const password = passwordRef.current.value;
    try {
      if (identification.length !== 9 || isNaN(+identification)) {
        let msg = "Registration number is not valid!";
        setError(msg);
        return;
      }
      const response = await fetch("https://travel-buddy-9f75.onrender.com/users/login", {
        method: "POST",
        mode:'cors',
        body: JSON.stringify({ identification, password }),
        headers: {
          "Content-Type": "application/json",
          "Origin":"https://travel-buddy-frontend.onrender.com/"
        },
      });
      const data = await response.json();
      if (data.error) {
        let msg = "Check Registration ID and Password!";
        setError(msg);
        return;
      }
      console.log(data);
      const expTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
      authCtx.login(data.token, expTime);
      setShow(true);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Modal
        handleClose={handleClose}
        show={show}
        title="Success"
        body="Your were logged in successfully 😃"
      />
      <Form className={classes.padding} onSubmit={submitHandler}>
        <h1>
          <i className="fa-solid fa-right-to-bracket"></i> Login
        </h1>
        {error && (
          <h6 style={{ color: "red", fontSize: "25px" }}>
            <i className="fa-solid fa-triangle-exclamation"></i> {error}
          </h6>
        )}
        <Form.Group className="mb-3">
          <Form.Label>
            {" "}
            <i className="fa-solid fa-hashtag"></i> Registration Number
          </Form.Label>
          <Form.Control ref={regRef} type="integer" />
          <Form.Text className="text-muted">
            Enter your MUJ Registration Number
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label><i className="fa-solid fa-key"></i> Password</Form.Label>
          <Form.Control ref={passwordRef} type="password" />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="dark" type="submit">
          Submit
        </Button>
        <p>
          <Form.Text className="text-muted">
            Not a user ? <a href="/signup">Signup here</a>
          </Form.Text>
        </p>
      </Form>
    </>
  );
}

export default Login;
