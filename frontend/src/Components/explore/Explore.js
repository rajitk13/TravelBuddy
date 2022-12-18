import React from "react";
import ExploreCard from "./ExploreCard";
import classes from "./Explore.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Explore = () => {
  return (
    <div className={classes.padding}>
      {/* <ExploreCard name={"Rajit Kuthiala"} date={"17/12/23"} time={"7:30pm"} />
      <ExploreCard name={"Rajit Kuthiala"} date={"17/12/23"} time={"7:30pm"} />
      <ExploreCard name={"Rajit Kuthiala"} date={"17/12/23"} time={"7:30pm"} />
      <ExploreCard name={"Rajit Kuthiala"} date={"17/12/23"} time={"7:30pm"} /> */}
      {/* <Container> */}
        {/* Stack the columns on mobile by making one full-width and the other half-width */}
        <Row>
          <Col xs={12} md={4} lg={4}>
            <ExploreCard
              name={"Rajit Kuthiala"}
              date={"17/12/23"}
              time={"7:30pm"}
            />
          </Col>
          <Col xs={12} md={4}>
            <ExploreCard
              name={"Rajit Kuthiala"}
              date={"17/12/23"}
              time={"7:30pm"}
            />
          </Col>
          <Col xs={12} md={4}>
            <ExploreCard
              name={"Rajit Kuthiala"}
              date={"17/12/23"}
              time={"7:30pm"}
            />
          </Col>
          <Col xs={12} md={4}>
            <ExploreCard
              name={"Rajit Kuthiala"}
              date={"17/12/23"}
              time={"7:30pm"}
            />
          </Col>
        </Row>
      {/* </Container> */}
    </div>
  );
};

export default Explore;
