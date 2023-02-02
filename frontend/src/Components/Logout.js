import React, { useContext, useEffect, useState } from "react";
import Modal from "../modal/ModalComponent";
import { useNavigate } from "react-router";
import AuthContext from "../store/auth-context";
function Logout() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [show, setShow] = useState();
  const handleClose = () => {
    setShow(false);
    authCtx.logout();
    navigate("/");
  };
  useEffect(()=>{
    async function logout(){
      try {
        const response = await fetch("https://travel-buddy-9f75.onrender.com//users/logout", {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authCtx.token}`,
        }
      });
      const data = await response.json();
      if(data.error){
        return console.log(data.error);
      }
      setShow(true);
      } catch (error) {
        
      }
    }
    logout();
    setShow(true)
  },[authCtx])
  return (
    <>
      <Modal
        handleClose={handleClose}
        show={show}
        title="Success"
        body="Your were logged out successfully"
      />
    </>
  );
}
export default Logout;
