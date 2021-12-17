import React, { useEffect, useState } from "react";
import "./featuredInfo.css";
import chartApi from "../../api/chartAPI";
import { Spin } from "antd";

export default function FeaturedInfo() {
  const [totalOrder, setTotalOrder] = useState();
  const [totalProduct, setTotalProduct] = useState();
  const [totalUser, setTotalUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const res = await chartApi.getAll();
        if (res) {
          setTotalOrder(res?.numOfOrders);
          setTotalProduct(res?.numofProducts);
          setTotalUser(res?.numOfUsers);
          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem itemOrder">
        <span className="featuredTitle">Invoice total order up to present</span>
        <div className="featuredMoneyContainer">
          {loading === true ? (
            <div className="spinNumber">
              <Spin size="large" />
            </div>
          ) : (
            <span className="featuredMoney">{totalOrder}</span>
          )}
        </div>
        <span className="featuredSub">Order</span>
      </div>
      <div className="featuredItem itemProduct">
        <span className="featuredTitle">
          Invoice total product up to present{" "}
        </span>
        <div className="featuredMoneyContainer">
          {loading === true ? (
            <div className="spinNumber">
              <Spin size="large" />
            </div>
          ) : (
            <span className="featuredMoney">{totalProduct}</span>
          )}

          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative"/>
          </span> */}
        </div>
        <span className="featuredSub">Product</span>
      </div>
      <div className="featuredItem itemUser">
        <span className="featuredTitle">
          Invoice total employee up to present{" "}
        </span>
        <div className="featuredMoneyContainer">
          {loading === true ? (
            <div className="spinNumber">
              <Spin size="large" />
            </div>
          ) : (
            <span className="featuredMoney">{totalUser}</span>
          )}

          <span className="featuredMoneyRate"></span>
        </div>
        <span className="featuredSub">Employee</span>
      </div>
    </div>
  );
}
