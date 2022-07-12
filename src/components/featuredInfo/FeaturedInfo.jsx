import React, { useEffect, useState } from "react";
import "./featuredInfo.css";
import chartApi from "../../api/chartAPI";
import { Spin } from "antd";

export default function FeaturedInfo(props) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotoList = () => {
      try {
        console.log(props?.info)
        if (props?.info) {
          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, [props]);

  console.log("props info", props)

  return (
    <div className="featured">
      <div className="featuredItem itemOrder">
        <span className="featuredTitle">Total order up to present</span>
        <div className="featuredMoneyContainer">
          {loading === true ? (
            <div className="spinNumber">
              <Spin size="large" />
            </div>
          ) : (
            <span className="featuredMoney">{props?.info?.numOfOrders}</span>
          )}
        </div>
        <span className="featuredSub">Order</span>
      </div>
      <div className="featuredItem itemProduct">
        <span className="featuredTitle">
           Total product up to present{" "}
        </span>
        <div className="featuredMoneyContainer">
          {loading === true ? (
            <div className="spinNumber">
              <Spin size="large" />
            </div>
          ) : (
            <span className="featuredMoney">{props?.info?.numofProducts}</span>
          )}

          {/* <span className="featuredMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative"/>
          </span> */}
        </div>
        <span className="featuredSub">Product</span>
      </div>
      <div className="featuredItem itemUser">
        <span className="featuredTitle">
           Total user up to present{" "}
        </span>
        <div className="featuredMoneyContainer">
          {loading === true ? (
            <div className="spinNumber">
              <Spin size="large" />
            </div>
          ) : (
            <span className="featuredMoney">{props?.info?.numOfUsers}</span>
          )}

          <span className="featuredMoneyRate"></span>
        </div>
        <span className="featuredSub">Admin</span>
      </div>
    </div>
  );
}
