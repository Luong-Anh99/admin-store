import React, { useEffect, useState } from "react";
import chartApi from "../../api/chartAPI";
import "./widgetLg.css";
import { Table } from "antd";
import numberWithCommas from "../../utils/numberWithCommas";
import { Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function WidgetLg(props) {
  const [loading, setLoading] = useState(true);

  const _statusButton = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  useEffect(() => {
    const fetchTotoList = () => {
      try {
        if (props?.info) {
          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, [props]);

  const columns = [
    {
      title: "Customer",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },

    {
      title: "Money",
      dataIndex: "totalMoney",
      key: "totalMoney",
      render: (text) => <div>{numberWithCommas(text)} $</div>,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (params) => (
        <_statusButton type={params}>{params} $</_statusButton>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (params) => (
        <Link to={"/order/" + params._id}>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
          </button>
        </Link>
      ),
    },
  ];

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Order recent</h3>
      <div className="dataOrderRecent">
        <Table
          loading={loading}
          columns={columns}
          dataSource={props?.info?.mostRecent10Orders}
        />
      </div>
    </div>
  );
}
