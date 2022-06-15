import axiosClient from "./axiosClient";

const brandsApi = {
  getAll: (params) => {
    const url = "/admin/brands";
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

export default brandsApi;
