import axiosClient from "./axiosClient";

const chartApi = {
  getAll: (params) => {
    const url = "/admin/dashboard";
    return axiosClient.get(url, { params });
  },

  getOrderChart(data) {
    const url = `/admin/order-chart?year=${data}`;
    return axiosClient.get(url);
  },

  getRevenueChart(data) {
    const url = `/admin/revenue-chart?year=${data}`;
    return axiosClient.get(url);
  },
};

export default chartApi;
