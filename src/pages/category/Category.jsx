import React, { useEffect } from "react";
import "./category.css";

//router
import { useParams, useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import categoryApi from "../../api/categoryApi";

export default function Category() {
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

  const id = useParams();

  const idCate = id?.categoryId;

  const handleSubmit = async (values) => {
    try {
      const response = await categoryApi.update(idCate, values);
      if (response) {
        toast.success("Update User success!");

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

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await categoryApi.get(idCate);
        if (response) {
          let category = response.category;
          formik.setFieldValue("name", category?.name);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  // console.log("formik", formik.values)
  return (
    <div className="newUser">
      <ToastContainer autoClose={5000} />
      <h1 className="newUserTitle">Edit Category</h1>
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
          <Link className="cancel" to="/categories">
            <button className="cancelButton">Cancel</button>
          </Link>
          <button className="newUserButton" type="submit">
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
