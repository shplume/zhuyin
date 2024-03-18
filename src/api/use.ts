import axios from 'axios';

export interface LoginData {
  account: string;
  password: string;
}

export function userLogin(data: LoginData) {
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

export function userInfo() {
  return axios.post('/api/v1/user/info');
}
