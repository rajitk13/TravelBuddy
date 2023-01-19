import React from "react";
import moment from 'moment';
const RequestCard = (props) => {
  const rel = moment(props.createdat).fromNow();
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
          <h6>Request made: {rel}</h6>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
