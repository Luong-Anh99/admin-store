import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import "./productList.css";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import productApi from "../../api/productApi";

import { useDispatch } from "react-redux";
import { setProduct, deleteProduct } from "../../redux/product/productAction";
import { Table, Space } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import numberWithCommas from "../../utils/numberWithCommas";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import NotificationDelete from "../../components/notfication-delete/NotificationDelete";

export default function ProductList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [idDelete, setIdDelete] = useState("");

  const [showModal, setShowModal] = useState(false);

  const _openModalDelete = (id) => {
    setIdDelete(id);
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await productApi.getAll();
        if (response) {
          dispatch(setProduct(response.products));
          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  const listProduct = useSelector((state) => state.products.products);

  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      const res = await productApi.delete(id);

      if (res) {
        dispatch(deleteProduct(id));
        toast.warn("Delete Success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      width: 300,
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <div>{text.substring(0, 40)}...</div>,
    },
    {
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <div>{moment(text).format("DD-MM-YYYY").toString()}</div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <div>{text.substring(0, 20)}...</div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <div>{numberWithCommas(text)} $</div>,
    },
    {
      title: "Image",
      dataIndex: "image01",
      key: "image01",
      render: (text) => <img style={{ width: "100px" }} src={text}></img>,
    },
    {
      title: "Action",
      key: "action",
      render: (params) => (
        <Space size="middle">
          <Link to={"/product/" + params._id}>
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

  console.log("tlisst product", listProduct);

  return (
    <div className="productList">
      <ToastContainer autoClose={5000} />
      <div className="productTitleContainer">
        <h1 className="userTitle">List Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create one</button>
        </Link>
      </div>
      {/* <DataGrid
        rows={listProduct}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      /> */}

      <Table
        loading={loading}
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={listProduct.filter((x) => x.isRemoved === false)}
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
