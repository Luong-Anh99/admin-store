// import axios from 'axios';
// import queryString from 'query-string';

// const axiosClient = axios.create({
//   //baseURL: "https://612f3e665fc50700175f1512.mockapi.io/api/v1",
//     baseURL: process.env.REACT_APP_API_URL,
//     headers: {
//       'Content-type': 'application/json',
//     },
//     paramsSerializer: params => {
//       queryString.stringify(params)},
//   });

//   axiosClient.interceptors.request.use(async (config) => {
//    // handle token here
//     return config;
//   });

//   axiosClient.interceptors.response.use((response) => {
//     if (response && response.data) {
//       return response.data;
//     }

//     return response;
//   }, (error) => {
//     // Handle errors
//     throw error;
//   });

//   export default axiosClient;

///

// import axios from "axios";
// import Cookies from 'js-cookie'

// const axiosClient = axios.create({
// 	baseURL: process.env.REACT_APP_API_URL,
// 	headers: {
// 		'Content-type': 'application/json',
// 	},
// 	withCredentials: true,
// });

// axiosClient.interceptors.request.use(async (config) => {
// 	const auth = Cookies.get('auth');
// //	const token = auth ? auth.jwToken : null;
//   const token = auth ? auth : null;
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
// 	//		Cookies.remove('name')
// 			window.location.reload();
// 		}
// 		throw error;
// 	}
// );

// export default axiosClient;
import {
  useParams,
  useLocation,
  useHistory,
  useRouteMatch,
  Link,
} from "react-router-dom";
import axios from "axios";
import queryString from "querystring";
const isDevelop =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const axiosClient = axios.create(
  isDevelop
    ? {
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    : {
        headers: {
          "Content-Type": "application/json",
        },
        paramsSerializer: (params) => queryString.stringify(params),
        withCredentials: true,
      }
);

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // window.location.reload();
      const history = useHistory();
      history.push("login");
    }
    throw error;
  }
);

export default axiosClient;
