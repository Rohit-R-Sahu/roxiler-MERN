import axios from "axios";

export const fetchTransactions = (month, search, page, perPage) => {
  return axios.get(`/api/transactions`, {
    params: { month, search, page, perPage },
  });
};

export const fetchStatistics = (month) => {
  return axios.get(`/api/statistics`, { params: { month } });
};

export const fetchBarChartData = (month) => {
  return axios.get(`/api/bar-chart`, { params: { month } });
};

export const fetchPieChartData = (month) => {
  return axios.get(`/api/pie-chart`, { params: { month } });
};
