import { CommonItem, CommonList } from 'api/types';
import { TagItem } from 'api/tag';

export type BlogItem = CommonItem & {
  title: string;
  body: string;
  tags: TagItem[];
};

// APIの型定義
export type Methods = {
  get: {
    resBody: CommonList<BlogItem>;
  };
};
