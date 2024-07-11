import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchBarChartData = async () => {
      const response = await axios.get(`/api/bar-chart`, { params: { month } });
      setBarChartData(response.data);
    };
    fetchBarChartData();
  }, [month]);

  const data = {
    labels: barChartData.map((data) => data._id),
    datasets: [
      {
        label: "Number of Items",
        data: barChartData.map((data) => data.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
