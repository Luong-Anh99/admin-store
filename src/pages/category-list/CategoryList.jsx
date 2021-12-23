import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import "./categoryList.css";

import { userRows } from "../../dummyData";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import categoryApi from "../../api/categoryApi";

import {
  setCategory,
  deleteCategory,
} from "../../redux/category/categoryAction";

import { Table, Tag, Space } from "antd";
import moment from "moment";
import categoriesApi from "../../api/categoryApi";

import NotificationDelete from "../../components/notfication-delete/NotificationDelete";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";


export default function CategoryList() {
  const dispatch = useDispatch();

  const listCategory = useSelector((state) => state.categories.categories);

  //dispatch(setUser(response.users))

  const [loading, setLoading] = useState(true);

  const [idDelete, setIdDelete] = useState("");

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await categoryApi.getAll();
        if (response) {
          dispatch(setCategory(response.categories));
          setLoading(false);
        }
      } catch (error) {
        console.log("errore", error);
      }
    };
    fetchTotoList();
  }, []);

  const _openModalDelete = (id) => {
    setIdDelete(id);
    setShowModal(!showModal);
  };

  const handleDelete = async (id) => {
    setShowModal(!showModal);
    console.log("id", id);
    try {
      const res = await categoryApi.delete(id);
      if (res) {
        dispatch(deleteCategory(id));
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
      title: "Type category",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
      render: (text) => <div>{text}</div>,
    },

    {
      title: "Day Create",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <div>{moment(text).format("DD-MM-YYYY").toString()}</div>
      ),
    },

    {
      title: "Last update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) => (
        <div>{moment(text).format("DD-MM-YYYY").toString()}</div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (params) => (
        <Space size="middle">
          <Link to={"/category/" + params._id}>
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
      <ToastContainer autoClose={5000} />
      <div className="userTitleContainer">
        <h1 className="userTitle">List Category</h1>
        <Link to="/newCategory">
          <div className="buttonBox">
            <button className="userAddButton">Create</button>
          </div>
        </Link>
      </div>
      <Table
        loading={loading}
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={listCategory}
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
