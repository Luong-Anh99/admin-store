
import axiosClient from "./axiosClient";

const userApi = {
  getAll: (params) => {
    const url = '/users';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/user/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/user/${id}`;
    return axiosClient.delete(url);
  },

  add:(user) => {
    const url = `/user`;
    return axiosClient.post(url,user);
  },
  update:(id, user) => {
    const url = `/user/${id}`;
    return axiosClient.put(url, user);
  }

}

export default userApi;