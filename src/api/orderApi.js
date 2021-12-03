
import axiosClient from "./axiosClient";

const orderApi = {
  getAll: (params) => {
    const url = '/admin/orders';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/admin/order/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/admin/order/${id}`;
    return axiosClient.delete(url);
  },

  add:(user) => {
    const url = `/order`;
    return axiosClient.post(url,user);
  },
  update:(id, user) => {
    const url = `/admin/order/${id}`;
    return axiosClient.put(url, user);
  }

}

export default orderApi;