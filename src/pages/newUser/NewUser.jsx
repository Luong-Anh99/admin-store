import React from "react";
import "./newUser.css";

//redux

//api
import userApi from "../../api/userApi";

//router
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function NewUser() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log("this value", values);

      handleSubmit(values);
    },
  });

  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const response = await userApi.add(values);
      if (response) {
        toast.success("Add new User success!");

        setTimeout(() => {
          // localStorage.clear();
          history.push("/users");
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
      <h1 className="newUserTitle">Create New Admin</h1>
      <form
        onSubmit={formik.handleSubmit}
        action="submit"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label>Username</label>
          <input
            required
            type="text"
            name="name"
            placeholder="Name "
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            required
            type="text"
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            required
            type="text"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            placeholder="Phone Number"
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            required
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="text"
            placeholder="Password"
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
