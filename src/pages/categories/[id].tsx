import { BlogItem } from 'api/blog';
import { TagItem } from 'api/tag';
import { getCategoryList, getFilterBlogList } from 'libs/client';
import type { NextPage } from 'next';
import Link from 'next/link';

type Props = {
  blogList: BlogItem[];
  tagName: string;
  category: TagItem[];
};

const TagList: NextPage<Props> = ({ blogList, tagName, category }) => {
  return (
    <>
      <h3>タグ:[{tagName}] が含まれるブログ一覧</h3>
      <ul>
        {blogList.length === 0 && <div>該当するブログがありません</div>}
        {blogList.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>

      <h4>カテゴリ一覧</h4>
      <ul>
        {category.length === 0 && <div>タグが登録されていません</div>}
        {category.map((tag) => (
          <li key={tag.id}>
            <Link href={`/categories/${tag.id}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>

      <Link href="/">一覧に戻る</Link>
    </>
  );
};

export const getStaticPaths = async () => {
  const tagData = await getCategoryList();
  return {
    paths: tagData.contents.map((tag) => ({
      params: {
        id: tag.id,
      },
    })),

    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const blogList = await getFilterBlogList(params.id);
  const tagData = await getCategoryList();
  return {
    props: {
      blogList: blogList.contents,
      tagName: blogList.contents[0].tag.name,
      category: tagData.contents,
    },
  };
};

export default TagList;
