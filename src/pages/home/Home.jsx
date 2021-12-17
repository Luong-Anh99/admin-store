import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";

import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import chartApi from "../../api/chartAPI";
import { Spin } from "antd";

export default function Home() {
  const [chart, setChart] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const res = await chartApi.getAll();
        if (res) {
          console.log("data chart", res?.orderChart);
          setChart(res?.orderChart);
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
      <FeaturedInfo />
      {loading === true ? (
        <div className="spin">
          <Spin size="large" />
        </div>
      ) : (
        <Chart
          data={chart}
          title="Order Analytics"
          grid
          dataKey="orderNumber"
        />
      )}

      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
