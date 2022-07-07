import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";

import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import chartApi from "../../api/chartAPI";
import { Spin } from "antd";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const res = await chartApi.getAll();
        if (res) {
          setInfo(res);
          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  return (
    <div className="home">
      <FeaturedInfo info={info} />
      {loading === true ? (
        <div className="spin">
          <Spin size="large" />
        </div>
      ) : (
        <Chart data={info} title="Order Analytics" grid dataKey="orderNumber" />
      )}

      <div className="homeWidgets">
        <WidgetSm info={info} />
        <WidgetLg info={info} />
      </div>
    </div>
  );
}
