import React, { useState, useEffect } from "react";
import "./product.scss";
import { useFormik } from "formik";

import productApi from "../../api/productApi.js";

import categoryApi from "../../api/categoryApi";
import colorApi from "../../api/colorApi";
import sizeApi from "../../api/sizeApi";

//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

//firebase
import { storage } from "../../firebase";

import { Link, useParams, useHistory } from "react-router-dom";

import newImage from "../../assets/images/newImage.jpg";

import { ToTopOutlined } from "@ant-design/icons";

export default function Product() {
  const [listCate, setListCate] = useState();

  const [listColor, setListColor] = useState();

  const [listSize, setListSize] = useState();

  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");

  const [editSize, setEditSize] = useState(false);
  const [editColor, setEditColor] = useState(false);
  const [editCate, setEditCate] = useState(false);

  const [listEditSize, setListEditSize] = useState([]);
  const [listEditColor, setListEditColor] = useState([]);
  const [listEditCate, setListEditCate] = useState([]);

  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);

  const [data, setData] = useState();

  const history = useHistory();

  const id = useParams();

  const idProduct = id?.productId;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      sizeArray: [],
      color: [],
      category: [],
      image01: "",
      image02: "",
    },
    onSubmit: (values) => {
      //console.log("this value", values);

      if (listEditSize.length > 0) {
        values.sizeArray = listEditSize;
      }

      if (listEditColor.length > 0) {
        values.color = listEditColor;
      }

      if (listEditCate.length > 0) {
        values.category = listEditCate;
      }

      setTimeout(() => handleSubmit(values), 1000);

      //handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await productApi.update(idProduct, values);
      if (response) {
        toast.success("Cập nhật sản phầm thành công!");

        setTimeout(() => {
          // localStorage.clear();
          history.push("/products");
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
        const category = await categoryApi.getAll();
        const size = await sizeApi.getAll();
        const color = await colorApi.getAll();
        if (category && size && color) {
          setListCate(category.categories);
          setListSize(size.sizes);
          setListColor(color.colors);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await productApi.get(idProduct);
        if (response) {
          // console.log("rep", response?.product)
          let product = JSON.parse(JSON.stringify(response?.product));
          console.log("product", product);
          formik.setFieldValue("title", product?.title);
          formik.setFieldValue("description", product.description);
          formik.setFieldValue("price", product.price);
          formik.setFieldValue("sizeArray", product.sizeArray);
          formik.setFieldValue("color", product.color);
          formik.setFieldValue("category", product.category);
          formik.setFieldValue("image01", product.image01);
          formik.setFieldValue("image02", product.image02);
          setUrl(product.image01);
          setUrl2(product.image02);
          setData(product);

          console.log("color", response);
          //setListSize(product.sizeArray)
          //setListCate(product.category)
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  const _handleCheckBoxChange = (e) => {
    //console.log("formik checbox", formik.values.color)
    let target = e.target.id;
    // let color={_id:target}
    let newArray = [...listEditColor, target];
    if (listEditColor.includes(target)) {
      newArray = newArray.filter((color) => color !== target);
    }

    setListEditColor(newArray);

    // formik.values.color.includes(item)
  };
  const _handleCateChange = (e) => {
    let target = e.target.id;
    // let color={_id:target}
    let newArray = [...listEditCate, target];
    if (listEditCate.includes(target)) {
      newArray = newArray.filter((cate) => cate !== target);
    }

    setListEditCate(newArray);
  };

  const _handleSizeChange = (e, id, type) => {
    const aSize = {
      size: "",
      quantity: "",
    };

    // let newArray = [...formik.values.sizeArray, aSize];
    let newArray = [...listEditSize, aSize];

    if (type === "size") {
      let target = e.target.id;

      aSize.size = target;
      //newArray = [...formik?.values?.sizeArray, aSize];

      newArray = [...listEditSize, aSize];

      //   if (formik?.values?.sizeArray?.some((e) => e?.size === target)) {
      //     newArray = newArray?.filter((size) => size?.size !== e.target.id);
      //   }
      //   formik.setFieldValue("sizeArray", newArray);
      // }

      if (listEditSize?.some((e) => e?.size === target)) {
        newArray = newArray?.filter((size) => size?.size !== e.target.id);
      }
      setListEditSize(newArray);
    }

    if (type === "quantity") {
      let target = e.target.value;
      aSize.quantity = target;

      const x = listEditSize.find((x) => x?.size === id);
      if (x !== undefined) {
        x.quantity = target;
      }

      newArray = [...listEditSize?.filter((x) => x?.size !== id), x];
    }
    setListEditSize(newArray);
  };

  const _handleFun = (e) => {
    //formik.setFieldValue("image01", "ecec");
  };

  const [image, setImage] = useState();

  const handImage = (e) => {
    let imageUp;
    if (e?.target?.files[0]) {
      setImage(e.target.files[0]);
      imageUp = e.target.files[0];
    }

    const uploadTask = storage.ref(`images/${imageUp.name}`).put(imageUp);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(imageUp.name)
          .getDownloadURL()
          .then((url) => {
            formik.setFieldValue("image01", url);
            setUrl(url);
          });
      }
    );
  };

  const handImage2 = (e) => {
    let imageUp;
    if (e?.target?.files[0]) {
      setImage(e.target.files[0]);
      imageUp = e.target.files[0];
    }

    const uploadTask = storage.ref(`images/${imageUp.name}`).put(imageUp);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress2 = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress2(progress2);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(imageUp.name)
          .getDownloadURL()
          .then((url) => {
            formik.setFieldValue("image02", url);
            setUrl2(url);
          });
      }
    );
  };

  const _handleCancel = () => {
    setEditSize(false);
    setListEditSize([]);
    // formik.setFieldValue("sizeArray", product?.sizeArray);
  };

  const _handleCancelColor = () => {
    setEditColor(false);
    setListEditColor([]);
    // formik.setFieldValue("sizeArray", product?.sizeArray);
  };

  const _handleCancelCate = () => {
    setEditCate(false);
    setListEditCate([]);
    // formik.setFieldValue("sizeArray", product?.sizeArray);
  };

  return (
    <div className="new">
      <ToastContainer autoClose={5000} />
      <h1 className="new__title">Edit Product</h1>
      <form
        onSubmit={formik.handleSubmit}
        action="submit"
        className="new__form"
      >
        <div className="new__form__item">
          <div className="new__form__item__detail">
            <label className="new__form__item__detail__title">Name</label>
            <input
              className="new__form__item__detail__input"
              id="title"
              name="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              type="text"
              required
              placeholder="Name product"
            />
          </div>

          <div className="new__form__item__detail">
            <label className="new__form__item__detail__title">
              Description
            </label>
            <textarea
              className="new__form__item__detail__description"
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              type="text"
              placeholder="Description"
              required
            />
          </div>

          <div className="new__form__item__detail">
            <label className="new__form__item__detail__title">Price</label>
            <input
              className="new__form__item__detail__input"
              id="price"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
              type="text"
              placeholder="Price product"
              required
            />
          </div>
        </div>

        <div></div>

        <div className="new__form__design">
          <div className="new__form__design__detail">
            <label className="new__form__design__detail__title">Size </label>

            {!editSize &&
              formik?.values?.sizeArray?.map((item, index) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label htmlFor="">- Size {item?.size?.sizeNumber}: </label>{" "}
                  <span>{item?.quantity}</span>
                </div>
              ))}

            {editSize &&
              listSize?.map((item, index) => (
                // <option key={index} value={item._id}>
                //   {item.sizeNumber}
                // </option>
                <div style={{ marginBottom: "10px" }} key={index}>
                  <input
                    onChange={(e) => _handleSizeChange(e, item._id, "size")}
                    //  onChange={(e) => setSize(e.target.value)}
                    value={item._id}
                    // ={formik.values.sizeArray.length <= 0 ? true : false}
                    type="checkbox"
                    id={item._id}
                    name={item._id}
                  />
                  <label style={{ marginRight: "10px" }} for={item._id}>
                    {item.sizeNumber}
                    <input
                      style={{ marginLeft: "20px" }}
                      onChange={(e) =>
                        _handleSizeChange(e, item._id, "quantity")
                      }
                      //onChange={(e) => setSize([...size,{quantity:e.target.id}])}

                      // {
                      //   formik.values.sizeArray.length <= 0 ? true : false
                      // }
                      id={item._id}
                      value={
                        listEditSize?.find((x) => x?.size === item?._id)
                          ?.quantity || ""
                      }
                      type="text"
                      placeholder="Quantity"
                    />
                  </label>
                </div>
              ))}

            <div style={{ marginTop: "10px" }}>
              <span
                onClick={() => setEditSize(true)}
                style={{
                  cursor: "pointer",
                  border: "1px solid gray",
                  padding: "5px",
                  height: "",
                  marginRight: "5px",
                }}
              >
                Edit
              </span>
              <span
                onClick={_handleCancel}
                style={{
                  cursor: "pointer",
                  border: "1px solid gray",
                  padding: "5px",
                  height: "",
                  marginRight: "5px",
                }}
              >
                Cancel
              </span>
            </div>
          </div>

          <div className="new__form__design__detail">
            <label className="new__form__design__detail__title">Color</label>

            {!editColor &&
              formik?.values?.color?.map((item, index) => (
                <div>
                  <label
                    style={{
                      color: `${
                        item?.colorValue?.toLowerCase() === "white"
                          ? "yellow"
                          : item?.colorValue?.toLowerCase()
                      }`,
                    }}
                    for={item?._id}
                  >
                    - {item?.colorValue}
                  </label>
                </div>
              ))}

            {editColor &&
              listColor?.map((item, index) => (
                <div key={index}>
                  <input
                    style={{ marginRight: "10px" }}
                    onChange={_handleCheckBoxChange}
                    value={item._id}
                    type="checkbox"
                    id={item._id}
                    name={item._id}
                  />
                  <label
                    style={{
                      color: `${
                        item.colorValue.toLowerCase() === "white"
                          ? "white"
                          : item.colorValue.toLowerCase()
                      }`,
                    }}
                    for={item._id}
                  >
                    {item.colorValue}
                  </label>
                </div>
              ))}

            <div style={{ marginTop: "10px" }}>
              <span
                onClick={() => setEditColor(true)}
                style={{
                  cursor: "pointer",
                  border: "1px solid gray",
                  padding: "5px",
                  height: "",
                  marginRight: "5px",
                }}
              >
                Edit
              </span>
              <span
                onClick={_handleCancelColor}
                style={{
                  cursor: "pointer",
                  border: "1px solid gray",
                  padding: "5px",
                  height: "",
                  marginRight: "5px",
                }}
              >
                Cancel
              </span>
            </div>
          </div>

          <div className="new__form__design__detail">
            <label className="new__form__design__detail__title">Category</label>

            {!editCate &&
              formik?.values?.category?.map((item, index) => (
                <div>
                  <label for={item._id}> - {item.name}</label>
                </div>
              ))}

            {editCate &&
              listCate?.map((item, index) => (
                // <option key={index} value={item._id}>
                //   {item.name}
                // </option>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ marginRight: "10px" }}
                    onChange={_handleCateChange}
                    value={item._id}
                    type="checkbox"
                    id={item._id}
                    name={item._id}
                  />
                  <label for={item._id}>{item.name}</label>
                  <br />
                </div>
              ))}

            <div style={{ marginTop: "10px" }}>
              <span
                onClick={() => setEditCate(true)}
                style={{
                  cursor: "pointer",
                  border: "1px solid gray",
                  padding: "5px",
                  height: "",
                  marginRight: "5px",
                }}
              >
                Edit
              </span>
              <span
                onClick={_handleCancelCate}
                style={{
                  cursor: "pointer",
                  border: "1px solid gray",
                  padding: "5px",
                  height: "",
                  marginRight: "5px",
                }}
              >
                Cancel
              </span>
            </div>
          </div>
        </div>

        <div className="new__form__image">
          <div className="new__form__image__item">
            <label htmlFor="image01" className="new__form__image__title">
              {" "}
              <div>
                {" "}
                <ToTopOutlined
                  className="new__form__image__title__icon"
                  style={{ fontSize: "70px" }}
                />
              </div>
              Image 1
            </label>
            <input
              style={{ display: "none" }}
              id="image01"
              type="file"
              onChange={handImage}
            ></input>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                style={{ width: "200px", height: "200px" }}
                src={url ? url : newImage}
                alt=""
              />
              <progress style={{ width: "100%" }} value={progress} max="100" />
            </div>
          </div>

          <div className="new__form__image__item">
            <label htmlFor="image02" className="new__form__image__title">
              <div>
                {" "}
                <ToTopOutlined
                  className="new__form__image__title__icon"
                  style={{ fontSize: "70px" }}
                />
              </div>
              Image 2:
            </label>
            <input
              style={{ display: "none" }}
              id="image02"
              type="file"
              onChange={handImage2}
            ></input>
            {/* <button style={{width:"80px", height:"30px"}} onClick={_handleUpload}> upload</button> */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <img
                style={{ width: "200px" }}
                src={url2 ? url2 : newImage}
                alt=""
              />
              <progress style={{ width: "100%" }} value={progress2} max="100" />
            </div>
          </div>
        </div>

        <div className="new__form__btnBox">
          <Link to="/products">
            <button className="new__form__btnBox__btnCancel">Cancel</button>
          </Link>
          <button
            style={{}}
            onClick={() => _handleFun()}
            type="submit"
            className="new__form__btnBox__btnCreate"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
