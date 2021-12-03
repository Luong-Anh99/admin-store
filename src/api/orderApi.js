
import axiosClient from "./axiosClient";

const orderApi = {
  getAll: (params) => {
    const url = '/orders';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/order/${id}`;
    return axiosClient.delete(url);
  },

  add:(user) => {
    const url = `/order`;
    return axiosClient.post(url,user);
  },
  update:(id, user) => {
    const url = `/order/${id}`;
    return axiosClient.put(url, user);
  }

}

export default orderApi;