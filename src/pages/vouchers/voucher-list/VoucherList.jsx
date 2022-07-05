import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import "./colorList.css";

import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import { Space, Table } from "antd";

import moment from "moment";
import colorApi from "../../../api/colorApi";
import NotificationDelete from "../../../components/notfication-delete/NotificationDelete";
import { deleteColor } from "../../../redux/color/colorAction";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import vouchersApi from "../../../api/voucherApi";

export default function VoucherList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [idDelete, setIdDelete] = useState("");

  const [loadingDel, setLoadingDelete] = useState(false);

  const _openModalDelete = (id) => {
    setIdDelete(id);
    setShowModal(!showModal);
  };

  //dispatch(setUser(response.users))

  const [listBrands, setListBrands] = useState([]);

  console.log(listBrands);
  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await vouchersApi.getAll();
        if (response) {
          //   dispatch(setColor(response.colors));
          setListBrands(response?.promotions);
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
    setLoadingDelete(true);
    try {
      const res = await vouchersApi.delete(id);

      if (res) {
        setListBrands((state) => state.filter((item) => item._id !== id));
        toast.warn("Delete Success");
        setLoading(false);
        setShowModal(false);
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

        if (error.response.status == 409) {
          toast.error(
            "Can't not delete because there are products of this type  "
          );
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
    setLoading(false);
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div style={{ maxHeight: "70px", overflow: "auto" }}>{text}</div>
      ),
    },
    {
      title: "Time begin",
      dataIndex: "timeBegin",
      key: "timeBegin",
    },
    {
      title: "Time End",
      dataIndex: "timeEnd",
      key: "timeEnd",
    },
    {
      title: "Money sale",
      dataIndex: "moneySale",
      key: "moneySale",
      render: (text) => <div>{text} $</div>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <div>{text} </div>,
    },
    {
      title: "Action",
      key: "action",
      render: (params) => (
        <Space size="middle">
          <Link to={"/voucher/" + params._id}>
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
      <ToastContainer autoClose={3000} />
      <div className="userTitleContainer">
        <h1 className="userTitle">List Voucher Current</h1>
        <Link to="/newVoucher">
          <div className="buttonBox">
            <button className="userAddButton">Create</button>
          </div>
        </Link>
      </div>
      <Table
        loading={loading}
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={listBrands}
      />
      <NotificationDelete
        loading={loadingDel}
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
        idDelete={idDelete}
      />
    </div>
  );
}
