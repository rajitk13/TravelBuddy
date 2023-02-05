import React, { useContext, useEffect, useState } from "react";
import ExploreCard from "./ExploreCard";
import classes from "./Explore.module.css";
import AuthContext from "../../store/auth-context";
import { ThreeDots } from "react-loader-spinner";

const Explore = () => {
  const [requestList, setRequestList] = useState([]);
  const [error, setError] = useState();
  const [load, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function getRequests() {
      const response = await fetch(
        "https://travel-buddy-9f75.onrender.com/requests",
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );
      const data = await response.json();
      setLoading(false);
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
        <h1>
          <i class="fa-solid fa-earth-asia"></i> Explore{" "}
        </h1>
        <h3 className={classes.grey}>find your travel buddy</h3>
      </div>
      {load && (
        <>
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
        </>
      )}
      {!error && (
        <div
          className="row row-cols-1 row-cols-md-3 g-4"
          style={{ paddingBottom: "10%" }}
        >
          {requestList.map((request, i) => {
            const dateObj = new Date(request.when);
            const date = `${dateObj.getDate()}/${
              dateObj.getMonth() + 1
            }/${dateObj.getFullYear()}`;
            const time = `${("0" + dateObj.getHours()).slice(-2)}:${(
              "0" + dateObj.getMinutes()
            ).slice(-2)}`;
            return (
              <div className="col" key={i}>
                <ExploreCard
                  _id={request._id}
                  name={request.creator.name}
                  date={date}
                  time={time}
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
  );
};

export default Explore;
