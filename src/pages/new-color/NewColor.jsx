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
import colorApi from "../../api/colorApi";

export default function NewColor() {
  const formik = useFormik({
    initialValues: {
      colorValue: "",
    },
    onSubmit: (values) => {
      console.log("this value", values);

      handleSubmit(values);
    },
  });

  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      console.log("color value", values);
      const response = await colorApi.add(values);
      if (response) {
        toast.success("Add new size success!");

        setTimeout(() => {
          // localStorage.clear();
          history.push("/colors");
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
      <h1 className="newUserTitle">Create New Color</h1>
      <form
        onSubmit={formik.handleSubmit}
        action="submit"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label>Color Value</label>
          <input
            required
            type="text"
            name="colorValue"
            placeholder="Color value"
            onChange={formik.handleChange}
            value={formik.values.colorValue}
          />
        </div>

        {/* <div className="newUserItem">
          <label>Choose Color</label>
          <div className="colorContainer">
            <input
            className="inputValue"
              required
              type="text"
              name="colorHex"
              placeholder="Color value"
              readOnly
              value={formik.values.colorHex}
            />
            <input
              required
              type="color"
              name="colorHex"
              placeholder="Color value"
              onChange={formik.handleChange}
              value={formik.values.colorHex}
            />
          </div>
        </div> */}

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
