import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/articles";

export async function createArticle(article) {
  return http.post(apiEndpoint, article);
}

export async function getArticle(articleId) {
  return await http.get(`${apiEndpoint}/${articleId}`);
}

export async function getArticles() {
  return http.get(apiEndpoint);
}
