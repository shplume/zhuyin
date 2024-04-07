import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';

const { Random } = Mock;

const data = Mock.mock({
  'list|55': [
    {
      'id|8': /[A-Z][a-z][-][0-9]/,
      'studentNumber|6': /[0-9]/,
      'name|1': [
        Random.cname(),
        Random.cname(),
        Random.cname(),
        Random.cname(),
      ],
      'specialty|1': [
        '哲学',
        '经济学',
        '法学',
        '教育学',
        '文学',
        '历史学',
        '理学',
        '工学',
        '农学',
        '医学',
        '管理学',
        '艺术学',
      ],
      'nature|1': ['首次送审', '导师审核'],
      'thesisTitle|1': [
        Random.csentence(6, 18),
        Random.csentence(6, 18),
        Random.csentence(6, 18),
        Random.csentence(6, 18),
      ],
      'englishThesisTitle|1': [
        Random.title(6),
        Random.title(6),
        Random.title(6),
        Random.title(6),
      ],
      'createdTime|1': [
        Random.datetime(),
        Random.datetime(),
        Random.datetime(),
        Random.datetime(),
      ],
      'softtype|1': ['学硕评阅书'],
      'status|1': [0, 1],
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/list/policy'), (params: GetParams) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = current as number;
      const ps = pageSize as number;
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      });
    });
  },
});
