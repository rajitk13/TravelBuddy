import React, { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import RequestCard from "./RequestCard";
import classes from "./myrequests.module.css";
import { ThreeDots } from "react-loader-spinner";

const MyRequests = () => {
  const [requestList, setRequestList] = useState([]);
  const [error, setError] = useState();
  const [load, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function getRequests() {
      const response = await fetch(
        "https://travel-buddy-9f75.onrender.com/requests/me",
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      const data = await response.json();
      if (data.error) {
        return setError(
          "There was some error processing your request try again later"
        );
      }
      if (data.empty) {
        setLoading(false);
        return setError("There are no requests available, try again later");
      }

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
        {error && (
          <h6 style={{ color: "red", fontSize: "25px" }}>
            <i className="fa-solid fa-triangle-exclamation"></i> {error}
          </h6>
        )}
        {load && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#212529"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        {!error && (
          <div className={classes.extrapad}>
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
                    auth={authCtx}
                  />
                </div>
              );
            })}
          </div>
        )}
      
      </div>
    </>
  );
};

export default MyRequests;
