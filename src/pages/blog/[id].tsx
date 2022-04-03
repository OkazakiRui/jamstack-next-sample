import { BlogItem } from 'api/blog';
import { getBlog, getBlogList } from 'libs/client';
import type { NextPage } from 'next';
import Link from 'next/link';

type Props = {
  blog: BlogItem;
};

const Home: NextPage<Props> = ({ blog }) => {
  return (
    <div>
      <h3>{blog.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: blog.body }} />
      <Link href="/">一覧に戻る</Link>
    </div>
  );
};

export const getStaticPaths = async () => {
  const data = await getBlogList(1, 1000);

  return {
    paths: data.contents.map((blog) => ({
      params: {
        id: blog.id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data = await getBlog(params.id);

  return {
    props: {
      blog: data,
    },
  };
};

export default Home;
