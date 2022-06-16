import axiosClient from "./axiosClient";

const vouchersApi = {
  getAll: (params) => {
    const url = "/admin/promotions";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/admin/brand/${id}`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    const url = `/admin/size/${id}`;
    return axiosClient.delete(url);
  },

  add: (brand) => {
    const url = `/admin/brand`;
    return axiosClient.post(url, brand);
  },
  update: (id, user) => {
    const url = `/admin/brand/${id}`;
    return axiosClient.put(url, user);
  },
};

export default vouchersApi;
