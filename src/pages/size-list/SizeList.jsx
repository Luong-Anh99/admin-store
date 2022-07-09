import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./sizeList.css";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { Table, Space } from "antd";

import sizeApi from "../../api/sizeApi";
import { deleteSize, setSize } from "../../redux/size/sizeAction";
import NotificationDelete from "../../components/notfication-delete/NotificationDelete";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function SizeList() {
  const dispatch = useDispatch();

  const listSize = useSelector((state) => state.sizes.sizes);

  const [loading, setLoading] = useState(true);

  const [idDelete, setIdDelete] = useState("");

  const [showModal, setShowModal] = useState(false);

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

  const _openModalDelete = (id) => {
    setIdDelete(id);
    setShowModal(!showModal);
  };

  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      const res = await sizeApi.delete(id);
      if (res) {
        dispatch(deleteSize(id));
        toast.warn("Delete Success");
      }
    } catch (error) {
      // Error 😨
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        console.log(error.response.data);
        console.log(error.response.status);

        if(error.response.status == 409) {
          toast.error("Can't not delete because there are products of this type  ")
        }
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log("Error", error.message);
      }
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
            onClick={() => _openModalDelete(params._id)}
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

      <NotificationDelete
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
        idDelete={idDelete}
      />
    </div>
  );
}
