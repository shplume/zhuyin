import axios from 'axios';

export interface BaseInfoModel {
  chineseTitle: string;
  englishTitle: string;
  authors: Array<string>;
  teachers: Array<string>;
  firstAdvance: string;
  secondAdvance: string;
  thirdAdvance: string;
  drawback: string;
}
export interface ChannelInfoModel {
  files: [];
}

export type UnitChannelModel = BaseInfoModel & ChannelInfoModel;

export function submitChannelForm(data: UnitChannelModel) {
  return axios.post('/api/channel-form/submit', { data });
}
