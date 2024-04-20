import React from "react";
import Navbar from "../../components/Navbar";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";

const RootMain = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default RootMain;
