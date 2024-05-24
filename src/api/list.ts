import axios from 'axios';
import qs from 'query-string';
import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';

export interface PolicyRecord {
  id: string;
  number: number;
  name: string;
  specialty: string;
  nature: string;
  status: string;
  createdTime: string[];
  select: boolean;
}

export interface PolicyParams extends Partial<PolicyRecord> {
  current: number;
  pageSize: number;
}

export interface PolicyListRes {
  list: PolicyRecord[];
  total: number;
}

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>('/api/list/policy', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  name?: string;
  actionType?: string;
  icon?: string;
  data?: DescData[];
  enable?: boolean;
  expires?: boolean;
}
export function queryInspectionList() {
  return axios.get('/api/list/quality-inspection');
}

export function queryTheServiceList() {
  return axios.get('/api/list/the-service');
}

export function queryRulesPresetList() {
  return axios.get('/api/list/rules-preset');
}

// ------------------------------------------------

export interface AllotListRelevant {
  id: number;
  role: number;
  name: string;
  number: string;
  college: string;
  fileState: number;
  chineseTitle: string;
  englishTitle: string;
  uploadTime: string;
}

export function queryAllotList() {
  return axios.post<{ data: AllotListRelevant[] }>('/api/v1/thesis/allotList');
}
