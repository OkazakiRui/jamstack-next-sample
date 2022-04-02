import { CommonItem, CommonList } from 'api/types';

export type TagItem = CommonItem & {
  name: string;
};

// APIの型定義
export type Methods = {
  get: {
    resBody: CommonList<TagItem>;
  };
};
