import React from "react";
import ExploreCard from "./ExploreCard";
import classes from "./Explore.module.css";

const Explore = () => {
  return (
    <div className={classes.padding}>
      <ExploreCard name={"Rajit Kuthiala"} date={"17/12/23"} time={"7:30pm"} />
      <ExploreCard name={"Rajit Kuthiala"} date={"17/12/23"} time={"7:30pm"} />
      <ExploreCard name={"Rajit Kuthiala"} date={"17/12/23"} time={"7:30pm"} />
      <ExploreCard name={"Rajit Kuthiala"} date={"17/12/23"} time={"7:30pm"} />
    </div>
  );
};

export default Explore;
