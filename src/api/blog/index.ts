import { MicroCMSQueries } from 'microcms-js-sdk';
import { CommonItem, CommonList } from 'api/types';
import { TagItem } from 'api/tag';

export type BlogItem = CommonItem & {
  title: string;
  body: string;
  tag: TagItem;
};

// APIの型定義
export type Methods = {
  get: {
    query?: MicroCMSQueries;
    resBody: CommonList<BlogItem>;
  };
};
