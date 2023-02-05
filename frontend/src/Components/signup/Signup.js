import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Signup.module.css";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Modal from "../../modal/ModalComponent";

function Signup() {
  const regRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const cnfPasswordRef = useRef();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [show, setShow] = useState();
  const handleClose = () => {
    setShow(false);
    navigate("/login");
  };

  const [load, setLoading] = useState(false);
  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    const reg = regRef.current.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const cnfPassword = cnfPasswordRef.current.value;
    const phone = phoneRef.current.value;

    if (cnfPassword !== password) {
      setError("Password and confirm password does not match 🙄");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        "https://travel-buddy-9f75.onrender.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            password,
            email,
            identification: reg,
            phone,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        setError("Check input fields 🥲");
        setLoading(false);
        return console.log("There was error fetching database");
      }
      setLoading(false);
      setShow(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={classes.content}>
      <Modal
        handleClose={handleClose}
        show={show}
        title="Success"
        body="Your Account was successfully created 😃"
      />
      <Form className={classes.padding} onSubmit={submitHandler}>
        <h1><i className="fa-solid fa-right-to-bracket"></i> Signup</h1>
        {error && (
          <h6 style={{ color: "red", fontSize: "25px" }}>
            <i className="fa-solid fa-triangle-exclamation"></i> {error}
          </h6>
        )}
        <Form.Group className="mb-3">
          <Form.Label><i className="fa-solid fa-hashtag"></i> Registration Number</Form.Label>
          <Form.Control type="integer" ref={regRef} />
          <Form.Text className="text-muted">
            Enter your MUJ Registration Number
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><i class="fa-solid fa-person-rifle"></i> Name</Form.Label>
          <Form.Control type="integer" ref={nameRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><i class="fa-solid fa-envelope"></i> Email</Form.Label>
          <Form.Control type="integer" ref={emailRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><i className="fa-solid fa-mobile"></i> Mobile</Form.Label>
          <Form.Control type="integer" ref={phoneRef} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label> <i className="fa-solid fa-key"></i> Password</Form.Label>
          <Form.Control type="password" ref={passwordRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><i class="fa-solid fa-lock"></i> Confirm Password</Form.Label>
          <Form.Control type="password" ref={cnfPasswordRef} />
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="dark" type="submit">
          {load && (
            <div class="spinner-border spinner-border-sm" role="status" />
          )}{" "}
          Submit
        </Button>
        <p>
          <Form.Text className="text-muted">
            Already a user ? <a href="/login">Login here</a>
          </Form.Text>
        </p>
      </Form>
    </div>
  );
}

export default Signup;
