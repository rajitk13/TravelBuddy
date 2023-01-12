import React, { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import classes from "./Explore.module.css";
import AuthContext from "../../store/auth-context";

const ExploreCard = (props) => {
  const authCtx = useContext(AuthContext);
  async function interestedHandler(e) {
    e.preventDefault();
    const _id = props._id;
    try {
      const response = await fetch(
        `http://localhost:4000/requests/${_id}/interested`,
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
          {props.from} <i class="fa-solid fa-arrow-right-long" /> {props.to}
        </h5>
        <p className="card-text">
          <p>
            <b>
              {" "}
              <i class="fa-regular fa-user"></i> {props.name}
            </b>
          </p>
          <p>
            {" "}
            <i class="fa-regular fa-calendar"></i> Date: {props.date}{" "}
          </p>
          <p>
            {" "}
            <i class="fa-regular fa-clock"></i> Time: {props.time}
          </p>
          <p>
            {" "}
            <i class="fa-solid fa-user-check"></i> Current Occupants: 1/4
          </p>{" "}
          <Button
            variant="dark"
            className={classes.explorebtn}
            onClick={interestedHandler}
          >
            Interested
          </Button>
          <h6>Request Created at : {props.createdat}</h6>
        </p>
      </div>
    </div>
  );
};

export default ExploreCard;
