import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { useLocation, useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";

import todoApi from "../../api/todoApi";

import "./user.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";

export default function User() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [active, setActive] = useState("yes");

  const [user, setUser] = useState("");

  const location = useLocation();

  const id = useParams();

  const idUser = id.userId;

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await todoApi.get(idUser);
        if (response) setUser(response);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchUserList();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    const userApi = user;
    const newUser = {
      username: (username.length===0)? userApi.username : username,
      fullname: (fullname.length===0)? userApi.fullname : fullname ,
      email: (email.length===0)? userApi.email : email,
      phone: (phone.length===0)? userApi.phone : phone,
      address: (address.length===0)? userApi.address : address,
    };
    setUser(newUser)
    try {
      await todoApi.update(idUser, newUser);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("user nef", user);


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://vcdn1-giaitri.vnecdn.net/2020/11/03/lisa-3-1604394414.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Uzqm3erCQJd3bC_65SfkrQ"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUserName">{user.username}</span>
              <span className="userShowUserTitle">Idol KPOP</span>
            </div>
          </div>
          <div className="userShowButtom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.fullname}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">12.9.1997</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{user.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{user.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form onSubmit={updateUser} className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full name</label>
                <input
                  type="text"
                  placeholder={user.fullname}
                  className="userUpdateInput"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={user.phone}
                  className="userUpdateInput"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={user.address}
                  className="userUpdateInput"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src="https://vcdn1-giaitri.vnecdn.net/2020/11/03/lisa-3-1604394414.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=Uzqm3erCQJd3bC_65SfkrQ"
                  alt=""
                  className="userUpdateImg"
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />{" "}
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
