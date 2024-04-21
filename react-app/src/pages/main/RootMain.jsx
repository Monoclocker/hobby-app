import React from 'react';
import Navbar from '../../components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import GroupList from './GroupList';
import MapComponent from "../../components/CreateMap.jsx";

const RootMain = () => {
    return (
        <div className="bg-gradient-to-r from-pink-200 via-purple-300 to-indigo-400 bg-cover bg-center h-screen">
            <Navbar />
            <Routes>
                <Route path="/profile" element={<Profile />} />
                <Route path="/groups" element={<GroupList />} />
                <Route path="/map" element={<MapComponent />} />
            </Routes>
        </div>
    );
};

export default RootMain;
