import { useEffect, useState } from "react";

import "./productList.css";

import { Link } from "react-router-dom";

import productApi from "../../api/productApi";

import { Space, Table, Modal, Button } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import { useDispatch } from "react-redux";
import numberWithCommas from "../../utils/numberWithCommas";

//notification
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [loadingDel, setLoadingDel] = useState(false);

  const [idDelete, setIdDelete] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [listProductState, setlistProductState] = useState([]);

  const _openModalDelete = (id) => {
    setIdDelete(id);
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await productApi.getAll();
        if (response) {
          setlistProductState(response?.products);
          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  // const listProductState = useSelector((state) => state.products.products);

  const handleDelete = async (id) => {
    const tempValues = !id.isDisabled;

    try {
      setLoadingDel(true);
      const res = await productApi.delete(id._id);

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

  console.log(listProductState);

  const columns = [
    {
      width: 150,
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <div>{text?.substring(0, 40)}...</div>,
    },
    {
      width: 120,
      title: "Create Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => (
        <div>{moment(text).format("DD-MM-YYYY").toString()}</div>
      ),
    },

    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (text) => <div>{text?.name} </div>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (text) => <div>{text?.name} </div>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <div>{numberWithCommas(text)} $</div>,
    },
    {
      title: "Status",
      dataIndex: "isDisabled",
      key: "isDisabled",
      render: (text) => <div>{text ? "Disable" : "Active"} </div>,
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
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="userTitle">List Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create one</button>
        </Link>
      </div>
      {/* <DataGrid
        rows={listProductState}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
      /> */}

      <Table
        loading={loading}
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={listProductState}
      />

      {/* <NotificationDelete
        titleDis={"Disable"}
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
        idDelete={idDelete}
        loading={loadingDel}
      /> */}

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
