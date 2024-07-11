import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const PieChart = ({ month }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchPieChartData = async () => {
      const response = await axios.get(`/api/pie-chart`, { params: { month } });
      setPieChartData(response.data);
    };
    fetchPieChartData();
  }, [month]);

  const data = {
    labels: pieChartData.map((data) => data._id),
    datasets: [
      {
        label: "Number of Items",
        data: pieChartData.map((data) => data.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
