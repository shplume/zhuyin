import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';

export interface LoginData {
  account: string;
  password: string;
}

export function login(data: LoginData) {
  return axios.post('/api/v1/user/login', data);
}

export function getUserInfo() {
  return axios.post('/api/v1/user/info');
}

export interface RegisterData {
  account: string;
  password: string;
  email: string;
}

export function userRegister(data: RegisterData) {
  return axios.post('/api/v1/user/register', data);
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export interface LoginRes {
  token: string;
}

export function logout() {
  return axios.post<LoginRes>('/api/v1/user/logout');
}

export interface TeacherListRelevant {
  id: number;
  name: string;
  phone: string;
  number: string;
  college: string;
}

export function queryTeacherList() {
  return axios.post<{ data: TeacherListRelevant[] }>(
    '/api/v1/user/teacherList'
  );
}

export interface RegisterAdmin {
  account: string;
  password: string;
  name: string;
  phone: string;
  number: string;
  college: string;
}

export function queryRegisterAdmin(data: RegisterAdmin) {
  return axios.post('/api/v1/user/register/admin', data);
}

export interface RegisterTeacher {
  account: string;
  password: string;
  name: string;
  phone: string;
  number: string;
  college: string;
}

export function queryRegisterTeacher(data: RegisterTeacher) {
  return axios.post('/api/v1/user/register/teacher', data);
}

export interface RegisterStudent {
  account: string; // 账户
  password: string; // 密码
  name: string; // 姓名
  college: string; // 院系
  phone: string; // 电话
  major: string; // 专业
  class: string; // 班级
  number: string; // 学工号
}

export function queryRegisterStudent(data: RegisterStudent) {
  return axios.post('/api/v1/user/register/student', data);
}
