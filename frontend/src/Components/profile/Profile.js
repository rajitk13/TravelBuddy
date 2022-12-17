import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import classes from "./Profile.module.css";

const Profile = () => {
  return (
    <>
    <h1 className={classes.heading}>User Profile</h1>
      <Card style={{ width: "18rem" }} className={classes.margins}>
        <Card.Body>
          <Card.Title>Rajit Kuthiala</Card.Title>
          <Card.Text>
            Currently Pursuing Computer Science from Manipal University Jaipur
            and is in his 3rd Year of Engineering.
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Reg Number: </ListGroup.Item>
          <ListGroup.Item>Email: </ListGroup.Item>
          <ListGroup.Item>Number:</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href="#">Linked In</Card.Link>
          <Card.Link href="#">Github</Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default Profile;
