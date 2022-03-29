import { CommonItem, CommonList } from 'api/types';

type TagItem = CommonItem & {
  name: string;
};

export type BlogItem = CommonItem & {
  title: string;
  description: string;
  tags: TagItem[];
  markdown: string;
};

// APIの型定義
export interface Methods {
  get: {
    resBody: CommonList<BlogItem>;
  };
}
