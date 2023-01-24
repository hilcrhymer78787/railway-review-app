import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export const api = axios.create({
  baseURL: "https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com",
});

// api.interceptors.request.use((req: AxiosRequestConfig) => {
//   if (req.headers) {
//     req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
//   }
//   return req;
// });

// api.interceptors.response.use(
//   (res: AxiosResponse) => {
//     if (res && res.config && res.config.baseURL) {
//       console.log(res.config.baseURL + res.config.url, res);
//     }
//     return res;
//   },
//   (err: AxiosError) => {
//     console.error(err.response);
//     throw err;
//   }
// );
