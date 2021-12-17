import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./chart.css";

export default function Chart({ title, data, dataKey, grid }) {
  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <BarChart margin={{ left: 20 }} data={data}>
          {/* <XAxis dataKey="month" stroke="#5550bd"/>
                    <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
                    <Tooltip/>
                    {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />} */}
          <Bar dataKey={dataKey} fill="#8884d8" />
          <XAxis dataKey="month" stroke="#5550bd" />
          <YAxis dataKey={dataKey} />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
