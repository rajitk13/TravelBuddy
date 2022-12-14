import React from "react";

import classes from "./Home.module.css";
import Button from "react-bootstrap/Button";

const Home = () => {
  return (
    <>
      <p className={classes.spacing}>
        <h1 style={{ textAlign: "end", paddingRight: "30%" }}>
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
      </p>
      <center>
        <Button variant="dark" className={classes.explore}>
          Explore
        </Button>
      </center>
      <hr/>
    </>
  );
};

export default Home;
