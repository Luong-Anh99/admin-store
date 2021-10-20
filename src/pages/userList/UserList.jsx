import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import {useLocation, useParams} from'react-router-dom'

import "./userList.css";

import { userRows } from "../../dummyData";

import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";

import todoApi from "../../api/todoApi";

import { useDispatch } from "react-redux";
import {setUser,deleteUser} from '../../redux/user/userAction'

export default function UserList() {



  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTotoList = async() => {
      try{
        const response = await todoApi.getAll();
        if(response) dispatch(setUser(response))
      } catch(error) {
        console.log("error:", error);
      }
    }    
    
    fetchTotoList();
  }, [])

  const listUser = useSelector(state => state.users.users);
  
  const handleDelete = async (id) => {
    try {    
      await (todoApi.delete(id));
      dispatch(deleteUser(id));
    } catch (error){
      console.log(error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction",
      width: 140,
    },
    {
      field: "member",
      headerName: "Member",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  return (
    <div className="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">List User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <DataGrid
        rows={listUser}
        disableSelectionOnClick
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
