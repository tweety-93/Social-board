import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Sidebar from "./components/Navbar/Sidebar";
import HomePage from "./components/Pages/HomePage";
import Profile from "./components/Pages/Profile";
import Addpost from "./components/Pages/Addpost";
import Feed from "./components/Pages/Feed";
import Save from "./components/Pages/Save";

export default function App() {
  const location = useLocation();

  const showSidebar = location.pathname !== "/";

  return (
    <div className="flex">
    
      {showSidebar && <Sidebar />}

      <div className="flex-1 p-8">
        <Routes>
        
          <Route path="/" element={<Auth />} />
          
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addpost" element={<Addpost />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/save" element={<Save />} />
        </Routes>
      </div>
    </div>
  );
}
