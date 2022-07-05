import axiosClient from "./axiosClient";

const vouchersApi = {
  getAll: (params) => {
    const url = "/admin/promotions";
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/admin/promotion/${id}`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    const url = `/admin/promotion/${id}`;
    return axiosClient.delete(url);
  },

  add: (voucher) => {
    const url = `/admin/promotion`;
    return axiosClient.post(url, voucher);
  },
  update: (id, user) => {
    const url = `/admin/promotion/${id}`;
    return axiosClient.put(url, user);
  },
};

export default vouchersApi;
