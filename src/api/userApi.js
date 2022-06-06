import axiosClient from "./axiosClient";

const userApi = {
  getAll: (params) => {
    const url = "/admin/users";
    return axiosClient.get(url);
  },

  get: (id) => {
    const url = `/admin/user/${id}`;
    return axiosClient.get(url);
  },

  delete: (id) => {
    const url = `/admin/user/${id}`;
    return axiosClient.delete(url);
  },

  add: (user) => {
    const url = `/admin/user`;
    return axiosClient.post(url, user);
  },
  update: (id, user) => {
    const url = `/admin/user/${id}`;
    return axiosClient.put(url, user);
  },
  login(data) {
    const url = "/login";
    return axiosClient.post(url, data);
  },

  logout(data) {
    const url = "/logout";
    return axiosClient.post(url);
  },
};

export default userApi;
