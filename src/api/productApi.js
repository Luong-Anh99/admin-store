
import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = '/products';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/product/${id}`;
    return axiosClient.delete(url);
  },

  add:(product) => {
    const url = `/product`;
    return axiosClient.post(url,product);
  },
  update:(id, user) => {
    const url = `/product/${id}`;
    return axiosClient.put(url, user);
  }

}

export default productApi;