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
  const [error,setError] = useState();
  const navigate = useNavigate();
  const [show, setShow] = useState();
  const handleClose = () => {
    setShow(false);
    navigate("/login");
  };
  async function submitHandler(e) {
    e.preventDefault();
    const reg = regRef.current.value;
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const cnfPassword = cnfPasswordRef.current.value;
    const phone = phoneRef.current.value;

    if(cnfPassword !== password ){
      setError("Password and confirm password does not match 🙄");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/users",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name,password,email,identification:reg,phone
        })
      });
      const data = await response.json();
      if(data.error){
        return console.log("There was error fetching database");
      }
      setShow(true);
      console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Modal
        handleClose={handleClose}
        show={show}
        title="Success"
        body="Your Account was successfully created 😃"
      />
      <Form className={classes.padding} onSubmit={submitHandler}>
      <h1>Signup</h1>
      <Form.Group className="mb-3">
        <Form.Label>Registration Number</Form.Label>
        <Form.Control type="integer" ref={regRef} />
        <Form.Text className="text-muted">
          Enter your MUJ Registration Number
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="integer" ref={nameRef} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control type="integer" ref={emailRef} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Mobile</Form.Label>
        <Form.Control type="integer" ref={phoneRef} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" ref={passwordRef} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" ref={cnfPasswordRef} />
      </Form.Group>
      <Form.Group className="mb-3">
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
      {error && <p style={{color:"red", fontSize:"20px"}}>{error}</p>}
    </Form>
    </>
  );
}

export default Signup;
