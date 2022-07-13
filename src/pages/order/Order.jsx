import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useParams, useHistory } from "react-router-dom";

import "./order.scss";
import { useSelector } from "react-redux";
import orderApi from "../../api/orderApi";
//notification
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import numberWithCommas from "../../utils/numberWithCommas";
import moment from "moment";
import { Button } from "antd";

export default function Product() {
  const [order, setOrder] = useState();

  const [status, setStatus] = useState();

  const [click, setClick] = useState();

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const id = useParams();

  const idOder = id.orderId;

  // const order = listOrders.find((x) => x._id === idOder);

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const response = await orderApi.get(idOder);
        if (response) {
          setOrder(response.order);
          setClick(response?.order?.status);
          setStatus(response.order);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  const _handleChangeStatus = (value) => {
    setClick(value);
    setStatus({ ...order, status: value });
  };

  const _handleConfirm = async (id) => {
    setLoading(true);
    try {
      console.log();

      const response = await orderApi.update(id, status);
      if (response) {
        toast.success("Success!");
        setLoading(false);

        setTimeout(() => {
          // window.location.reload();
          history.push("/orders");
        }, 500);
      }
    } catch (error) {
      toast.error("Can't not update status like that!!! ", error);
    }
    setLoading(false);
  };

  return (
    <div className="order">
      <p className="order__header">Thông tin đơn hàng</p>

      <div className="order__form">
        <div className="order__form__detail">
          <p className="order__form__detail__title">Thông tin giao hàng</p>
          <label className="order__form__detail__label" htmlFor="">
            Name
          </label>
          <p className="order__form__detail__info">{order?.user?.name}</p>
          <label className="order__form__detail__label" htmlFor="">
            Phone
          </label>
          <p className="order__form__detail__info">{order?.user?.phone}</p>
          <label className="order__form__detail__label" htmlFor="">
            Email
          </label>
          <p className="order__form__detail__info">{order?.user?.email}</p>
          <label className="order__form__detail__label" htmlFor="">
            Address
          </label>
          <p className="order__form__detail__info">
            {order?.user?.address?.specificAddress +
              " " +
              order?.user?.address?.subDistrict +
              " " +
              order?.user?.address?.district +
              " " +
              order?.user?.address?.province}
          </p>

          <label className="order__form__detail__label" htmlFor="">
            Day Order
          </label>
          <p className="order__form__detail__info">
            {moment(order?.createdAt).format("DD/MM/yyyy")}
          </p>

          {order?.user?.promotionCode && (
            <>
              <label className="order__form__detail__label" htmlFor="">
                Voucher code
              </label>
              <p className="order__form__detail__info">
                {order?.user?.promotionCode}
              </p>
            </>
          )}

          <label className="order__form__detail__label" htmlFor="">
            Sale money
          </label>
          <p className="order__form__detail__info">
            {numberWithCommas(
              order?.user?.saleMoney ? order?.user?.saleMoney : "0"
            )}
          </p>

          <label className="order__form__detail__label" htmlFor="">
            Delivery Money
          </label>
          <p className="order__form__detail__info">
            {numberWithCommas(order?.deliveryMoney)} $
          </p>
          <label className="order__form__detail__label" htmlFor="">
            Order Money
          </label>
          <p className="order__form__detail__info">
            {numberWithCommas(order?.orderMoney)} $
          </p>
          <label htmlFor="" className="order__form__detail__label">
            Total Money
          </label>
          <p className="order__form__detail__total-money">
            {numberWithCommas(order?.totalMoney)} $
          </p>
        </div>
        <div className="order__form__product">
          <p className="order__form__product__title">Danh sách sản phẩm</p>
          {order?.items?.map((item, index) => (
            <div className="order__form__product__item">
              <img
                style={{ width: "150px" }}
                src={item?.product?.image01}
                alt=""
              />
              <div className="order__form__product__item__name">
                {item?.product?.title} -{" "}
              </div>
              <div className="order__form__product__item__size">
                Size: {item?.size}
              </div>
              <div className="order__form__product__item__quantity">
                - Quantity: {item?.quantity}
              </div>
              <div className="order__form__product__item__price">
                - Price: {item?.product?.price}
              </div>
            </div>
          ))}

          <div className="status">
            <p className="status__title">Trạng thái đơn hàng hiện tại: </p>
            <div className="status__box">
              <div
                onClick={() => _handleChangeStatus("pending")}
                className={`status__box__item ${
                  click === "pending" ? "active" : ""
                }`}
              >
                Pending
              </div>
              <div
                onClick={() => _handleChangeStatus("shipping")}
                className={`status__box__item ${
                  click === "shipping" ? "active" : ""
                }`}
              >
                Shipping
              </div>
              <div
                onClick={() => _handleChangeStatus("succeeded")}
                className={`status__box__item ${
                  click === "succeeded" ? "active" : ""
                }`}
              >
                Succeeded
              </div>
              <div
                onClick={() => _handleChangeStatus("failed")}
                className={`status__box__item ${
                  click === "failed" ? "active" : ""
                }`}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <Link to="/orders">
          <button className="button-container__cancel">Cancel</button>
        </Link>
        <Button
          loading={loading}
          onClick={() => _handleConfirm(order?._id)}
          className="button-container__confirm"
          style={{ backgroundColor: "orange" }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}
