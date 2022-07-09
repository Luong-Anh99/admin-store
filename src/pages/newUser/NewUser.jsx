import { Button, Select } from "antd";
import React, { useState } from "react";

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
import { Input } from "antd";

const { Option } = Select;

export default function NewUser() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "admin",
    },
    onSubmit: (values) => {
      console.log("this value", values);

      handleSubmit(values);
    },
  });

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleSubmit = async (values) => {
    setLoading(true);
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
    setLoading(false);
  };

  const handleChangeRole = (e) => {
    console.log(e);
    formik.setFieldValue("role", e);
  };

  return (
    <div className="newUser">
      <ToastContainer autoClose={5000} />
      <h1 className="newUserTitle">Create New Account</h1>
      <form
        onSubmit={formik.handleSubmit}
        action="submit"
        className="newUserForm"
      >
        <div className="newUserItem">
          <label>Name</label>
          <Input
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
          <Input
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
          <Input
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
          <Input
            required
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="newUserItem">
          <label>Role</label>
          <Select
            style={{ width: "100%" }}
            onChange={handleChangeRole}
            value={formik.values.role}
          >
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </div>

        <div className="btnBox">
          <Link to="/users">
            <Button
              style={{
                marginRight: "10px",
                backgroundColor: "gray",
                color: "white",
                height: "56px",
                fontSize: "16px",
              }}
            >
              Cancel
            </Button>
          </Link>
          <Button
            loading={loading}
            htmlType="submit"
            style={{
              marginRight: "10px",
              backgroundColor: "rgb(11, 165, 114)",
              color: "white",
              height: "56px",
              fontSize: "16px",
            }}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
}
