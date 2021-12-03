// import React, { useState } from "react";
// import "./productList.css";

// import { productRows } from "../../dummyData";

// import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
// import { Link } from "react-router-dom";

// export default function ProductList() {
//   const [data, setData] = useState(productRows);

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const columns = [
//     { field: "id", headerName: "ID", width: 90 },
//     {
//       field: "product",
//       headerName: "Product",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="productListItem">
//             <img className="productListImg" src={params.row.image} alt="" />
//             {params.row.name}
//           </div>
//         );
//       },
//     },
//     { field: "stock", headerName: "Stock", width: 150 },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 120,
//     },
//     {
//       field: "price",
//       headerName: "Price",
//       width: 160,
//     },
//     {
//       field: "action",
//       headerName: "Action",
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={"/product/" + params.row.id}>
//               <button className="productListEdit">Edit</button>
//             </Link>
//             <DeleteOutline
//               className="productListDelete"
//               onClick={() => handleDelete(params.row.id)}
//             />
//           </>
//         );
//       },
//     },
//   ];
//   return (
//     <div className="productList">
//       <DataGrid
//         rows={data}
//         disableSelectionOnClick
//         columns={columns}
//         pageSize={10}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import "./productList.css";

import { userRows } from "../../dummyData";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import productApi from "../../api/productApi";
import todoApi from "../../api/todoApi";

import { useDispatch } from "react-redux";
import { setProduct, deleteProduct } from "../../redux/product/productAction";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";
import moment from "moment";
import numberWithCommas from "../../utils/numberWithCommas";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function ProductList() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await productApi.getAll();
        if (response) dispatch(setProduct(response.products));
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  const listProduct = useSelector((state) => state.products.products);

  const handleDelete = async (id) => {

    console.log("id", id)
    try {
      dispatch(deleteProduct(id));
      toast.warn("Delete Success")
      await productApi.delete(id);
      
    } catch (error) {
      console.log(error);
    }
  };




  const columns = [
    {
      width:300,
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) =>  <div>{text.substring(0,40)}...</div>
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
      render: (text) => (
        <div>{text.substring(0,20)}...</div>
      ),
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
            onClick={() => handleDelete(params._id)}
          />
        </Space>
      ),
    },
  ]

  console.log("tlisst product", listProduct)

  return (
    <div className="productList">
       <ToastContainer autoClose={5000} />
      <div className="productTitleContainer">
        <h1 className="productTitle">List Product</h1>
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
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={listProduct.filter((x) => x.isRemoved ===false)}
      />
    </div>
  );
}
