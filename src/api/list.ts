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

export interface AllocationRelevant {
  thesisIds: number[];
  teacherId: number;
}

export function queryAllocation(data: AllocationRelevant) {
  return axios.post('/api/v1/thesis/allocation', data);
}

export interface ReviewListRelevant {
  id: number;
  name: string;
  number: string;
  college: string;
  phone: string;
  fileName: string;
  fileState: number;
  chineseTitle: string;
  englishTitle: string;
  authors: string[];
  teachers: string[];
  firstAdvance: string;
  secondAdvance: string;
  thirdAdvance: string;
  drawback: string;
  uploadTime: string;
  createTime: string;
}

export function queryReviewList() {
  return axios.post<{ data: ReviewListRelevant[] }>(
    '/api/v1/thesis/reviewList'
  );
}

export interface DownloadRelevant {
  thesisId: number;
}

export function queryDownload(data: DownloadRelevant) {
  return axios.post('/api/v1/thesis/download', data, {
    responseType: 'blob',
  });
}

export function queryUploadReviews(
  data: FormData,
  config: {
    controller: AbortController;
    onUploadProgress?: (progressEvent: any) => void;
  }
) {
  return axios.post('/api/v1/review/upload', data, config);
}

export interface ReviewSendBackRelevant {
  thesisId: number;
  reason: string;
}

export function queryReviewSendBack(data: ReviewSendBackRelevant) {
  return axios.post('/api/v1/review/sendBack', data);
}
