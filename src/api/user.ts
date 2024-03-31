import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';

export interface LoginData {
  account: string;
  password: string;
}

export function login(data: LoginData) {
  return axios.post('/api/v1/user/login', data);
}

export interface RegisterData {
  account: string;
  password: string;
  email: string;
}

export function userRegister(data: RegisterData) {
  return axios.post('/api/v1/user/register', data);
}

export function getUserInfo() {
  return axios.post('/api/v1/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export interface LoginRes {
  token: string;
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}
