import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./Request.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useState } from "react";
import AuthContext from '../../store/auth-context';
import DateTimePicker from 'react-datetime-picker';
import {useNavigate } from 'react-router-dom'


function Request() {
  const authCtx = useContext(AuthContext);
  const [source,setSource]=useState('MUJ');
  const [dest, setDest] = useState('MUJ');
  const [occupants,setOccupants] = useState(2);
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();


  function sourceChangeHandler(e){
    setSource(e.target.value);
  }
  function destChangeHandler(e){
    setDest(e.target.value);
  }
  function occupantsChangeHandler(e){
    setOccupants(parseInt(e.target.value));
  }
   
  async function submitHandler(e){
    e.preventDefault();
    console.log(source,dest,occupants,dateTime);
    try {
        const response = await fetch("http://localhost:4000/requests",{
          method:"POST",
          mode:'cors',
          headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${authCtx.token}`,
          },
          body:JSON.stringify({
            from:source,
            to:dest,
            when:dateTime,
            requiredStrength:occupants
          })
        });
        const data = await response.json();
        console.log(data);
        navigate('/explore')
    } catch (error) {
      
    }
  }
  return (
    <Form className={classes.padding} onSubmit={submitHandler}>
      <h1>Request</h1>
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3" controlId="">
          <Form.Label>From</Form.Label>
          <Form.Select value={source} onChange={sourceChangeHandler}>
            <option value='MUJ'>MUJ</option>
            <option value='Railway Station'>RAILWAY STATION</option>
            <option value='Airport'>AIRPORT</option>
            <option value='Jaipur'>JAIPUR CITY</option>
          </Form.Select>
          <Form.Text className="text-muted">Select starting location</Form.Text>
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="">
          <Form.Label>To</Form.Label>
          <Form.Select value={dest} onChange={destChangeHandler}>
            <option value='MUJ'>MUJ</option>
            <option value='Railway Station'>RAILWAY STATION</option>
            <option value='Airport'>AIRPORT</option>
            <option value='Jaipur'>JAIPUR CITY</option>
          </Form.Select>
          <Form.Text className="text-muted">Select destination</Form.Text>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Date&Time</Form.Label>
        <DateTimePicker onChange={setDateTime} value={dateTime} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Occupants</Form.Label>
        <Form.Select value={occupants} onChange={occupantsChangeHandler}>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Request;
