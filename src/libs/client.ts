import aspida from '@aspida/fetch';
import api from 'api/$api';

const serviceDomain = process.env.SERVICE_ID;
const apiKey = process.env.API_KEY;

if (serviceDomain === undefined)
  throw Error('.envファイルにSERVICE_IDを設定してください');
if (apiKey === undefined)
  throw Error('.envファイルにAPI_KEYを設定してください');

const url = `https://${serviceDomain}.microcms.io/api/v1`;
const config = {
  headers: { 'X-MICROCMS-API-KEY': apiKey },
};

const _fetch = api(aspida(fetch, { baseURL: url }));

export const getBlogList = (pageNum: number = 1, limit: number = 5) => {
  // res が CommonList<ArticleItem> 型になっている
  return _fetch.blog.$get({
    config,
    query: { limit, offset: (pageNum - 1) * 5 },
  });
};

export const getFilterBlogList = (tagId: string) => {
  if (!tagId) throw new Error('tagId がありません');

  return _fetch.blog.$get({
    config,
    query: { filters: `tag[equals]${tagId}`, limit: 5 },
  });
};

export const getBlog = (id: string) => {
  return _fetch.blog._contentId(id).$get({ config });
};

export const getCategoryList = () => {
  return _fetch.tag.$get({ config });
};
