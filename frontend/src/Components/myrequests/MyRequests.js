import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import RequestCard from "./RequestCard";
import classes from "./myrequests.module.css";

const MyRequests = () => {
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
    <>
      <div className={classes.padding}>
        <div className={classes.title}>
          <h1>
          <i class="fa-regular fa-clock"></i> My Requests {" "}
          </h1>
          <h3 className={classes.grey}>check out your request info!</h3>
        </div>
        {!error && (
          <div className="row row-cols-1 row-cols-md-12 g-12">
            {requestList.map((request, i) => {
              return (
                <div className="col" key={i}>
                  <RequestCard
                    _id={request._id}
                    name={request.creator.name}
                 
                    to={request.to}
                    from={request.from}
                    createdat={request.createdAt}
                    disabled={request.disabled}
                    requiredStrength={request.requiredStrength}
                    totalInterested={request.interested.length}
                  />
                </div>
              );
            })}
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default MyRequests;