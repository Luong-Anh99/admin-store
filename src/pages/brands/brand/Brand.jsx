import React, { useEffect } from "react";
import "./color.css";

//redux

//router
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import brandsApi from "../../../api/brandApi";

export default function Brand() {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log("this value", values);

      handleSubmit(values);
    },
  });

  const id = useParams();

  const idColor = id?.brandId;

  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      console.log("color value", values);
      const response = await brandsApi.update(idColor, values);
      if (response) {
        toast.success("Update brand success!");

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

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await brandsApi.get(idColor);
        if (response) {
          console.log("rep", response);
          let color = response?.brand;
          formik.setFieldValue("name", color?.name);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  return (
    <div className="newUser">
      <ToastContainer autoClose={5000} />
      <h1 className="newUserTitle">Edit Color</h1>
      <form
        onSubmit={formik.handleSubmit}
        action="submit"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label>Brand name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Color value"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>

        <div className="btnBox">
          <Link className="cancel" to="/brands">
            <button className="cancelButton">Cancel</button>
          </Link>
          <button className="newUserButton" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
