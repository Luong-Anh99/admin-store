
import axiosClient from "./axiosClient";

const categoryApi = {
  getAll: (params) => {
    const url = '/categories';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/category/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/category/${id}`;
    return axiosClient.delete(url);
  },

  add:(user) => {
    const url = `/category`;
    return axiosClient.post(url,user);
  },
  update:(id, user) => {
    const url = `/category/${id}`;
    return axiosClient.put(url, user);
  }

}

export default categoryApi;