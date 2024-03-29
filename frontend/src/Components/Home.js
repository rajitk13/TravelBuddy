import React from "react";
import classes from "./Home.module.css";
import Button from "react-bootstrap/Button";
import HomeTable from "./HomeTable";
import HomeCard from "./HomeCard";
import SVG from "./SVG";

const Home = () => {
  return (
    <>
      <SVG />
      <div className={`${classes.spacing}`}>
        <h1 className={classes.padleft}>Looking for a Ride Partner?</h1>
        <h2 className={classes.left}>MUJ to Railway Station?</h2>
        <h2 className={classes.left}>MUJ to Jaipur City ?</h2>
        <h2 className={classes.left}>MUJ to Airport?</h2>
        <hr class="my-4"></hr>
        <h4 className={classes.subtitle}>
          We got you covered , a Ride Sharing Solution specifically built for
          MUJ students by MUJ Students!
        </h4>

        <center>
          <Button variant="dark" className={classes.explore} href="/explore">
            Explore
          </Button>
        </center>
      </div>

      <hr />
      <HomeTable css={classes} />
      <hr />
      <h1 className={classes.padleft}>Optimal Travel Pricing</h1>
      <div className={classes.padding} style={{ marginTop: "1rem" }}>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <HomeCard cartype={"Dzire, Etios"} railway={"Rs 850/-"} airport={"Rs 850/-"} max={2}/>
          </div>
          <div className="col">
            <HomeCard cartype={"Tavera"} railway={"Rs 1300/-"} airport={"Rs 1300/-"} max={6}/>
          </div>
          <div className="col">
            <HomeCard  cartype={"Tempo Traveller"} railway={"Rs 2800/-"} airport={"Rs 2800/-"} max={12}/>
          </div>
          <div className="col">
            <HomeCard  cartype={"Innova"} railway={"Rs 1500"} airport={"Rs 1500/-"} max={5}/>
          </div>
          {/* <div className="col">
            <HomeCard />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Home;
