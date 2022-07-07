import React from "react";
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
import "./chart.css";

const data2 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <>
      <div className="chart">
        <h3 className="chartTitle">{title}</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1} height="100%">
          <BarChart margin={{ left: 20 }} data={data?.orderChart}>
            <Bar dataKey={dataKey} fill="#8884d8" />
            <XAxis dataKey="month" stroke="#5550bd" />
            <YAxis dataKey={dataKey} />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart">
        <h3 className="chartTitle">Revenue Analytics</h3>
        <ResponsiveContainer width="100%" aspect={4 / 1} height="100%">
          <LineChart
            width={500}
            height={300}
            data={data?.revenueChart}
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

          {/* <LineChart width={300} height={100} data={data?.revenueChart}>
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart> */}
        </ResponsiveContainer>
      </div>
    </>
  );
}
