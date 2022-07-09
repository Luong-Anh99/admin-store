import { useFormik } from "formik";
import { useEffect, useState } from "react";
import "./product.scss";

import productApi from "../../api/productApi.js";

import categoryApi from "../../api/categoryApi";
import colorApi from "../../api/colorApi";
import sizeApi from "../../api/sizeApi";

//notification
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//firebase
import { storage } from "../../firebase";

import { Link, useHistory, useParams } from "react-router-dom";

import newImage from "../../assets/images/newImage.jpg";

import { ToTopOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Input, Radio, Row, Select, Space } from "antd";
import brandsApi from "../../api/brandApi";
const { Option } = Select;

export default function Product() {
  const [listCate, setListCate] = useState();

  const [listColor, setListColor] = useState();

  const [listSize, setListSize] = useState();

  const [listBrand, setListBrand] = useState([]);

  const [url, setUrl] = useState("");
  const [url2, setUrl2] = useState("");

  const [editSize, setEditSize] = useState(false);

  const [listEditSize, setListEditSize] = useState([]);
  const [listEditColor, setListEditColor] = useState([]);
  const [listEditCate, setListEditCate] = useState([]);

  const [progress, setProgress] = useState(0);
  const [progress2, setProgress2] = useState(0);

  const [data, setData] = useState();

  const [loading, setLoading] = useState(false);

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
      category: "",
      image01: "",
      image02: "",
      brand: "",
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

      setTimeout(() => handleSubmit(values), 500);

      //handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await productApi.update(idProduct, values);
      if (response) {
        toast.success("Success!");

        setTimeout(() => {
          // localStorage.clear();
          history.push("/products");
          // window.location.reload();
        }, 1000);
      }
    } catch (error) {
      toast.error("Add fail because " + error.message, { autoClose: false });
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const category = await categoryApi.getAll();
        const size = await sizeApi.getAll();
        const color = await colorApi.getAll();
        const brand = await brandsApi.getAll();

        setListBrand(brand.brands);
        if (category && size && color) {
          setListCate(category.categories);
          setListSize(size.sizes);
          setListColor(color.colors);
        }

        const response = await productApi.get(idProduct);
        if (response) {
          // console.log("rep", response?.product)
          let product = JSON.parse(JSON.stringify(response?.product));
          console.log("product", product);
          formik.setFieldValue("title", product?.title);
          formik.setFieldValue("description", product.description);
          formik.setFieldValue("price", product.price);
          formik.setFieldValue(
            "sizeArray",
            product.sizeArray?.map((item) => ({
              quantity: item.quantity,
              size: item.size._id,
            }))
          );
          formik.setFieldValue(
            "color",
            product.color?.map((item) => item._id)
          );
          formik.setFieldValue("category", product.category._id);
          formik.setFieldValue("image01", product.image01);
          formik.setFieldValue("image02", product.image02);
          formik.setFieldValue("brand", product.brand);

          setUrl(product.image01);
          setUrl2(product.image02);
          setData(product);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  useEffect(() => {}, []);

  console.log(formik.values);

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
    // console.log(e);

    // let target = e.target.id;
    // // let color={_id:target}
    // let newArray = [...listEditCate, target];
    // if (listEditCate.includes(target)) {
    //   newArray = newArray.filter((cate) => cate !== target);
    // }

    // setListEditCate(newArray);

    formik.setFieldValue("category", e.target.value);
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

  const handleChangeSizeArr = (values) => {
    const listSizeArr = formik.values.sizeArray;
    const temp = values.map((item) => ({
      size: item,
      quantity: listSizeArr.find((temp) => temp.size === item)
        ? listSizeArr.find((temp) => temp.size === item).quantity
        : 0,
    }));

    formik.setFieldValue("sizeArray", temp);
  };

  const handleChangeInputNumberSize = (e, item) => {
    let itemChange = formik.values.sizeArray.find(
      (value) => value.size === item._id
    );

    itemChange = { ...itemChange, quantity: e.target.value };

    let finalArr = formik.values.sizeArray.filter(
      (value) => value.size !== item._id
    );
    finalArr.push(itemChange);

    formik.setFieldValue("sizeArray", finalArr);
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
            <Input
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
            <label className="new__form__item__detail__title">Brand</label>
            <Select
              style={{ width: "100%" }}
              onChange={(e) => formik.setFieldValue("brand", e)}
              value={listBrand.length > 0 ? formik.values.brand : ""}
            >
              {listBrand.map((item) => (
                <Option value={item._id}>{item.name}</Option>
              ))}
            </Select>
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
            <Input
              className="new__form__item__detail__input"
              id="price"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
              type="number"
              placeholder="Price product"
              required
            />
          </div>
        </div>

        <div></div>

        <div className="new__form__design">
          <div className="new__form__design__detail">
            <label className="new__form__design__detail__title">Size </label>

            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={(e) => handleChangeSizeArr(e)}
              // // options={listColor?.map((item) => item._id)}
              value={formik.values.sizeArray.map((item) => item.size)}
            >
              {listSize?.map((item, index) => (
                <Row key={index} style={{ marginBottom: "10px" }}>
                  <Col
                    span={12}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Checkbox value={item._id}>{item.sizeNumber}</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Input
                      type={"number"}
                      min={0}
                      disabled={
                        !formik.values.sizeArray.find(
                          (tempId) => tempId.size === item._id
                        )
                      }
                      placeholder="Quantity"
                      onChange={(e) => handleChangeInputNumberSize(e, item)}
                      value={
                        formik.values.sizeArray.find(
                          (temp) => temp.size === item._id
                        )
                          ? formik.values.sizeArray.find(
                              (temp) => temp.size === item._id
                            ).quantity
                          : "0"
                      }
                    ></Input>
                  </Col>
                </Row>
              ))}
            </Checkbox.Group>

            {/* {!editSize &&
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
            </div> */}
          </div>

          <div className="new__form__design__detail">
            <label className="new__form__design__detail__title">Color</label>

            <Checkbox.Group
              style={{
                width: "100%",
              }}
              onChange={(e) => formik.setFieldValue("color", e)}
              // options={listColor?.map((item) => item._id)}
              value={formik.values.color}
            >
              <Row>
                {listColor?.map((item) => (
                  <Col key={item._id} span={12}>
                    <Checkbox value={item._id}>{item.colorValue}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>

            {/* {!editColor &&
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
            </div> */}
          </div>

          <div className="new__form__design__detail">
            <label className="new__form__design__detail__title">Category</label>

            <Radio.Group
              onChange={(e) => _handleCateChange(e)}
              value={formik.values.category}
            >
              <Space direction="vertical">
                {listCate?.map((item, index) => (
                  <Radio key={index} value={item._id}>
                    {item.name}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>

            {/* {!editCate &&
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
              ))} */}

            {/* <div style={{ marginTop: "10px" }}>
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
            </div> */}
          </div>
        </div>

        <div className="new__form__image">
          <div className="new__form__image__item">
            <label htmlFor="image01" className="new__form__image__title">
              <div>
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
            <Button className="new__form__btnBox__btnCancel">Cancel</Button>
          </Link>
          <Button
            style={{}}
            onClick={() => _handleFun()}
            htmlType="submit"
            className="new__form__btnBox__btnCreate"
            loading={loading}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
