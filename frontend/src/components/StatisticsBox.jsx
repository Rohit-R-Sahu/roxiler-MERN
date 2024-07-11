import React, { useState, useEffect } from "react";
import axios from "axios";

const StatisticsBox = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await axios.get(`/api/statistics`, {
        params: { month },
      });
      setStatistics(response.data);
    };
    fetchStatistics();
  }, [month]);

  return (
    <div>
      <div>Total Sale Amount: {statistics.totalAmount}</div>
      <div>Total Sold Items: {statistics.totalSold}</div>
      <div>Total Not Sold Items: {statistics.totalNotSold}</div>
    </div>
  );
};

export default StatisticsBox;
