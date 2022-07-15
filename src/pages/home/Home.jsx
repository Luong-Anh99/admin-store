import React, { useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";

import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import chartApi from "../../api/chartAPI";
import { Select, Spin } from "antd";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import "../../components/chart/chart.css";

const { Option } = Select;

export default function Home() {
  const [loading, setLoading] = useState(true);

  const [info, setInfo] = useState();

  const [orderYear, setOrderYear] = useState("2022");

  const [revenueYear, setRevenueYear] = useState("2022");

  const [dataChart, setDataChart] = useState({
    orderChart: [],
    revenueChart: [],
  });

  useEffect(() => {
    const fetchTotoList = async () => {
      try {
        const res = await chartApi.getAll();
        if (res) {
          setInfo(res);

          setDataChart((state) => ({
            orderChart: res?.orderChart,
            revenueChart: res?.revenueChart,
          }));

          setLoading(false);
        }
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchTotoList();
  }, []);

  const _handleChangeYearOrder = async (type, year) => {
    console.log(year);
    if (type === "orderChart") {
      try {
        const res = await chartApi.getOrderChart(year);

        setDataChart((state) => ({ ...state, orderChart: res?.orderChart }));

        setOrderYear(year);
      } catch (e) {
        console.log(e);
      }
    }

    if (type === "revenueChart") {
      try {
        const res = await chartApi.getRevenueChart(year);

        setDataChart((state) => ({
          ...state,
          revenueChart: res?.revenueChart,
        }));

        setRevenueYear(year);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="home">
      <FeaturedInfo info={info} />
      {loading === true ? (
        <div className="spin">
          <Spin size="large" />
        </div>
      ) : (
        // <Chart  data={info} title="Order Analytics" grid dataKey="orderNumber" />

        <>
          <div className="chart">
            <div style={{ display: "flex" }}>
              <h3 className="chartTitle" style={{ marginRight: "15px" }}>
                Order Analytics
              </h3>
              <Select
                defaultValue="2022"
                style={{ width: 120 }}
                onChange={(e) => _handleChangeYearOrder("orderChart", e)}
              >
                <Option value="2022">2022</Option>
                <Option value="2021">2021</Option>
                <Option value="2020">2020</Option>
                <Option value="2019">2019</Option>
                <Option value="2018">2018</Option>
              </Select>
            </div>
            <p
              style={{
                textAlign: "center",
                color: "gray",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Order Analytics of {orderYear}
            </p>
            <ResponsiveContainer width="100%" aspect={4 / 1} height="100%">
              <BarChart margin={{ left: 20 }} data={dataChart?.orderChart}>
                <Bar dataKey={"orderNumber"} fill="#8884d8" />
                <XAxis dataKey="month" stroke="#5550bd" />
                <YAxis dataKey={"orderNumber"} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart">
            <div style={{ display: "flex" }}>
              <h3 className="chartTitle" style={{ marginRight: "15px" }}>
                Revenue Analytics
              </h3>
              <Select
                defaultValue="2022"
                style={{ width: 120 }}
                onChange={(e) => _handleChangeYearOrder("revenueChart", e)}
              >
                <Option value="2022">2022</Option>
                <Option value="2021">2021</Option>
                <Option value="2020">2020</Option>
                <Option value="2019">2019</Option>
                <Option value="2018">2018</Option>
              </Select>
            </div>

            <p
              style={{
                textAlign: "center",
                color: "gray",
                fontWeight: 600,
                fontSize: "18px",
              }}
            >
              Order Analytics of {revenueYear}
            </p>
            <ResponsiveContainer width="100%" aspect={4 / 1} height="100%">
              <LineChart
                width={500}
                height={300}
                data={dataChart?.revenueChart}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey={"revenue"} stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      <div className="homeWidgets">
        <WidgetSm info={info} />
        <WidgetLg info={info} />
      </div>
    </div>
  );
}
