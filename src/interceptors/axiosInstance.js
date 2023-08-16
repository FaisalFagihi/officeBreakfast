import axios from "axios";
import auth from "../modules/auth";
export const axiosInstance = axios.create({
  // baseURL: 'https://127.0.0.1:44369/api/',
  timeout: 15000,
  headers: { Authorization: auth.getToken() }
});


axiosInstance.defaults.baseURL = import.meta.env.VITE_API_URL+'/api/';

axiosInstance.interceptors.request.use((config)=> {
  axiosInstance.defaults.headers['Authorization'] =  auth.getToken();
  axiosInstance.defaults.headers.common['Authorization'] =  auth.getToken();

  // config.params['auth'] = Cookies.get("token")
  // Do something before request is sent
  config.headers['Authorization'] =  auth.getToken();
  config.retry = 3;
  config.retryDelay = 1000;

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {

  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  if (error?.response?.status === 401) {
    // localStorage.removeItem('token')
    auth.logout()
    // window.location.reload(true)  
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  const { config, message } = error;
  if (!config || !config.retry) {
    return Promise.reject(error);
  }
  // retry while Network timeout or Network Error
  if (!(message.includes("timeout") || message.includes("Network Error"))) {
    return Promise.reject(error);
  }

  config.retry -= 1;
  const delayRetryRequest = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, config.retryDelay || 1000);
  });

  return delayRetryRequest.then(() => axios(config));
});

// axiosInstance.interceptors.response.use(resp => resp, async error => {
//     if (error.response.status === 401) {
//         const response = await axiosInstance.post('refresh', {}, { withCredentials: true })

//         if (response.status === 200) {
//             axiosInstance.defaults.headers.common['Authorization'] = response.data['token'];

//             return axiosInstance(error.config)
//         }
//     }

//     return error;
// })

export default axiosInstance;