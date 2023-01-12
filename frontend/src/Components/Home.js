import React from "react";

import classes from "./Home.module.css";
import Button from "react-bootstrap/Button";
import HomeTable from "./HomeTable";
import HomeCard from "./HomeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "../modal/ModalComponent";
import { useState } from "react";

const Home = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal handleClose={handleClose} show={show} />
      <div className={classes.spacing}>
        <h1 className={classes.padleft} onClick={handleShow}>
          Looking for a Ride Partner?
        </h1>
        <h2 className={classes.left}>MUJ to Railway Station?</h2>
        <h2 className={classes.left}>MUJ to Jaipur City ?</h2>
        <h2 className={classes.left}>MUJ to Airport?</h2>
        <hr></hr>
        <h4 className={classes.subtitle}>
          We got you covered , a Ride Sharing Solution specifically built for
          MUJ students by MUJ Students!
        </h4>
      </div>
      <center>
        <Button variant="dark" className={classes.explore}>
          Explore
        </Button>
      </center>
      <hr />
      <HomeTable css={classes} />
      <hr />
      <h1 className={classes.padleft}>Optimal Travel Pricing</h1>
      <div className={classes.padleft} style={{ marginTop: "1rem" }}>
        <Container fluid>
          <Row>
            <Col>
              <HomeCard />
            </Col>
            <Col>
              <HomeCard />
            </Col>
            <Col>
              <HomeCard />
            </Col>
          </Row>
          <Row>
            <Col>
              <HomeCard />
            </Col>
            <Col>
              <HomeCard />
            </Col>
            <Col>
              <HomeCard />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
