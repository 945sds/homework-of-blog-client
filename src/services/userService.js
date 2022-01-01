import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

export function register(user) {
  const { email, password, username: name } = user;
  return http.post(apiEndpoint, { email, name, password });
}

export function getUser(userId) {
  return http.get(`${apiEndpoint}/${userId}`);
}
