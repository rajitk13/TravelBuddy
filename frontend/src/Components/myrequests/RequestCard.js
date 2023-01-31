import React from "react";
import moment from "moment";
import classes from "./myrequests.module.css";
import "./table.css"
const RequestCard = (props) => {
  const rel = moment(props.createdat).fromNow();

  return (
    <div className={`${classes.cardpad}`}>
      <div className="row">
        <div className="col col-12 col-md-6 overflow-auto">
          <h5 className="card-title">
            {" "}
            {props.from} <i className="fa-solid fa-arrow-right-long" />{" "}
            {props.to}
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
        <div className="col col-12 col-md-6  overflow-auto">
          <h5 className="card-title">Interested</h5>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">Confirm</th>
              </tr>
            </thead>
            <tbody>
              {props.interested.map((val, i) => {
                return (
                  <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.phone}</td>
                    <td>A button here</td>
                  </tr>
                );
              })}
              {props.interested.length === 0 && (
                <p>No Interested Indivisdual</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
