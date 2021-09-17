import React from "react";
import "./widgetSm.css";
import {Visibility} from "@material-ui/icons"

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/474x/a9/e6/85/a9e685315c3761f64bf490264c3e1421.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Antonio</span>
            <span className="widgetSmUserTitle">Best Developer</span>
          </div>
          <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/474x/a9/e6/85/a9e685315c3761f64bf490264c3e1421.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Antonio</span>
            <span className="widgetSmUserTitle">Best Developer</span>
          </div>
          <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/474x/a9/e6/85/a9e685315c3761f64bf490264c3e1421.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Antonio</span>
            <span className="widgetSmUserTitle">Best Developer</span>
          </div>
          <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/474x/a9/e6/85/a9e685315c3761f64bf490264c3e1421.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Antonio</span>
            <span className="widgetSmUserTitle">Best Developer</span>
          </div>
          <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img
            src="https://i.pinimg.com/474x/a9/e6/85/a9e685315c3761f64bf490264c3e1421.jpg"
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUserName">Antonio</span>
            <span className="widgetSmUserTitle">Best Developer</span>
          </div>
          <button className="widgetSmButton">
              <Visibility className="widgetSmIcon"/>
              Display
          </button>
        </li>
      </ul>
    </div>
  );
}
