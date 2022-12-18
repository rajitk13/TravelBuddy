import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import classes from "./Explore.module.css";

const ExploreCard = (props) => {
  return (
    <Card
      border="dark"
      style={{ width: "30rem" }}
      className={classes.explorecard}
    >
      <h1 className={classes.tofrom}>MUJ ➡ Railway Station</h1>

      <Card.Body>
        <Card.Title><b>Rajit Kuthiala</b></Card.Title>
        <Card.Text className='text-muted'>
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
