import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

export async function register(user) {
  const { email, password, username: name } = user;
  return await http.post(apiEndpoint, { email, name, password });
}

export async function getUser(userId) {
  return await http.get(`${apiEndpoint}/${userId}`);
}
