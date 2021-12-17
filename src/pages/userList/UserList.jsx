import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./userList.css";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import userApi from "../../api/userApi";

import { setUser, deleteUser } from "../../redux/user/userAction";

import { Table, Space } from "antd";

export default function UserList() {
  const dispatch = useDispatch();

  const listUser = useSelector((state) => state.users.users);

  const [loading, setLoading] = useState(true);
  //dispatch(setUser(response.users))

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await userApi.getAll();
        if (response) {
          dispatch(setUser(response.users));
          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchTotoList();
  }, []);

  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      dispatch(deleteUser(id));
      await userApi.delete(id);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <div>{text}</div>,
    },

    // {
    //   title: "Password",
    //   dataIndex: "password",
    //   key: "password",
    //   render: (text) => (
    //     <input
    //       style={{ border: "none" }}
    //       readOnly
    //       type="password"
    //       defaultValue={text}
    //     />
    //   ),
    // },

    {
      title: "Action",
      key: "action",
      render: (params) => (
        <Space size="middle">
          <Link to={"/user/" + params._id}>
            <button className="userListEdit">Edit</button>
          </Link>
          <DeleteOutline
            className="userListDelete"
            onClick={() => handleDelete(params._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">List Employee</h1>
        <Link to="/newUser">
          <div className="buttonBox">
            <button className="userAddButton">Create</button>
          </div>
        </Link>
      </div>
      <Table
        loading={loading}
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={listUser}
      />
    </div>
  );
}
