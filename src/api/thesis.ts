import axios from 'axios';

export interface CreateThesisParameter {
  chineseTitle: string;
  englishTitle: string;
  authors: string[];
  teachers: string[];
  firstAdvance: string;
  secondAdvance: string;
  thirdAdvance: string;
  drawback: string;
}

export interface CreateThesisRelevant {
  thesisId: number;
}

export function queryCreateThesis(data: CreateThesisParameter) {
  return axios.post<CreateThesisRelevant>('/api/v1/thesis/create', data);
}

export function queryUploadThesis(
  data: FormData,
  config: {
    controller: AbortController;
    onUploadProgress?: (progressEvent: any) => void;
  }
) {
  return axios.post('/api/v1/thesis/upload', data, config);
}
