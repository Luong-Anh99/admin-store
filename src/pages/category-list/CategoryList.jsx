import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import "./categoryList.css";

import { userRows } from "../../dummyData";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import categoryApi from "../../api/categoryApi";

import { setCategory, deleteCategory } from "../../redux/category/categoryAction";

import { Table, Tag, Space } from "antd";
import moment from "moment";
import categoriesApi from "../../api/categoryApi";

export default function CategoryList() {
  const dispatch = useDispatch();

  const listCategory = useSelector((state) => state.categories.categories);

  //dispatch(setUser(response.users))

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await categoryApi.getAll();
        if (response) {dispatch(setCategory(response.categories))
        setLoading(false)}
      } catch (error) {
        console.log("error:", error);
      }
    };
    fetchTotoList();
  }, []);

  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      dispatch(deleteCategory(id));
      await categoryApi.delete(id);
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
      render: (text) =>  <div>{moment(text).format("DD-MM-YYYY").toString()}</div>,
    },

    {
      title: "Last update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text) =>  <div>{moment(text).format("DD-MM-YYYY").toString()}</div>,
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
            onClick={() => handleDelete(params._id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="userList">
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
    </div>
  );
}
