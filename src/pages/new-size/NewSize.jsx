import React from "react";
import "./newSize.css";

//redux

//router
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import sizeApi from "../../api/sizeApi";

export default function NewSize() {
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

  const handleSubmit = async (values) => {
    try {
      const response = await sizeApi.add(values);
      if (response) {
        toast.success("Add new size success!");

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

  return (
    <div className="newUser">
      <ToastContainer autoClose={5000} />
      <h1 className="newUserTitle">Create New Size</h1>
      <form
        onSubmit={formik.handleSubmit}
        action="submit"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label>Size Number</label>
          <input
            required
            type="text"
            name="sizeNumber"
            placeholder="Size Number "
            onChange={formik.handleChange}
            value={formik.values.sizeNumber}
          />
        </div>

        <div className="btnBox">
          <Link className="cancel" to="/sizes">
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
