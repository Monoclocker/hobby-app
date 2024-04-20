import React from "react";
import Navbar from "../../components/Navbar";
import { Routes, Route } from "react-router-dom";
import Profile from "./Profile";
import GroupList from "./GroupList";

const RootMain = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/groups" element={<GroupList />} />
      </Routes>
    </>
  );
};

export default RootMain;
