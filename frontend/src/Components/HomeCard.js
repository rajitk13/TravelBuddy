import React from "react";

const HomeCard = (props) => {
  return (
    <>
      <div className="card border-dark mb-3">
        <div className="card-header">{props.cartype}</div>
        <div className="card-body text-dark">
          <h5 className="card-title">{props.carprice}</h5>
          <p className="card-text">
            Railway Station : {props.railway}
            <br/>
            Airport : {props.airport}
          </p>
          <p className="text-muted">Note: Above fare is for {props.max} people at max</p>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
