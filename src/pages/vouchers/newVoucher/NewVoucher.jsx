import React from "react";
import "./newColor.css";

//redux

//router
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import colorApi from "../../../api/colorApi";
import brandsApi from "../../../api/brandApi";

export default function NewVoucher() {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      console.log("color value", values);
      const response = await brandsApi.add(values);
      if (response) {
        toast.success("Add brand success!");

        setTimeout(() => {
          // localStorage.clear();
          history.push("/brands");
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
      <h1 className="newUserTitle">Create New Brand</h1>
      <form
        onSubmit={formik.handleSubmit}
        action="submit"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label>Brand Value</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Brand name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>

        <div className="btnBox">
          <Link className="cancel" to="/colors">
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
