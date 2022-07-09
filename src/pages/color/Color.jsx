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
import colorApi from "../../api/colorApi";
import { useParams } from "react-router-dom";

export default function Color() {
  const formik = useFormik({
    initialValues: {
      colorValue: "",
    },
    onSubmit: (values) => {
      console.log("this value", values);

      handleSubmit(values);
    },
  });

  const id = useParams();

  const idColor = id?.colorId;

  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      console.log("color value", values);
      const response = await colorApi.update(idColor,values);
      if (response) {
        toast.success("Success!");

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

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await colorApi.get(idColor);
        if (response) {
          console.log("rep", response);
          let color = response.color;
          formik.setFieldValue("colorValue", color?.colorValue);
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



        <div className="btnBox">
          <Link className="cancel" to="/colors">
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
