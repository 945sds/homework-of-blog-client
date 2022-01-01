import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  //可预知的错误
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  //不可预知的错误
  if (!expectedError) {
    alert("An unexpected error occurred.")
  }
  //传入错误处理中
  return Promise.reject(error);
});
//在header中设置jwt
function setJwt(jwt) {
  axios.defaults.headers.common["token"] = jwt;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
