import React, { useEffect, useState } from "react";
import "./user.css";

//api
import userApi from "../../api/userApi";

//router
import { useParams, useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Button, Input, Select } from "antd";
const { Option } = Select;

export default function User() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      role: "",
      phone: "",
      // password: "",
    },
    onSubmit: (values) => {
      console.log("this value", values);

      handleSubmit(values);
    },
  });

  const history = useHistory();

  const id = useParams();

  const idUer = id?.userId;

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await userApi.update(idUer, values);
      if (response) {
        toast.success("Update User success!");

        setTimeout(() => {
          // localStorage.clear();
          history.push("/users");
          // window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.log(error?.response?.data?.data?.errors[0].msg);

      toast.error(
        error?.response?.data?.data?.errors[0].msg &&
          error?.response?.data?.data?.errors
          ? error?.response?.data?.data?.errors[0].msg
          : error.message
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await userApi.get(idUer);
        if (response) {
          let user = response.user;
          formik.setFieldValue("name", user?.name);
          formik.setFieldValue("phone", user?.phone);
          formik.setFieldValue("role", user?.role?.name);
          //formik.setFieldValue("password", user?.password )
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  const handleChangeRole = (e) => {
    console.log(e);
    formik.setFieldValue("role", e);
  };
  return (
    <div className="newUser">
      <h1 className="newUserTitle">Edit Account</h1>
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
          <label>Role</label>
          <Select
            placeholder="Role"
            style={{ width: "100%" }}
            onChange={handleChangeRole}
            value={formik.values.role}
          >
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </div>
        {/* <div className="newUserItem">
          <label>Password</label>
          <input
            required
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="text"
            placeholder="Password"
          />
        </div> */}

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
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
