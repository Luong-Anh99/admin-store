
import axiosClient from "./axiosClient";

const todoApi = {
  getAll: (params) => {
    const url = '/todos';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/todos/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/todos/${id}`;
    return axiosClient.delete(url);
  },

  add:(user) => {
    const url = `/todos`;
    return axiosClient.post(url,user);
  },
  update:(id, user) => {
    const url = `/todos/${id}`;
    return axiosClient.put(url, user);
  }

}

export default todoApi;