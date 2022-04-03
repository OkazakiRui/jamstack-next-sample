import { BlogItem } from 'api/blog';
import Pagination from 'components/Pagination';
import { getBlogList } from 'libs/client';
import type { NextPage } from 'next';
import Link from 'next/link';

type Props = {
  blogList: BlogItem[];
  totalCount: number;
};

const BlogPageId: NextPage<Props> = ({ blogList, totalCount }) => {
  console.log(blogList);

  return (
    <div>
      <h3>ブログ一覧</h3>
      <ul>
        {blogList.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
      <h4>ページネーション</h4>
      <Pagination totalCount={totalCount} />
      <Link href="/">一覧に戻る</Link>
    </div>
  );
};

export const getStaticPaths = async () => {
  const blogList = await getBlogList();
  const perPage = 5;
  const range = (start: number, end: number): number[] =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return {
    paths: range(1, Math.ceil(blogList.totalCount / perPage)).map((num) => ({
      params: {
        id: String(num),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: number };
}) => {
  const blogList = await getBlogList(params.id);

  return {
    props: {
      blogList: blogList.contents,
    },
  };
};

export default BlogPageId;
