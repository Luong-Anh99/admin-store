
import axiosClient from "./axiosClient";

const colorApi = {
  getAll: (params) => {
    const url = '/colors';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/color/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/color/${id}`;
    return axiosClient.delete(url);
  },

  add:(user) => {
    const url = `/color`;
    return axiosClient.post(url,user);
  },
  update:(id, user) => {
    const url = `/color/${id}`;
    return axiosClient.put(url, user);
  }

}

export default colorApi;