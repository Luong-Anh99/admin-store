
import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = '/admin/products';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/admin/product/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/admin/product/${id}`;
    return axiosClient.delete(url);
  },

  add:(product) => {
    const url = `/admin/product`;
    return axiosClient.post(url,product);
  },
  update:(id, user) => {
    const url = `/admin/product/${id}`;
    return axiosClient.put(url, user);
  }

}

export default productApi;