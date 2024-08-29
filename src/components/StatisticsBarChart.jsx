import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";

const StatisticsBarChart = ({ stats }) => {
  const [dataP, setData] = useState([]);

  useEffect(() => {
    const temp = Object.keys(stats).map(domain => ({
      name: domain,
      count: stats[domain],
      fill: (domain === "AI/ML" || domain === "Web Dev" || domain === "App Dev") ? "#82ca9d" : "#8884d8" // Custom colors
    }));
    console.log(temp);
    setData(temp);
  }, [stats]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={dataP}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count">
          <LabelList dataKey="name" position="top" /> {/* Add labels below each bar */}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsBarChart;
