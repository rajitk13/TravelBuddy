import * as React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Explore from "./Components/explore/Explore";
import MyRequests from "./Components/myrequests/MyRequests";
import Home from "./Components/Home";
import Login from "./Components/login/Login";
// import Footer from "./Components/partials/Footer";
import Header from "./Components/partials/Header";
import Profile from "./Components/profile/Profile";
import Request from "./Components/request/Request";
import Signup from "./Components/signup/Signup";
import AuthContext from "./store/auth-context";
import Logout from "./Components/Logout";



const App = () => {
  const authCtx = React.useContext(AuthContext);
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={authCtx.isLoggedIn?<Explore />:<Navigate to="/" replace/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={authCtx.isLoggedIn?<Profile />:<Navigate to="/" replace/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/request" element={authCtx.isLoggedIn?<Request />:<Navigate to="/" replace/>} />
          <Route path="/logout" element={authCtx.isLoggedIn?<Logout />:<Navigate to="/login" replace/>} />
          <Route path="/myrequests" element={authCtx.isLoggedIn?<MyRequests />:<Navigate to="/" replace/>} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
