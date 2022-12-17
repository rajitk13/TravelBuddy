import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import classes from "./Explore.module.css";

const ExploreCard = (props) => {
  return (
    <Card
      border="dark"
      style={{ width: "100%" }}
      className={classes.explorecard}
    >
      <Card.Header>
        <b>MUJ to Railway Station</b>
      </Card.Header>
      <Card.Body>
        <Card.Title>Rajit Kuthiala</Card.Title>
        <Card.Text>
          <span>Date: {props.date} </span> <span>Time: {props.time}</span>
          <p>Current Occupants: 1/4</p>
          <p>
            <Button variant="dark" className={classes.explorebtn}>
              Interested
            </Button>
          </p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ExploreCard;
