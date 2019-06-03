import http from "./httpService";
//import { apiEndpoint } from "../config.json";
import jwtDecode from "jwt-decode";

const apiUrl = "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiUrl, { email, password });
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getJwt() {
  return localStorage.getItem("token");
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
