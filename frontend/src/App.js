import * as React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./Components/explore/Explore";
import Home from "./Components/Home";
import Login from "./Components/login/Login";
import Footer from "./Components/partials/Footer";
import Header from "./Components/partials/Header";
import Profile from "./Components/profile/Profile";

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
          <Route path="/explore" element={<Explore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
