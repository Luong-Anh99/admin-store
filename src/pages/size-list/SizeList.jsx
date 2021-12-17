import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./sizeList.css";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { Table, Space } from "antd";

import sizeApi from "../../api/sizeApi";
import { deleteSize, setSize } from "../../redux/size/sizeAction";

export default function SizeList() {
  const dispatch = useDispatch();

  const listSize = useSelector((state) => state.sizes.sizes);

  const [loading, setLoading] = useState(true);

  //dispatch(setUser(response.users))

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await sizeApi.getAll();
        if (response) {
          dispatch(setSize(response.sizes));
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
      dispatch(deleteSize(id));
      await sizeApi.delete(id);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Size Number",
      dataIndex: "sizeNumber",
      key: "sizeNumber",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (params) => (
        <Space size="middle">
          <Link to={"/size/" + params._id}>
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
        <h1 className="userTitle">List Size Current</h1>
        <Link to="/newSize">
          <div className="buttonBox">
            <button className="userAddButton">Create</button>
          </div>
        </Link>
      </div>
      <Table
        loading={loading}
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={listSize}
      />
    </div>
  );
}
