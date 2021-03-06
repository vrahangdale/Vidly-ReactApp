import http from "./httpService";
//import { apiEndpoint } from "../config.json";

const apiUrl = "/users";

export function registerUser(user) {
  return http.post(apiUrl, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
