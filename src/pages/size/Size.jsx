import React, { useEffect } from "react";
import "./size.css";

//redux

//router
import { useParams, useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import sizeApi from "../../api/sizeApi";

export default function Size() {
  const formik = useFormik({
    initialValues: {
      sizeNumber: "",
    },
    onSubmit: (values) => {
      console.log("this value", values);

      handleSubmit(values);
    },
  });

  const history = useHistory();

  const id = useParams();

  const idSize = id?.sizeId;

  const handleSubmit = async (values) => {
    try {
      const response = await sizeApi.update(idSize, values);
      if (response) {
        toast.success("Update Size success!");

        setTimeout(() => {
          // localStorage.clear();
          history.push("/sizes");
          // window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("Add fail because " + error.message, { autoClose: false });
    }
  };

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await sizeApi.get(idSize);
        if (response) {
          console.log("rep", response);
          let size = response.size;
          formik.setFieldValue("sizeNumber", size?.sizeNumber);
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
      <h1 className="newUserTitle">Edit Size</h1>
      <form
        onSubmit={formik.handleSubmit}
        action="submit"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label>Size current</label>
          <input
            required
            type="text"
            name="sizeNumber"
            placeholder="size "
            onChange={formik.handleChange}
            value={formik.values.sizeNumber}
          />
        </div>

        <div className="btnBox">
          <Link className="cancel" to="/sizes">
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
