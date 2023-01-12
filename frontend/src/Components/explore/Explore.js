<<<<<<< Updated upstream
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
=======
import React, { useContext, useEffect, useState } from "react";
import ExploreCard from "./ExploreCard";
import classes from "./Explore.module.css";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import AuthContext from "../../store/auth-context";

const Explore = () => {
  const [requestList, setRequestList] = useState([]);
  const [error, setError] = useState();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function getRequests() {
      const response = await fetch("http://localhost:4000/requests", {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      const data = await response.json();
      if (data.error) {
        return setError(
          "There was some error processing your request try again later"
        );
      }
      if (data.empty)
        return setError("There are no requests available, try again later");
      setRequestList(data);
    }
    getRequests();
  }, [authCtx]);
  return (
    <div className={classes.padding}>
      <div className={classes.title}>
        <h1>Explore </h1>
        <h3 className={classes.grey}>find your travel buddy</h3>
      </div>
      {!error && (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {requestList.map((request, i) => {
            const dateObj = new Date(request.when);
            const date = `${dateObj.getDate()}/${
              dateObj.getMonth() + 1
            }/${dateObj.getFullYear()}`;
            const time = `${dateObj.getHours()}:${dateObj.getMinutes()}`;
            return (
              <div className="col">
                <ExploreCard
                  _id={request._id}
                  name={request.creator.name}
                  date={date}
                  time={time}
                  to={request.to}
                  from={request.from}
                  createdat={request.createdAt}
                />
              </div>
            );
          })}
        </div>
      )}
      {error && <p>{error}</p>}
>>>>>>> Stashed changes
    </div>
  );
};

export default Explore;
