import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/articles";

export function createArticle(article) {
  return http.post(apiEndpoint, article);
}

export function getArticle(articleId) {
  return http.get(`${apiEndpoint}/${articleId}`);
}

export function getArticles() {
  return http.get(apiEndpoint);
}

export function like(articleId) {
  return http.post(`${apiEndpoint}/${articleId}/like`, {});
}

export function unlike(articleId){
  return http.delete(`${apiEndpoint}/${articleId}/unlike`)
}