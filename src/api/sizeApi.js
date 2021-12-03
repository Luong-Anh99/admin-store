
import axiosClient from "./axiosClient";

const sizeApi = {
  getAll: (params) => {
    const url = '/sizes';
    return axiosClient.get(url, { params });

  },

  get: (id) => {
    const url = `/size/${id}`;
    return axiosClient.get(url);
  },

  delete:(id) => {
    const url = `/size/${id}`;
    return axiosClient.delete(url);
  },

  add:(user) => {
    const url = `/size`;
    return axiosClient.post(url,user);
  },
  update:(id, user) => {
    const url = `/size/${id}`;
    return axiosClient.put(url, user);
  }

}

export default sizeApi;