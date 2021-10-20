import React, { useState } from "react";
import "./newUser.css";

//redux
import { useDispatch } from "react-redux";


//api
import todoApi from "../../api/todoApi";
import {addUser} from '../../redux/user/userAction'

export default function NewUser() {

  const[username, setUsername] = useState("");
  const[fullname, setFullname] = useState("");
  const[email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [active, setActive] = useState("yes");

  const dispatch = useDispatch();


  const handleAddUser = async (e) => {
    e.preventDefault();
    const user = {
      id:"123",
      username: username,
      fullname: fullname,
      email:email,
      password:password,
      phone:phone,
      address:address,
      gender:gender,
      active:active
    }
    console.log("newUser", user);
    try {    
      await (todoApi.add(user));
      dispatch(addUser(user));
    } catch (error){
      console.log(error);
    }
    setUsername("");
    setFullname("");
    setEmail("");
    setPassword("");
    setPhone("");
    setAddress("")
  }


  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="Jack" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="Antonio" value={fullname} onChange={(e) => setFullname(e.target.value)}  />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="text" placeholder="khima@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+0921412415" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="Ha Noi | Viet Nam" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" onClick={(e) => setGender(e.target.value)} />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" onClick={(e) => setGender(e.target.value)}/>
            <label for="female">Female</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active"  onChange={(e) => setActive(e.target.value)}>
            <option value="yes" >Yes</option>
            <option value="no" >No</option>
          </select>
        </div>
        <button className="newUserButton" onClick={handleAddUser} >Create</button>
      </form>
    </div>
  );
}
