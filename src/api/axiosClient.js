import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  //baseURL: "https://612f3e665fc50700175f1512.mockapi.io/api/v1",
     baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'content-type': 'application/json',
    },
    paramsSerializer: params => {
      queryString.stringify(params)},
  });
  
  axiosClient.interceptors.request.use(async (config) => {
   // handle token here
    return config;
  });
  
  axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
      return response.data;
    }
  
    return response;
  }, (error) => {
    // Handle errors
    throw error;
  });
  
  export default axiosClient;


  ///

// import axios from "axios";

// const axiosClient = axios.create({
// 	baseURL: process.env.REACT_APP_API_URL,
// 	headers: {
// 		"Content-Type": "application/json",
// 	},
// 	withCredentials: true,
// });

// axiosClient.interceptors.request.use(async (config) => {
// 	const auth = JSON.parse(localStorage.getItem("auth"));
// 	const token = auth ? auth.jwToken : null;
// 	if (token) {
// 		config.headers.authorization = `Bearer ${token}`;
// 	}
// 	return config;
// });

// axiosClient.interceptors.response.use(
// 	async (response) => {
// 		if (response && response.data) {
// 			return response.data;
// 		}
// 		return response.data;
// 	},
// 	(error) => {
// 		if (error.response && error.response.status === 401) {
// 	//		localStorage.removeItem("auth");
// 			window.location.reload();
// 		}
// 		throw error;
// 	}
// );

// export default axiosClient;

