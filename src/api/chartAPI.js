
import axiosClient from "./axiosClient";

const chartApi = {
  getAll: (params) => {
    const url = '/admin/chart';
    return axiosClient.get(url, { params });
  },

}

export default chartApi;