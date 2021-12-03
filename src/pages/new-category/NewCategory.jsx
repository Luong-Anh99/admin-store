import React, { useState } from "react";
import "./newCategory.css";

//redux
import { useDispatch } from "react-redux";

//api
import userApi from "../../api/userApi";
import { addUser } from "../../redux/user/userAction";

//router
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  Link,
} from "react-router-dom";
import { useFormik } from "formik";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import categoryApi from "../../api/categoryApi";

export default function NewCategory() {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log("this value", values);

      handleSubmit(values);
    },
  });

  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const response = await categoryApi.add(values);
      if (response) {
        toast.success("Add new category success!");

        setTimeout(() => {
          // localStorage.clear();
          history.push("/categories");
          // window.location.reload();
        }, 2000);
      }
    } catch (error) {
      toast.error("Add fail because " + error.message, { autoClose: false });
    }
  };

  return (
    <div className="newUser">
      <ToastContainer autoClose={5000} />
      <h1 className="newUserTitle">Create New Category</h1>
      <form
        onSubmit={formik.handleSubmit}
        action="submit"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label>Type Category</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Name "
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>

        <div className="btnBox">
          <Link className="cancel" to="/users">
            <button className="cancelButton">Cancel</button>
          </Link>
          <button className="newUserButton" type="submit">
            Create 
          </button>
        </div>
      </form>
    </div>
  );
}
