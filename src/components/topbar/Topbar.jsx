import React from "react";
import "./topbar.css";
import { NotificationsNone, Settings, Language } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" className="link">
          <span className="logo">LA admin</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconsContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconsContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconsContainer">
            <Settings />
           
          </div>
          <img src="https://i.pinimg.com/474x/a9/e6/85/a9e685315c3761f64bf490264c3e1421.jpg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
