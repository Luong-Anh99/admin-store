import React, { useState } from "react";
import "./sidebar.css";

import {
  LineStyle,
  PersonOutline,
  AttachMoney,
  SportsEsports,
  DynamicFeed,
  BusinessCenter,
  LocalMall
} from "@material-ui/icons";

//router
import { useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const [active, setActive] = useState(location.pathname);

  console.log("active", active);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li
                className={`sidebarListItem ${active === "/" ? "active" : ""} `}
                onClick={() => setActive("/")}
              >
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li
                className={`sidebarListItem ${
                  active === "/users" ? "active" : ""
                } `}
                onClick={() => setActive("/users")}
              >
                <PersonOutline className="sidebarIcon" />
               Admin
              </li>
            </Link>
            <Link to="/products" className="link">
              <li
                className={`sidebarListItem ${
                  active === "/products" ? "active" : ""
                } `}
                onClick={() => setActive("/products")}
              >
                <SportsEsports className="sidebarIcon" />
                Product
              </li>
            </Link>
            <Link to="/orders" className="link">
              <li
                className={`sidebarListItem ${
                  active === "/order" ? "active" : ""
                } `}
                onClick={() => setActive("/order")}
              >
                <AttachMoney className="sidebarIcon" />
                Order
              </li>
            </Link>
            <Link to="/categories" className="link">
              <li
                className={`sidebarListItem ${
                  active === "/categories" ? "active" : ""
                } `}
                onClick={() => setActive("/categories")}
              >
                <DynamicFeed className="sidebarIcon" />
                Category
              </li>
            </Link>

            <Link to="/sizes" className="link">
              <li
                className={`sidebarListItem ${
                  active === "/sizes" ? "active" : ""
                } `}
                onClick={() => setActive("/sizes")}
              >
                <BusinessCenter className="sidebarIcon" />
                Size
              </li>
            </Link>
            <Link to="/colors" className="link">
              <li
                className={`sidebarListItem ${
                  active === "/colors" ? "active" : ""
                } `}
                onClick={() => setActive("/colors")}
              >
                <LocalMall className="sidebarIcon" />
                Color
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
