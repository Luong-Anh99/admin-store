import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import "./order-list.css";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import todoApi from "../../api/todoApi";

import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/user/userAction";

import { Table, Tag, Space } from "antd";

import orderApi from "../../api/orderApi";
import { setOrder } from "../../redux/order/orderAction";
import numberWithCommas from "../../utils/numberWithCommas";

export default function OrderList() {
  const dispatch = useDispatch();

  const [showStatus, setShowStatus] = useState(1);

  const [loading, setLoading] = useState(true);

  const listOrders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await orderApi.getAll();
        if (response) {
          dispatch(setOrder(response.orders));
          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  // useEffect(() => {
  //   const fetchTotoList = async () => {
  //     try {
  //       const response = await orderApi.getAll();
  //       if (response) dispatch(setOrder(response.orders));
  //     } catch (error) {
  //       console.log("error:", error);
  //     }
  //   };

  //   fetchTotoList();
  // }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Total Money",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (text) => <div>{numberWithCommas(text)} $</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (params) => (
        <Space size="middle">
          <Link to={"/order/" + params._id}>
            <button className="userListEdit">Edit</button>
          </Link>
          <DeleteOutline
            style={{ display: "none" }}
            className="userListDelete"
            onClick={() => handleDelete(params._id)}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = async (id) => {
    try {
      await todoApi.delete(id);
      dispatch(deleteUser(id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">List Order</h1>
      </div>
      <div className="status-container">
        <div
          onClick={() => setShowStatus(1)}
          className={`status-item ${showStatus === 1 ? "active" : ""}`}
        >
          Chờ xác nhận
        </div>
        <div
          onClick={() => setShowStatus(2)}
          className={`status-item ${showStatus === 2 ? "active" : ""}`}
        >
          Đang vận chuyển
        </div>
        <div
          onClick={() => setShowStatus(3)}
          className={`status-item ${showStatus === 3 ? "active" : ""}`}
        >
          Đơn đã hoàn tất
        </div>

        <div
          onClick={() => setShowStatus(4)}
          className={`status-item ${showStatus === 4 ? "active" : ""}`}
        >
          Đơn đã hủy
        </div>
      </div>

      {showStatus === 1 && (
        <Table
          loading={loading}
          columns={columns}
          pagination={{ pageSize: 5 }}
          dataSource={listOrders.filter((e) => e.status === "pending")}
        />
      )}

      {showStatus === 2 && (
        <Table
          loading={loading}
          columns={columns}
          pagination={{ pageSize: 5 }}
          dataSource={listOrders.filter((e) => e.status === "shipping")}
        />
      )}

      {showStatus === 3 && (
        <Table
          loading={loading}
          columns={columns}
          pagination={{ pageSize: 5 }}
          dataSource={listOrders.filter((e) => e.status === "succeeded")}
        />
      )}

      {showStatus === 4 && (
        <Table
          loading={loading}
          columns={columns}
          pagination={{ pageSize: 5 }}
          dataSource={listOrders.filter((e) => e.status === "failed")}
        />
      )}
    </div>
  );
}
