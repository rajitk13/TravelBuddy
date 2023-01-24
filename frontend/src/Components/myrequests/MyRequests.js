import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import RequestCard from "./RequestCard";
import classes from "./myrequests.module.css";

const MyRequests = () => {
  const [requestList, setRequestList] = useState([]);
  const [error, setError] = useState();
  const [load,setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function getRequests() {
      const response = await fetch("http://localhost:4000/requests/me", {
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
      setLoading(false);
    }
    getRequests();
  }, [authCtx]);
  return (
    <>
   
      <div className={classes.padding}>
        <div className={classes.title}>
          <h1>
            <i className="fa-regular fa-clock"></i> My Requests{" "}
          </h1>
          <h3 className={classes.grey}>check out your request info!</h3>
        </div>
        {load && <h4>Loading....</h4>}
        {!error && (
          <>
            {requestList.map((request, i) => {
              const dateObj = new Date(request.when);
              const date = `${dateObj.getDate()}/${
                dateObj.getMonth() + 1
              }/${dateObj.getFullYear()}`;
              const time = `${("0" + dateObj.getHours()).slice(-2)}:${(
                "0" + dateObj.getMinutes()
              ).slice(-2)}`;
              return (
                <div key={i}>
                  <RequestCard
                    _id={request._id}
                    name={request.creator.name}
                    to={request.to}
                    from={request.from}
                    date={date}
                    time={time}
                    createdat={request.createdAt}
                    disabled={request.disabled}
                    requiredStrength={request.requiredStrength}
                    totalInterested={request.interested.length}
                    interested={request.interested}
                    auth = {authCtx}
                  />
                </div>
              );
            })}
          </>
        )}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default MyRequests;
