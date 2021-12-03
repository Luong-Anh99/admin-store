
import axiosClient from "./axiosClient";

const sizeApi = {
  getAll: (params) => {
    const url = '/admin/sizes';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/admin/size/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/admin/size/${id}`;
    return axiosClient.delete(url);
  },

  add:(user) => {
    const url = `/admin/size`;
    return axiosClient.post(url,user);
  },
  update:(id, user) => {
    const url = `/admin/size/${id}`;
    return axiosClient.put(url, user);
  }

}

export default sizeApi;