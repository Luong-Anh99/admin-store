import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import "./userList.css";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import userApi from "../../api/userApi";

import { setUser, deleteUser } from "../../redux/user/userAction";

import { Table, Space, Modal, Button } from "antd";
import NotificationDelete from "../../components/notfication-delete/NotificationDelete";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";

export default function UserList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [idDelete, setIdDelete] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [loadingDel, setLoadingDel] = useState(false);

  const [listProductState, setlistProductState] = useState([]);

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await userApi.getAll();
        if (response) {
          setlistProductState(response.users);
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
    const tempValues = !id.isDisabled;

    try {
      setLoadingDel(true);
      const res = await userApi.delete(id._id);

      if (res) {
        // dispatch(deleteProduct(id));

        setlistProductState((state) =>
          state.map((item) =>
            item._id !== id._id ? item : { ...id, isDisabled: tempValues }
          )
        );
        toast.warn("Disable Success");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingDel(false);
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
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <div>{text.name}</div>,
    },
    {
      title: "Status",
      dataIndex: "isDisabled",
      key: "isDisabled",
      render: (text) => <div>{text ? "Disable" : "Active"} </div>,
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
          {!params?.isDisabled ? (
            <LockOutlined
              className="userListDelete"
              onClick={() => _openModalDelete(params)}
            />
          ) : (
            <UnlockOutlined
              className="userListDelete"
              onClick={() => _openModalDelete(params)}
            />
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">List Account</h1>
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
        dataSource={listProductState}
      />

      <Modal
        title={idDelete?.isDisabled ? "Active" : "Disable"}
        visible={showModal}
        footer={null}
        // onOk={_onOk}
        onCancel={() => setShowModal((state) => !state)}
        // okText="Confirm"
        // cancelText="Cancel"
      >
        <p>Are you sure ?</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => setShowModal((state) => !state)}
            type="primary"
          >
            Cancel
          </Button>
          <Button
            loading={loadingDel}
            onClick={() => handleDelete(idDelete)}
            style={{
              marginLeft: "10px",
              backgroundColor: "red",
              color: "white",
            }}
          >
            {idDelete?.isDisabled ? "Active" : "Disable"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
