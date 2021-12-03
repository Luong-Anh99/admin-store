import React from "react";
import "./topbar.css";
import { NotificationsNone, Settings, Language } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Avatar } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import auth from "../authentication/authentication";
import Cookies from "js-cookie";
import userApi from "../../api/userApi";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import jwtDecode from "jwt-decode";
import axios from "axios";

export default function Topbar(props) {
  const auth = Cookies.get("auth");
  console.log("this auth", jwtDecode(auth));

  const handleLogout = () => {
    try {
      toast.success("Logout success");
      window.location.reload();
      Cookies.remove("auth");
    } catch (error) {
      toast.error("fail because " + error.message, { autoClose: false });
    }
    // window.location.reload();
    // Cookies.remove('auth')
  };

  // const handleLogout = async () => {

  //   axios.post('http://e795-2405-4803-d011-4f00-6191-6bf5-9f87-4709.ngrok.io/logout', {withCredentials: true})
  //   .then(res => {
  //     const persons = res.data;
  //     console.log(res)
  //     Cookies.remove('auth')
  //     window.location.reload();
  //   })
  //   .catch(error => console.log(error));

  // };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button onClick={handleLogout} /* onClick={() => auth.logout()}*/>
          Đăng xuất
        </button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="topbar">
      <ToastContainer autoClose={5000} />
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
          <Dropdown icon overlay={menu} trigger={["click"]}>
            <Avatar size={45} icon={<UserOutlined />} />
          </Dropdown>

          {/* <img
            src="https://i.pinimg.com/474x/a9/e6/85/a9e685315c3761f64bf490264c3e1421.jpg"
            alt=""
            className="topAvatar"
          /> */}
        </div>
      </div>
    </div>
  );
}
