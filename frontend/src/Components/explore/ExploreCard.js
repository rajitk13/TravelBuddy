import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "./Explore.module.css";
import AuthContext from "../../store/auth-context";
import moment from 'moment'
const ExploreCard = (props) => {
  const authCtx = useContext(AuthContext);
  async function interestedHandler(e) {
    e.preventDefault();
    const _id = props._id;
    try {
      const response = await fetch(
        `https://travel-buddy-9f75.onrender.com/requests/${_id}/interested`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      const data = await response.json();
      if (data.error)
        return console.log("There was some error fetching your data");
      if (data.full) return console.log("Request is already full");
      if (data.interestedBefore)
        return console.log("You have already shown interest");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {" "}
          {props.from} <i className="fa-solid fa-arrow-right-long" /> {props.to}
        </h5>
        <div className="card-text">
          <p>
            <b>
              {" "}
              <i className="fa-regular fa-user"></i> {props.name}
            </b>
          </p>
          <p>
            {" "}
            <i className="fa-regular fa-calendar"></i> Date: {props.date}{" "}
          </p>
          <p>
            {" "}
            <i className="fa-regular fa-clock"></i> Time: {props.time}
          </p>
          <p>
            {" "}
            <i className="fa-solid fa-user-check"></i> {`Current Occupants: ${props.totalInterested}/${props.requiredStrength}`}
          </p>{" "}
          <Button
            variant="dark"
            className={classes.explorebtn}
            onClick={interestedHandler}
            disabled={props.disabled}
          >
            Interested
          </Button>
          <h6>Request made: {moment(props.createdat).fromNow()}</h6>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
