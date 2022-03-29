import { BlogItem } from 'api/blog';
import { getBlogList } from 'libs/client';
import type { NextPage } from 'next';
import Link from 'next/link';

type Props = {
  blog: BlogItem[];
};

const Home: NextPage<Props> = ({ blog }) => {
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticProps = async () => {
  const data = await getBlogList();
  return {
    props: {
      blog: data.contents,
    },
  };
};

export default Home;
