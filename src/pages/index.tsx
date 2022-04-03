import { BlogItem } from 'api/blog';
import { TagItem } from 'api/tag';
import Pagination from 'components/Pagination';
import { getBlogList, getCategoryList } from 'libs/client';
import type { NextPage } from 'next';
import Link from 'next/link';

type Props = {
  blog: BlogItem[];
  category: TagItem[];
  totalCount: number;
};

const Home: NextPage<Props> = ({ blog, category, totalCount }) => {
  return (
    <div>
      <h3>ブログ一覧</h3>
      <ul>
        {blog.length === 0 && <div>該当するブログがありません</div>}
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>

      <h4>ページネーション</h4>
      <Pagination totalCount={totalCount} />

      <h4>カテゴリ一覧</h4>
      <ul>
        {category.length === 0 && <div>タグが登録されていません</div>}
        {category.map((tag) => (
          <li key={tag.id}>
            <Link href={`/categories/${tag.id}`}>{tag.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const blogData = await getBlogList();
  const tagData = await getCategoryList();

  return {
    props: {
      blog: blogData.contents,
      category: tagData.contents,
      totalCount: blogData.totalCount,
    },
  };
};

export default Home;
